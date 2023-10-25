import path from 'node:path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';
import { fileURLToPath } from 'url';
import * as scalars from 'graphql-scalars';
import { GraphQLLong } from './scalars/Long';
import { GraphQLBigInt } from './scalars/BigInt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolversArray = await loadFiles(path.join(__dirname, './**/*.resolvers.*'));

export default mergeResolvers([...resolversArray, scalars.resolvers, { Long: GraphQLLong, BigInt: GraphQLBigInt }]);
