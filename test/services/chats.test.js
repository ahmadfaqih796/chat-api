const assert = require('assert');
const app = require('../../src/app');

describe('\'chats\' service', () => {
  it('registered the service', () => {
    const service = app.service('chats');

    assert.ok(service, 'Registered the service');
  });
});
