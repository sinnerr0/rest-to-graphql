import { execSync } from 'node:child_process';
import editJsonFile from 'edit-json-file';
import deleteKey from 'key-del';
import { unlinkSync, existsSync } from 'node:fs';
import { oasConfig } from '../codegen';

export type OasConfig = { url: string; name: string; downloadAfterHook?: (path: string) => void }[];

/**
 * 명령의 command에 따라서 각 단계를 나눕니다. command가 없을 시 모든 과정을 일괄 처리 합니다.
 * 1. download: OAS URL 정의에 따른 파일을 다운로드 합니다.
 * 2. schema: OAS 이름 정의에 따른 graphql schema 파일을 생성합니다.
 * 3. clean: OAS 파일을 제거 합니다.
 *
 * 단계를 나눈 이유는 OAS spec이 잘못 정의 되어 있어서 validation 에러가 발생될 경우가 있습니다.
 * (swagger가 제대로 생성되지 않는 경우나 중복 정의와 같은 이유로 OAS spec validation 실패 발생.
 *  --> 이 경우 벡엔드에 문의하여 해결하거나 급한경우 OAS spec 파일만 받아서 수정을 한다음 schema를 생성해야 합니다.
 *  --> 또는 downloadAfterHook 을 정의하여 그 안에서 json 조작을 통해 validation 문제를 해결합니다.)
 * 또는 파일 다운로드가 안될 수 있습니다.(Internal Server Error 등)
 */
const command = process.argv[2];

if (!!command) {
  if (command === 'download') {
    oasConfig.forEach((api) => downloadOasJson(api.url, api.name));
    oasConfig.forEach((api) => manipulateFiles(api.name));
  } else if (command === 'schema') {
    patchForDeprecated();
    oasConfig.forEach((api) => createGraphqlScheme(api.name));
    formatGraphqlFiles();
  } else if (command === 'clean') {
    oasConfig.forEach((api) => finish(api.name));
  } else if (command === 'help') {
    console.log(`
    yarn codegen:oas
        OAS URL 정의에 따른 파일을 다운로드하고 스키마를 생성합니다.
    yarn codegen:oas download
        OAS URL 정의에 따른 파일을 다운로드 합니다.
    yarn codegen:oas schema
        OAS 이름 정의에 따른 graphql schema 파일을 생성합니다.
    yarn codegen:oas clean
        OAS 파일을 제거 합니다.
   `);
  }
} else {
  patchForDeprecated();
  oasConfig.forEach((api) => downloadOasJson(api.url, api.name));
  oasConfig.forEach((api) => manipulateFiles(api.name));
  oasConfig.forEach((api) => createGraphqlScheme(api.name));
  formatGraphqlFiles();
  oasConfig.forEach((api) => finish(api.name));
}

function downloadOasJson(url, name) {
  console.log(execSync(`curl ${url} > ${name}.json`).toString());
  const api = oasConfig.find((api) => api.url === url);
  api?.downloadAfterHook && api.downloadAfterHook(`${name}.json`);
}

function manipulateFiles(name) {
  const file = editJsonFile(`${name}.json`);
  /**
   * required properties(version, title, description)
   * OAS spec에 필수 속성이 없을 경우 Validation 실패가 발생되기 때문에 해당 속성값이 없을 경우
   * validation을 통과하기 위해서 속성을 임의로 넣는다.
   */
  file.get('info.version') ?? file.set('info.version', '1.0.0');
  file.get('info.title') ?? file.set('info.title', name);
  file.get('info.description') ?? file.set('info.description', `${name} description`);
  const obj = file.toObject();
  /**
   * remove properties(security, securitySchemes, operationId)
   * - security, securitySchemes: schema 생성 시 security 관련하여 schema에 정의되지 않도록 제거한다.
   *   이유는 datasource에서 명시적으로 authorization & cookie를 설정하기 위해서 이다.
   * - operationId: operationId의 경우 벡엔드에서 swagger docs 정의가 잘 되어 있을 경우 사용할 수 있지만
   *   정의가 제대로 안된 경우 이를 모두 벡엔드에 요청하기 어렵다. 때문에 operationId가 아닌 api url로
   *   graphql query & mutation 이름 정의하기 위해서 operationId를 모두 제거한다.
   * - tags: 중복된 tag name이 존재하는 경우 validation 에러 발생. schema 생성에 크게 문제가 없어 제거
   */
  deleteKey(obj, ['security', 'securitySchemes', 'operationId', 'tags'], { copy: false });
  file.set(obj);
  file.save();
}

function patchForDeprecated() {
  try {
    if (existsSync('node_modules/openapi-to-graphql/dist/index.js')) {
      console.log(execSync(`patch -Nls node_modules/openapi-to-graphql/dist/index.js resources/codegen.oas.deprecated.patch`).toString());
    } else if (existsSync('node_modules/openapi-to-graphql-cli/node_modules/openapi-to-graphql/dist/index.js')) {
      console.log(
        execSync(
          `patch -Nls node_modules/openapi-to-graphql-cli/node_modules/openapi-to-graphql/dist/index.js resources/codegen.oas.deprecated.patch`,
        ).toString(),
      );
    }
  } catch (error) {
    console.log('please ignore', error.toString());
  }
}

function createGraphqlScheme(name) {
  console.log(
    execSync(
      `yarn exec "openapi-to-graphql --genericPayloadArgName --fillEmptyResponses --simpleEnumValues --singularNames --save src/schema/${name}.graphql ${name}.json"`,
    ).toString(),
  );
}

function formatGraphqlFiles() {
  console.log(execSync(`yarn exec "prettier -w **/*.graphql"`).toString());
}

function finish(name) {
  unlinkSync(`${name}.json`);
}
