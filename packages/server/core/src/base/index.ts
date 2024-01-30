import { ServerBase } from './serverBase';
import {
  ServerNodeContext,
  ServerBaseOptions,
  Next,
  Middleware,
  HonoEnv,
} from './types';
import { createNodeServer } from './adapters/node';
import { httpCallBack2HonoMid, connectMid2HonoMid } from './adapters/hono';
import { registerMockHandlers } from './adapters/mock';

export { createErrorHtml } from './libs/utils';

export { createStaticMiddleware } from './adapters/serverStatic';
export type { CreateRenderHOptions } from './renderHandler';
export {
  bindRenderHandler,
  type BindRenderHandleOptions,
} from './renderHandler';
export { injectReporter, injectLogger } from './adapters/monitor';
export * from './middlewares';

export { httpCallBack2HonoMid, connectMid2HonoMid };
export type { ServerNodeContext, ServerBaseOptions, Next, Middleware };
export { registerMockHandlers };
export { createNodeServer, ServerBase };

export async function createServerBase<E extends HonoEnv>(
  options: ServerBaseOptions,
) {
  if (options == null) {
    throw new Error('can not start server without options');
  }

  const server = new ServerBase<E>({
    ...options,
  });

  return server;
}