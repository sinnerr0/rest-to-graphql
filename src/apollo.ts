import { ApolloServer } from '@apollo/server';
import resolvers from './resolvers/resolvers';
import typeDefs from './schema/type-defs';
import { LANDINGPAGE_INIT_QUERY, NODE_ENV } from './config';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloFastifyContextFunction, fastifyApolloDrainPlugin } from '@as-integrations/fastify';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { makeExecutableSchema } from '@graphql-tools/schema';
import depthLimit from 'graphql-depth-limit';
import { PetstoreBaseDatasource } from './api/petstore-base.datasource';

export interface ContextValue {
  req: FastifyRequest;
  reply: FastifyReply;
  api: {
    petstore: {
      base: PetstoreBaseDatasource;
    };
  };
}

function getPlugins(server?: FastifyInstance) {
  const plugins = [];
  if (NODE_ENV === 'development') {
    plugins.push(
      ApolloServerPluginLandingPageLocalDefault({
        includeCookies: true,
        document: LANDINGPAGE_INIT_QUERY,
        embed: {
          runTelemetry: false,
          initialState: {
            pollForSchemaUpdates: false,
          },
        },
      }),
    );
  } else {
    plugins.push(ApolloServerPluginLandingPageDisabled());
    server && plugins.push(fastifyApolloDrainPlugin(server));
  }
  return plugins;
}

export const apollo = async (server: FastifyInstance) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return new ApolloServer<ContextValue>({
    schema,
    plugins: getPlugins(server),
    validationRules: [depthLimit(10)],
    introspection: NODE_ENV === 'development',
    allowBatchedHttpRequests: true,
    formatError: (formattedError, error) => {
      // @ts-ignore
      if (formattedError.extensions?.response?.url) {
        // @ts-ignore
        formattedError.extensions.response.url = undefined;
      }
      return {
        message: formattedError.message,
        path: formattedError.path,
        extensions: formattedError.extensions,
      };
    },
  });
};

export const context: ApolloFastifyContextFunction<ContextValue> = async (req, reply) => {
  return {
    req,
    reply,
    api: {
      petstore: {
        base: new PetstoreBaseDatasource(req, reply),
      },
    },
  };
};
