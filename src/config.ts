import { cpus, arch } from 'os';

export const PORT = Number(process.env.PORT ?? 4000);

export const BUILD_PROFILE = process.env.BUILD_PROFILE ?? 'localhost';

export const NODE_ENV = BUILD_PROFILE === 'localhost' ? 'development' : process.env.NODE_ENV;

export const BODY_LIMIT = 10 * 1024 * 1024; // 10MiB

export const LOGGER_OPTIONS = (() => {
  if (process.env.NODE_ENV === 'test') return false;
  const transport = {
    target: 'pino-pretty',
    options: {
      translateTime: 'yyyy-mm-dd HH:MM:ss Z',
      ignore: 'pid,hostname,remoteAddress,remotePort',
      singleLine: true,
      colorize: false,
    },
  };
  return {
    development: { level: 'debug', transport },
    production: { level: 'warn', transport },
  }[NODE_ENV];
})();

export const CORS_ORIGIN = (() =>
  ({
    localhost: [],
  })[BUILD_PROFILE])();

const PETSTORE_UPSTREAM = (() =>
  ({
    localhost: 'https://petstore.swagger.io/',
  })[BUILD_PROFILE])();

export const UPSTREAM_URL = {
  PETSTORE: {
    PREFIX: '/gql/petstore',
    BASE_PATH: '/v2',
    URL: PETSTORE_UPSTREAM,
  },
};

export const LANDINGPAGE_INIT_QUERY = `mutation {
  bakeCookie(key: "_WA_D_ID_", value: "...")
}
`;

process.env.NODE_ENV !== 'test' &&
  console.info('config', {
    ARCH: arch(),
    CPUS: cpus().length,
    PORT,
    BUILD_PROFILE,
    NODE_ENV,
    'process.env.NODE_ENV': process.env.NODE_ENV,
    BODY_LIMIT,
    LOGGER_OPTIONS,
    CORS_ORIGIN,
    UPSTREAM_URL,
  });
