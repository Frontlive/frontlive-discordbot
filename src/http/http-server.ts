import Fastify from 'fastify';
import { validateSignatureHook, verifyNotification } from './hooks/notification.hooks';
import { streamOnlineHandler } from './handlers/stream-online.handler';
import type { FastifyServerOptions } from 'fastify';

export const createServer = async (opts?: FastifyServerOptions) => {
  const fastify = Fastify(opts);

  await fastify.register(import('@fastify/sensible'));
  await fastify.register(import('fastify-raw-body'));

  fastify.post(
    '/notifications',
    { preHandler: [validateSignatureHook, verifyNotification] },
    streamOnlineHandler,
  );

  return fastify;
};
