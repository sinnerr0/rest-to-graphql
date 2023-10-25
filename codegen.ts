import type { CodegenConfig } from '@graphql-codegen/cli';
import type { OasConfig } from './resources/codegen.oas';
import editJsonFile from 'edit-json-file';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'schema.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
  config: {
    contextType: '../apollo#ContextValue',
  },
};

export default config;

/**
 * OAS(Open API Spec) download URL 및 schema를 생성할 이름을 정의합니다.
 */
export const oasConfig: OasConfig = [
  {
    url: 'https://petstore.swagger.io/v2/swagger.json',
    name: 'petstore-base',
  },
];
