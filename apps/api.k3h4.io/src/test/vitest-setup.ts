import http from 'node:http';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const LightMyRequestResponse = require('light-my-request/lib/response');

interface PatchedLightMyRequestResponse extends http.ServerResponse {
  _lightMyRequest?:
      {headers: Record<string, string|string[]>; payloadChunks?: Buffer[];};
}

const normalizeOutgoingHeaders =
    (headers: http.OutgoingHttpHeaders): Record<string, string|string[]> => {
      const normalized: Record<string, string|string[]> = {};
      for (const [key, value] of Object.entries(headers)) {
        if (typeof value === 'undefined') continue;
        if (Array.isArray(value)) {
          normalized[key] = value.map((entry) => String(entry));
        } else {
          normalized[key] = String(value);
        }
      }
      return normalized;
    };

const originalWriteHead =
    http.ServerResponse.prototype.writeHead as (
        statusCode: number,
        statusMessageOrHeaders?: string|http.OutgoingHttpHeaders|
        http.OutgoingHttpHeader[],
        headers?: http.OutgoingHttpHeaders|http.OutgoingHttpHeader[],
        ) => http.ServerResponse;
const responsePrototype =
    LightMyRequestResponse.prototype as PatchedLightMyRequestResponse;

responsePrototype.writeHead = function writeHead(
    this: PatchedLightMyRequestResponse,
    statusCode: number,
    statusMessageOrHeaders?: string|http.OutgoingHttpHeaders|
    http.OutgoingHttpHeader[],
    headers?: http.OutgoingHttpHeaders|http.OutgoingHttpHeader[],
) {
  if (this.headersSent) {
    console.error('writeHead invoked after headers sent', {
      stack: new Error().stack,
      statusCode: this.statusCode,
    });
  }
  const result = originalWriteHead.call(
      this, statusCode, statusMessageOrHeaders as any, headers as any);
  if (this._lightMyRequest) {
    this._lightMyRequest.headers = normalizeOutgoingHeaders(this.getHeaders());
  }
  return result;
};

console.log('patched light-my-request writeHead');
