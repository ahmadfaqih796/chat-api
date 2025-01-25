const assert = require('assert');
const app = require('../../src/app');

describe('\'chat-lists\' service', () => {
  it('registered the service', () => {
    const service = app.service('chat-lists');

    assert.ok(service, 'Registered the service');
  });
});
