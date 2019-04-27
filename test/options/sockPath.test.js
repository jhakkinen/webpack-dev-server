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

  describe('sockPath', () => {
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

    it('should allow sockPath to be a string', () => {
      let error = null;
      try {
        const sockPath = '';
        server = new Server(compiler, { sockPath });
      } catch (err) {
        error = err;
      }
      expect(error).toBe(null);
    });

    it('should not allow sockPath to be the wrong type', () => {
      let error = null;
      try {
        server = new Server(compiler, { sockPath: false });
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(ValidationError);
    });
  });
});
