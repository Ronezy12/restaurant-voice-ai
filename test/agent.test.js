import test from 'node:test';
import assert from 'node:assert/strict';
import { RestaurantAgent } from '../src/ai/agent.js';

test('agent should build an order flow', () => {
  const agent = new RestaurantAgent();
  const a = agent.respond('');
  assert.match(a, /Bonjour/);

  const b = agent.respond('je veux une pizza');
  assert.match(b, /Total provisoire: 12€/);

  const c = agent.respond("c'est tout");
  assert.match(c, /Je récapitule/);
});
