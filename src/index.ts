import './tracer';
import { BODY_LIMIT, BUILD_PROFILE, CORS_ORIGIN, LOGGER_OPTIONS, NODE_ENV, PORT, UPSTREAM_URL } from './config';
import Fastify from 'fastify';
import { apollo, context } from './apollo';
import { fastifyApolloHandler } from '@as-integrations/fastify';
import cors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import { fastifyHttpProxy } from '@fastify/http-proxy';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createApolloServer = async (port: number = PORT) => {
  const https =
    BUILD_PROFILE === 'localhost' && process.env.NODE_ENV !== 'test'
      ? {
          key: fs.readFileSync(path.join(__dirname, '../resources/localhost-key.pem')),
          cert: fs.readFileSync(path.join(__dirname, '../resources/localhost.pem')),
        }
      : undefined;
  const fastify = Fastify({ bodyLimit: BODY_LIMIT, logger: LOGGER_OPTIONS, https });

  const server = await apollo(fastify);
  await server.start();

  await fastify.register(cors, {
    origin: CORS_ORIGIN,
    credentials: true,
  });

  await fastify.register(fastifyCookie, { hook: 'onRequest' });

  await fastify.register(fastifyHttpProxy, {
    upstream: new URL(UPSTREAM_URL.PETSTORE.BASE_PATH, UPSTREAM_URL.PETSTORE.URL).href,
    prefix: UPSTREAM_URL.PETSTORE.PREFIX,
  });

  fastify.route({
    url: '/gql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: fastifyApolloHandler(server, { context }),
  });

  fastify.get('/health', async (_, reply) => reply.send());

  await fastify.listen({ port, host: '0.0.0.0' });
  return fastify;
};

async function main() {
  if (process.env.NODE_ENV !== 'test') {
    const server = await createApolloServer();
    const info = server.addresses();
    console.log(
      `🚀 Server ready at: ${BUILD_PROFILE === 'localhost' ? 'https://localhost' : 'http://localhost'}:${info[0].port}/ (${NODE_ENV}) / pid(${
        process.pid
      })`,
    );
  }
}

main();
