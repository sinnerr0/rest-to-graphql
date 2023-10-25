import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildASTSchema, parse, GraphQLObjectType } from 'graphql';
import * as ts from 'typescript';
import { oasConfig } from '../codegen';
import { execSync } from 'node:child_process';
import { Maybe } from 'graphql/jsutils/Maybe';

/**
 * schema에 정의된 Query/Mutation을 토대로 resolvers.ts 파일과 datasource.ts 파일을 생성합니다.
 * 참조하는 파일은 프로젝트 root의 codegen 파일내 oasConfig 객체내 정의된 이름을 참조하여 생성됩니다.
 * 일정한 패턴을 가지고 있으므로 이름 패턴을 맞춰 주세요.
 * resolvers와 datasource의 파일 이름과 datasource파일 내 class/baseURL 값을 결정합니다.
 * 패턴: {UPSTREAM_NAME}-${API_TITLE}
 */

interface QueryInfo {
  name: string;
  description: Maybe<string>;
}

interface MutationInfo extends QueryInfo {}

interface QueryMutationInfo {
  query: QueryInfo[];
  mutation: MutationInfo[];
}

const factory = ts.factory;

oasConfig.forEach((config) => {
  const graphqlPath = `../src/schema/${config.name}.graphql`;
  const queryMutationInfo = getQueryAndMutationInfo(graphqlPath) as QueryMutationInfo;
  const unionTypeNames = getUnionTypeNames(graphqlPath);
  createResolverFile(config.name, queryMutationInfo);
  createUnionResolverFile(unionTypeNames);
  createDatasourceFile(config.name, queryMutationInfo);
});

function getQueryAndMutationInfo(graphqlPath: string) {
  const graphqlFile = readFileSync(join(__dirname, graphqlPath)).toString();
  const documentAST = parse(graphqlFile);
  const schema = buildASTSchema(documentAST, { assumeValidSDL: true });
  const query = schema.getType('Query') as GraphQLObjectType;
  let queryFieldsInfo: QueryInfo[] = [];
  if (query) {
    let queryFields = query.getFields();
    queryFieldsInfo = Object.keys(queryFields).map((field) => ({ name: queryFields[field].name, description: queryFields[field].description }));
  }

  const mutation = schema.getType('Mutation') as GraphQLObjectType;
  let mutationFieldsInfo: MutationInfo[] = [];
  if (mutation) {
    let mutationFields = mutation.getFields();
    mutationFieldsInfo = Object.keys(mutationFields).map((field) => ({
      name: mutationFields[field].name,
      description: mutationFields[field].description,
    }));
  }

  return {
    query: queryFieldsInfo,
    mutation: mutationFieldsInfo,
  };
}

function getUnionTypeNames(graphqlPath: string) {
  const graphqlFile = readFileSync(join(__dirname, graphqlPath)).toString();
  const documentAST = parse(graphqlFile);
  return documentAST.definitions.filter((v) => v.kind === 'UnionTypeDefinition').map((v) => v.name.value);
}

function createResolverFile(name: string, queryMutationInfo: QueryMutationInfo) {
  const resolverFile = join(__dirname, `../src/resolvers/${name}.resolvers.ts`);
  let sourceFile = ts.createSourceFile(resolverFile, '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const result = printer.printList(
    ts.ListFormat.MultiLine,
    createBaseResolverFile(createQuery(name, queryMutationInfo), createMutation(name, queryMutationInfo)),
    sourceFile,
  );

  writeFileSync(resolverFile, result);
  execSync(`yarn exec "prettier -w ${`src/resolvers/${name}.resolvers.ts`}"`);
}

function createBaseResolverFile(query: ts.ObjectLiteralElementLike[], mutation: ts.ObjectLiteralElementLike[]) {
  return factory.createNodeArray([
    factory.createImportDeclaration(
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([factory.createImportSpecifier(false, undefined, factory.createIdentifier('Resolvers'))]),
      ),
      factory.createStringLiteral('../generated/graphql'),
      undefined,
    ),
    factory.createVariableStatement(
      [factory.createToken(ts.SyntaxKind.ExportKeyword)],
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier('resolvers'),
            undefined,
            factory.createTypeReferenceNode(factory.createIdentifier('Resolvers'), undefined),
            factory.createObjectLiteralExpression(
              [
                factory.createPropertyAssignment(factory.createIdentifier('Query'), factory.createObjectLiteralExpression(query, true)),
                factory.createPropertyAssignment(factory.createIdentifier('Mutation'), factory.createObjectLiteralExpression(mutation, true)),
              ],
              true,
            ),
          ),
        ],
        ts.NodeFlags.Const,
      ),
    ),
  ]);
}

function createQuery(name: string, queryMutationInfo: QueryMutationInfo) {
  const apiNames = name.split('-');

  return queryMutationInfo.query.map((info) =>
    factory.createPropertyAssignment(
      factory.createIdentifier(info.name),
      factory.createArrowFunction(
        [factory.createToken(ts.SyntaxKind.AsyncKeyword)],
        undefined,
        [
          factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('_')),
          factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('args')),
          factory.createParameterDeclaration(
            undefined,
            undefined,
            factory.createObjectBindingPattern([factory.createBindingElement(undefined, undefined, factory.createIdentifier('api'))]),
          ),
        ],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [
            factory.createReturnStatement(
              factory.createCallExpression(
                factory.createPropertyAccessExpression(
                  factory.createPropertyAccessExpression(
                    factory.createPropertyAccessExpression(factory.createIdentifier('api'), factory.createIdentifier(apiNames[0])),
                    factory.createIdentifier(apiNames[1]),
                  ),
                  factory.createIdentifier(info.name),
                ),
                undefined,
                [factory.createIdentifier('args')],
              ),
            ),
          ],
          true,
        ),
      ),
    ),
  );
}

function createMutation(name: string, queryMutationInfo: QueryMutationInfo) {
  const apiNames = name.split('-');

  return queryMutationInfo.mutation.map((info) =>
    factory.createPropertyAssignment(
      factory.createIdentifier(info.name),
      factory.createArrowFunction(
        [factory.createToken(ts.SyntaxKind.AsyncKeyword)],
        undefined,
        [
          factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('_')),
          factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('args')),
          factory.createParameterDeclaration(
            undefined,
            undefined,
            factory.createObjectBindingPattern([factory.createBindingElement(undefined, undefined, factory.createIdentifier('api'))]),
          ),
        ],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [
            factory.createReturnStatement(
              factory.createCallExpression(
                factory.createPropertyAccessExpression(
                  factory.createPropertyAccessExpression(
                    factory.createPropertyAccessExpression(factory.createIdentifier('api'), factory.createIdentifier(apiNames[0])),
                    factory.createIdentifier(apiNames[1]),
                  ),
                  factory.createIdentifier(info.name),
                ),
                undefined,
                [factory.createIdentifier('args')],
              ),
            ),
          ],
          true,
        ),
      ),
    ),
  );
}

function createUnionResolverFile(unionTypeNames: string[]) {
  const resolverFile = join(__dirname, `../src/resolvers/union.resolvers.ts`);
  let sourceFile = ts.createSourceFile(resolverFile, readFileSync(resolverFile).toString(), ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const transform = ts.transform(sourceFile, [transformer]);
  function transformer(context: ts.TransformationContext) {
    return (sourceFile) => {
      function visitChilds(child: ts.Node): ts.Node | undefined {
        if (ts.isObjectLiteralExpression(child)) {
          const names = child.properties.map((v) => (v.name as ts.Identifier).escapedText as string);
          const undefinedNames = unionTypeNames.filter((unionName) => !names.includes(unionName));
          const newProperties = undefinedNames.map((name) =>
            factory.createPropertyAssignment(
              factory.createIdentifier(name),
              factory.createObjectLiteralExpression(
                [
                  factory.createMethodDeclaration(
                    undefined,
                    undefined,
                    factory.createIdentifier('__resolveType'),
                    undefined,
                    undefined,
                    [factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('obj'))],
                    undefined,
                    factory.createBlock([factory.createReturnStatement(factory.createNull())], true),
                  ),
                ],
                true,
              ),
            ),
          );
          // @ts-ignore
          child.properties = [...child.properties, ...newProperties];
          return child;
        }
        return ts.visitEachChild(child, visitChilds, context);
      }
      return ts.visitEachChild(sourceFile, visitChilds, context);
    };
  }

  const result = printer.printNode(ts.EmitHint.SourceFile, transform.transformed[0], sourceFile);
  writeFileSync(resolverFile, result);
  execSync(`yarn exec "prettier -w ${`src/resolvers/union.resolvers.ts`}"`);
}

function createDatasourceFile(name: string, queryMutationInfo: QueryMutationInfo) {
  const datasourceFile = join(__dirname, `../src/api/${name}.datasource.ts`);
  let sourceFile = ts.createSourceFile(datasourceFile, '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const result = printer.printList(ts.ListFormat.MultiLine, createBaseDatasourceFile(name, createMethodDatasource(queryMutationInfo)), sourceFile);

  writeFileSync(datasourceFile, result);
  execSync(`yarn exec "prettier -w ${`src/api/${name}.datasource.ts`}"`);
}

function createBaseDatasourceFile(name: string, methods: ts.ClassElement[]) {
  return factory.createNodeArray([
    factory.createImportDeclaration(
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([factory.createImportSpecifier(false, undefined, factory.createIdentifier('UPSTREAM_URL'))]),
      ),
      factory.createStringLiteral('../config'),
    ),
    factory.createImportDeclaration(
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([factory.createImportSpecifier(false, undefined, factory.createIdentifier('BaseDataSource'))]),
      ),
      factory.createStringLiteral('./base.datasource'),
    ),
    factory.createClassDeclaration(
      [factory.createToken(ts.SyntaxKind.ExportKeyword)],
      factory.createIdentifier(`${toUpperCamelCase(name)}Datasource`),
      undefined,
      [
        factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
          factory.createExpressionWithTypeArguments(factory.createIdentifier('BaseDataSource'), undefined),
        ]),
      ],
      [
        factory.createPropertyDeclaration(
          [factory.createToken(ts.SyntaxKind.OverrideKeyword)],
          factory.createIdentifier('baseURL'),
          undefined,
          undefined,
          factory.createPropertyAccessExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier('UPSTREAM_URL'),
              factory.createIdentifier(name.split('-')[0].toUpperCase()),
            ),
            factory.createIdentifier('URL'),
          ),
        ),
        factory.createPropertyDeclaration(
          undefined,
          factory.createIdentifier('basePath'),
          undefined,
          undefined,
          factory.createPropertyAccessExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier('UPSTREAM_URL'),
              factory.createIdentifier(name.split('-')[0].toUpperCase()),
            ),
            factory.createIdentifier('BASE_PATH'),
          ),
        ),
        ...methods,
      ],
    ),
  ]);
}

function toUpperCamelCase(text) {
  const words = text.split('-');
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join('');
}

function createMethodDatasource(queryMutationInfo: QueryMutationInfo) {
  const methodCandidateInfo = [...queryMutationInfo.query, ...queryMutationInfo.mutation];

  return methodCandidateInfo.map((info) => {
    const method = getDatasourceMethod(info.description);
    const url = '${this.basePath}' + getDatasourceUrl(info.description);
    const params = getDatasourceParams(info.description);

    let statement;
    if (method === 'get') {
      let argument;
      if (params.length) {
        argument = makeTemplateExpression(url, params);
      } else {
        argument = factory.createNoSubstitutionTemplateLiteral(url, url);
      }
      statement = [
        factory.createVariableStatement(
          undefined,
          factory.createVariableDeclarationList(
            [
              factory.createVariableDeclaration(
                factory.createIdentifier('_params'),
                undefined,
                undefined,
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier('excludeParams')),
                  undefined,
                  [
                    factory.createIdentifier('params'),
                    factory.createArrayLiteralExpression(
                      params.map((param) => factory.createStringLiteral(param)),
                      false,
                    ),
                  ],
                ),
              ),
            ],
            ts.NodeFlags.Const,
          ),
        ),
        factory.createReturnStatement(
          factory.createCallExpression(factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier(method)), undefined, [
            argument,
            factory.createObjectLiteralExpression(
              [factory.createPropertyAssignment(factory.createIdentifier('params'), factory.createIdentifier('_params'))],
              false,
            ),
          ]),
        ),
      ];
    } else {
      let argument;
      if (params.length) {
        argument = makeTemplateExpression(url, params);
      } else {
        argument = factory.createNoSubstitutionTemplateLiteral(url, url);
      }
      statement = [
        factory.createReturnStatement(
          factory.createCallExpression(factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier(method)), undefined, [
            argument,
            factory.createObjectLiteralExpression(
              [
                factory.createPropertyAssignment(
                  factory.createIdentifier('body'),
                  factory.createPropertyAccessExpression(factory.createIdentifier('params'), factory.createIdentifier('requestBody')),
                ),
              ],
              false,
            ),
          ]),
        ),
      ];
    }

    return factory.createMethodDeclaration(
      [factory.createToken(ts.SyntaxKind.AsyncKeyword)],
      undefined,
      factory.createIdentifier(info.name),
      undefined,
      undefined,
      [factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('params'))],
      undefined,
      factory.createBlock(statement, true),
    );
  });
}

function getDatasourceMethod(description: Maybe<string>) {
  if (!description) return '';
  const startString = 'Equivalent to ';
  const index = description.indexOf(startString) + startString.length;
  let anotation = description.slice(index);
  return anotation.split(' ')[0].toLowerCase();
}

function getDatasourceUrl(description: Maybe<string>) {
  if (!description) return '';
  const regex = /{(.*?)}/g;
  const startString = 'Equivalent to ';
  const index = description.indexOf(startString) + startString.length;
  let anotation = description.slice(index);
  const url = anotation.split(' ')[1];
  return url.replace(regex, '${params.$1}').trim();
}

function getDatasourceParams(description: Maybe<string>) {
  if (!description) return [];
  const regex = /{(.*?)}/g;
  const startString = 'Equivalent to ';
  const index = description.indexOf(startString) + startString.length;
  let anotation = description.slice(index);
  const url = anotation.split(' ')[1];
  const params: string[] = [];
  for (let m of url.matchAll(regex)) {
    params.push(m[1]);
  }
  return params;
}

function makeTemplateExpression(url: string, params: string[]) {
  const splitKeys = params.map((param) => `$\{params.${param}}`);
  let startIndex = 0;
  let head;
  let span: ts.TemplateSpan[] = [];
  for (let i = 0; i < splitKeys.length; i++) {
    let key = splitKeys[i];
    let index = url.indexOf(key);
    if (!head) {
      // head 생성
      const headString = url.substring(startIndex, index);
      startIndex += headString.length;
      head = factory.createTemplateHead(headString, headString);
    }
    startIndex += key.length;
    const propertyAccessExpression = factory.createPropertyAccessExpression(factory.createIdentifier('params'), factory.createIdentifier(params[i]));
    if (startIndex === url.length || i === splitKeys.length - 1) {
      // tail 생성
      if (startIndex === url.length) {
        span.push(factory.createTemplateSpan(propertyAccessExpression, factory.createTemplateTail('', '')));
      } else {
        const tailString = url.substring(startIndex);
        span.push(factory.createTemplateSpan(propertyAccessExpression, factory.createTemplateTail(tailString, tailString)));
      }
    } else {
      // middle 생성
      let key = splitKeys[i + 1];
      let index = url.indexOf(key);
      const middleString = url.substring(startIndex, index);
      startIndex += middleString.length;
      span.push(factory.createTemplateSpan(propertyAccessExpression, factory.createTemplateMiddle(middleString, middleString)));
    }
  }
  return factory.createTemplateExpression(head, span);
}
