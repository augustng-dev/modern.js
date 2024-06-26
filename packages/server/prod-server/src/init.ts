import {
  ServerBase,
  bindRenderHandler,
  favionFallbackMiddleware,
  injectReporter,
  injectLogger,
  createErrorHtml,
  logHandler,
  processedBy,
} from '@modern-js/server-core/base';
import { createLogger } from '@modern-js/utils';
import {
  injectTemplates,
  bindBFFHandler,
  injectServerManifest,
  createStaticMiddleware,
} from '@modern-js/server-core/base/node';
import { ErrorDigest, onError } from './error';
import { ProdServerOptions, BaseEnv } from './types';

export type InitProdMiddlewares = typeof initProdMiddlewares;

function getLogger() {
  if (process.env.DEBUG || process.env.NODE_ENV === 'production') {
    return createLogger({ level: 'verbose' });
  } else {
    return createLogger();
  }
}

export const initProdMiddlewares = async (
  server: ServerBase<BaseEnv>,
  options: ProdServerOptions,
) => {
  const { config, pwd, routes, logger: inputLogger } = options;
  const logger = inputLogger || getLogger();
  const staticMiddleware = createStaticMiddleware({
    pwd,
    output: config?.output || {},
    html: config?.html || {},
    routes,
  });

  server.all('*', processedBy);
  server.all('*', injectReporter());
  server.all('*', injectLogger(logger));
  server.all('*', logHandler());

  server.all('*', injectServerManifest(pwd, routes));
  // inject html templates
  server.all('*', injectTemplates(pwd, routes));

  server.notFound(c => {
    const logger = c.get('logger');
    onError(logger, ErrorDigest.ENOTF, '404 not found', c.req.raw);
    return c.html(createErrorHtml(404), 404);
  });

  server.onError((err, c) => {
    const logger = c.get('logger');
    onError(logger, ErrorDigest.EINTER, err, c.req.raw);
    return c.html(createErrorHtml(500), 500);
  });

  server.get('*', staticMiddleware);
  server.get('*', favionFallbackMiddleware);

  await bindBFFHandler(server, options);

  await bindRenderHandler(server, options);

  return server;
};
