import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (
    typeof globalThis.localStorage !== 'undefined' &&
    typeof (globalThis.localStorage as any).getItem !== 'function'
  ) {
    delete (globalThis as any).localStorage;
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
