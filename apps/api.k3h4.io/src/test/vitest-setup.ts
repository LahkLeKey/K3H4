import http from 'node:http';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const LightMyRequestResponse = require('light-my-request/lib/response');

interface PatchedLightMyRequestResponse extends http.ServerResponse {
  _lightMyRequest?:
      {headers: Record<string, string|string[]>; payloadChunks?: Buffer[];};
}

const originalWriteHead = http.ServerResponse.prototype.writeHead;
const responsePrototype =
    LightMyRequestResponse.prototype as PatchedLightMyRequestResponse;

responsePrototype.writeHead = function writeHead(
    this: PatchedLightMyRequestResponse,
    ...args: Parameters<typeof http.ServerResponse.prototype.writeHead>) {
  if (this.headersSent) {
    console.error('writeHead invoked after headers sent', {
      stack: new Error().stack,
      statusCode: this.statusCode,
    });
  }
  const result = originalWriteHead.apply(this, args);
  if (this._lightMyRequest) {
    this._lightMyRequest.headers = Object.assign({}, this.getHeaders());
  }
  return result;
};

console.log('patched light-my-request writeHead');
