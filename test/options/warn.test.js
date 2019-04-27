'use strict';

const ValidationError = require('schema-utils/src/ValidationError');
const webpack = require('webpack');
const Server = require('../../lib/Server');
const config = require('../fixtures/simple-config/webpack.config');

describe('Validation', () => {
  let compiler;
  let server;

  beforeAll(() => {
    compiler = webpack(config);
  });

  describe('warn', () => {
    beforeEach(() => {
      server = null;
    });
    afterEach((done) => {
      if (server) {
        server.close(() => {
          done();
        });
      } else {
        done();
      }
    });

    it('should allow warn to be a function', () => {
      let error = null;
      try {
        const warn = () => {};
        server = new Server(compiler, { warn });
      } catch (err) {
        error = err;
      }
      expect(error).toBe(null);
    });

    it('should not allow warn to be the wrong type', () => {
      let error = null;
      try {
        server = new Server(compiler, { warn: '' });
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(ValidationError);
    });
  });
});
