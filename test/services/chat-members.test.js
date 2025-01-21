const assert = require('assert');
const app = require('../../src/app');

describe('\'chat-members\' service', () => {
  it('registered the service', () => {
    const service = app.service('chat-members');

    assert.ok(service, 'Registered the service');
  });
});
