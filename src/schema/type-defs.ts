import path from 'node:path';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';
import { fileURLToPath } from 'url';
import * as scalars from 'graphql-scalars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadedFiles = await loadFiles(path.join(__dirname, './**/*.graphql'));
const typeDefs = mergeTypeDefs([...loadedFiles, scalars.typeDefs]);

export default typeDefs;
