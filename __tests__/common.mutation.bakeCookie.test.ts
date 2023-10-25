import request from 'supertest';
import { getTestServerInfo } from './util-test';

describe('common mutation bakeCookie', () => {
  let server, url;

  beforeAll(async () => {
    let info = await getTestServerInfo();
    server = info.server;
    url = info.url;
  });

  afterAll(async () => {
    await server.close();
  });

  it('run', async () => {
    const queryData = {
      query: `
        mutation {
          bakeCookie(key: "_WA_D_ID_", value: "test-cookies")
        }
      `,
      variables: {},
    };
    const response = await request(url).post('/').send(queryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toMatchObject({ bakeCookie: null });
    expect(response.headers['set-cookie'][0]).toContain('_WA_D_ID_=test-cookies');
  });
});
