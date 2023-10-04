import { CONFIG } from "../config";
import { Api, ContentType } from "./api";

export const limit = 10;

export const api = new Api({
  baseUrl: `${CONFIG.API_HOST}/api`,
  securityWorker: (token) =>
    token ? { headers: { Authorization: `Bearer ${token}` } } : {},
  baseApiParams: {
    headers: {
      "content-type": ContentType.Json,
    },
    format: "json",
  },
});