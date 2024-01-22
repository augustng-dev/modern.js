import {
  CookieAPI,
  HookContext,
  ModernRequest,
  ModernResponse,
} from '@modern-js/types';
import { getCookie } from 'hono/cookie';
import { HonoContext, HonoRequest } from '../../types';
import { getHost } from '../utils';

export function createBaseHookContext(c: HonoContext): HookContext {
  return {
    request: new BaseHookRequest(c),
    response: new BaseHookResponse(c),
    // TODO: add logger & metrics
    logger: undefined as any,
    metrics: undefined,
  };
}

class BaseHookRequest implements ModernRequest {
  private req: HonoRequest;

  private c: HonoContext;

  constructor(c: HonoContext) {
    this.c = c;
    this.req = c.req;
  }

  get url(): string {
    return this.req.url;
  }

  get host(): string {
    return getHost(this.req);
  }

  get pathname(): string {
    return this.req.path;
  }

  get query(): Record<string, any> {
    return this.req.query();
  }

  get headers(): Record<string, any> {
    return this.req.header();
  }

  get cookies(): Pick<CookieAPI, 'get'> {
    return {
      // FIXME: ModernRequest Type Error
      get: (key: string) => {
        return getCookie(this.c, key) as string;
      },
    };
  }

  get cookie(): string {
    // FIXME: ModernRequest Type Error
    return this.req.header('cookie') as string;
  }
}

class BaseHookResponse implements ModernResponse {
  private c: HonoContext;

  constructor(c: HonoContext) {
    this.c = c;
  }

  get(key: string) {
    return this.c.res.headers.get(key) as
      | string
      | number
      | string[]
      | undefined;
  }

  set(key: string, value: string | number) {
    // we should append, if the key is `set-cookie`
    if (['set-cookie', 'Set-Cookie'].includes(key)) {
      this.c.res.headers.append(key, value.toString());
    } else {
      this.c.res.headers.set(key, value.toString());
    }
  }

  status(code: number) {
    this.c.status(code);
  }

  get cookies() {
    const setCookie = (key: string, value: string) => {
      this.c.res.headers.append(key, value);
    };

    const clearCookie = () => {
      this.c.res.headers.delete('set-cookie');
    };

    return {
      set: setCookie,
      clear: clearCookie,
    };
  }

  raw(
    body: string,
    options?:
      | {
          status?: number | undefined;
          headers?: Record<string, any> | undefined;
        }
      | undefined,
  ) {
    this.c.res = this.c.newResponse(body, options);
  }
}