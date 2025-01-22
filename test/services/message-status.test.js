const assert = require('assert');
const app = require('../../src/app');

describe('\'message-status\' service', () => {
  it('registered the service', () => {
    const service = app.service('message-status');

    assert.ok(service, 'Registered the service');
  });
});
