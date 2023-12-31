import { RESTDataSource } from '@apollo/datasource-rest';
import { RequestOptions } from '@apollo/datasource-rest';
import { FastifyReply, FastifyRequest } from 'fastify';
import setCookie from 'set-cookie-parser';
import { NODE_ENV } from '../config';

export class BaseDataSource extends RESTDataSource {
  private token: string;
  private cookie: string;
  private defaultTimeout = 5000;
  private reply: FastifyReply;

  constructor(req: FastifyRequest, reply: FastifyReply) {
    super({ logger: req.log });
    this.token = req.headers.authorization;
    this.cookie = req.headers.cookie;
    this.reply = reply;
  }

  override willSendRequest(_path: string, request) {
    if (this.defaultTimeout) request.signal = AbortSignal.timeout(this.defaultTimeout);
    if (this.token) request.headers.authorization = this.token;
    request.headers.cookie = this.cookie;
  }

  /**
   * 컨텐츠 타입이 json인데 응답값이 string으로 올 경우 발생되는 에러로 인하여 오버라이딩 함
   * reference: https://github.com/node-fetch/node-fetch/issues/533
   */
  override async parseBody(response): Promise<object | string> {
    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');
    const cookies = response.headers.get('set-cookie');
    this.setCookies(cookies);
    if (response.status !== 204 && contentLength !== '0' && contentType.includes('json')) {
      const body = await response.text();
      try {
        return JSON.parse(body);
      } catch (error) {
        return body;
      }
    } else {
      return await response.text();
    }
  }

  /**
   * 서버 쿠키 설정을 그대로 적용
   * @param cookies 서버 응답 쿠키 값
   */
  setCookies(cookies: string) {
    if (cookies && typeof cookies === 'string') {
      setCookie
        .splitCookiesString(cookies)
        .map((v) => setCookie.parse(v))
        .reduce((prev, curr) => prev.concat(curr), [])
        .forEach((cookie) => {
          this.reply.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expires: cookie.expires && !isNaN(Date.parse(cookie.expires.toString())) ? new Date(cookie.expires) : undefined,
            httpOnly: cookie.httpOnly,
            maxAge: cookie.maxAge,
            path: cookie.path,
            sameSite: cookie.sameSite as 'lax' | 'none' | 'strict' | undefined,
            secure: cookie.secure,
          });
        });
    }
  }

  /**
   * 좀 더 상세한 로그를 위해서 오버라이딩함
   */
  override async trace<TResult>(url: URL, request: RequestOptions, fn: () => Promise<TResult>): Promise<TResult> {
    const result = super.trace(url, request, fn);
    result
      .then((v) => {
        if (NODE_ENV === 'development') {
          // @ts-ignore
          v.params = request.params;
          // @ts-ignore
          v.body = request.body;
          this.logger.debug(v);
        }
      })
      .catch((v) => {
        if (v.extensions?.response?.status !== 401) {
          this.logger.error(v);
        }
      });
    return result;
  }

  excludeParams(params, keys: string[]) {
    const _params = structuredClone(params);
    for (let key in keys) {
      delete _params[key];
    }
    return _params;
  }
}
