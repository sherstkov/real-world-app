import { CONFIG } from '../config';
import { Api, ContentType } from './api';
import type { GenericErrorModel, HttpResponse } from './api';

export const limit = 10;

export const api = new Api({
  baseUrl: `${CONFIG.API_HOST}/api`,
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  baseApiParams: {
    headers: {
      'content-type': ContentType.Json,
    },
    format: 'json',
  },
});

export function isFetchError<E = GenericErrorModel>(e: unknown): e is HttpResponse<unknown, E> {
  return e instanceof Object && 'error' in e;
}

export function pageToOffset(
  page: number = 1,
  localLimit = limit,
): { limit: number; offset: number } {
  const offset = (page - 1) * localLimit;
  return { limit: localLimit, offset };
}
