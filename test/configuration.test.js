'use strict';

const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const test = require('node:test');
const { createServer, hosts } = require('../server');

test('validates and normalizes allowed hosts', () => {
  assert.deepEqual(hosts('Plaintext.Example.com'), new Set(['plaintext.example.com']));
  assert.throws(() => hosts('https://bad.example.com'));
});

function request(server, { method = 'GET', url = '/', host = 'plaintext.example.com', headers = {} } = {}) {
  const input = new EventEmitter();
  input.method = method;
  input.url = url;
  input.headers = { host, ...headers };
  input.socket = { remoteAddress: '127.0.0.1' };
  const output = {
    writeHead(status, responseHeaders) { this.status = status; this.headers = responseHeaders; },
    end(body) { this.body = body; }
  };
  server.emit('request', input, output);
  return output;
}

test('only serves the configured plaintext root endpoint', () => {
  const server = createServer({ tls: {}, allowedHosts: new Set(['plaintext.example.com']), rateLimit: 10, text: 'Only text.\n' });
  const success = request(server);
  assert.equal(success.status, 200);
  assert.equal(success.body, 'Only text.\n');
  assert.equal(success.headers['content-type'], 'text/plain; charset=utf-8');
  assert.equal(request(server, { url: '/anything' }).status, 404);
  assert.equal(request(server, { method: 'HEAD' }).status, 405);
  assert.equal(request(server, { method: 'POST' }).status, 405);
  assert.equal(request(server, { host: 'attacker.example' }).status, 421);
  assert.equal(request(server, { headers: { 'content-length': '1' } }).status, 413);
});
