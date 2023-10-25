import path from 'node:path';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';
import { fileURLToPath } from 'url';
import * as scalars from 'graphql-scalars';
import fs from 'node:fs';
import { print } from 'graphql';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadedFiles = await loadFiles(path.join(__dirname, 'src/**/*.graphql'));
const typeDefs = mergeTypeDefs([...loadedFiles, scalars.typeDefs]);
fs.writeFileSync('schema.graphql', print(typeDefs));
