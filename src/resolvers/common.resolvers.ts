import { Resolvers } from '../generated/graphql';

export const resolvers: Resolvers = {
  Mutation: {
    bakeCookie: async (_, { key, value }, { req, reply }, info) => {
      reply.cookie(key, value, {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
      });
    },
  },
};
