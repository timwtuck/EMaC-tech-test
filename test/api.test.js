const supertest = require('supertest');
const server = require('../server');
const request = supertest(server);
const {seed} = require('../data/seed.js')

beforeEach(() => {
  seed();
});

describe('/api requests', () => {

  test('GET /api -> 200: Returns ok', async () => {
    const { body } = await request.get('/api').expect(200);
    expect(body.message).toBe('ok');
  });
});

// describe('/api/recipes requests', () => {

//   test('GET /api/recipes -> 200: Returns all recipes', () => {


//   });
// });




