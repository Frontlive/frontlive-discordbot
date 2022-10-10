import crypto from 'node:crypto';
import { env } from '../../config';
import type { preHandlerHookHandler } from 'fastify';

export const validateSignatureHook: preHandlerHookHandler = (request, reply, done) => {
  const id = request.headers['twitch-eventsub-message-id'];
  const timestamp = request.headers['twitch-eventsub-message-timestamp'];
  const signature = request.headers['twitch-eventsub-message-signature'];

  if (typeof id !== 'string' || typeof timestamp !== 'string' || typeof signature !== 'string') {
    return reply.forbidden();
  }

  const calculatedSignature = crypto
    .createHmac('sha256', env.EVENTSUB_SECRET)
    .update(id + timestamp + request.rawBody)
    .digest('hex');

  if (`sha256=${calculatedSignature}` !== signature) {
    return reply.forbidden();
  }

  done();
};

export const verifyNotification: preHandlerHookHandler = (request, reply, done) => {
  const type = request.headers['twitch-eventsub-message-type'];

  if (type === 'webhook_callback_verification') {
    reply.send((request.body as { challenge: unknown }).challenge);
  }

  done();
};
