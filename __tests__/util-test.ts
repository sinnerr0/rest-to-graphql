import { createApolloServer } from '../src/index';
export async function getTestServerInfo() {
  const server = await createApolloServer(0);
  const info = server.addresses();
  const url = `http://${info[0].address}:${info[0].port}`;
  return { server, url };
}
