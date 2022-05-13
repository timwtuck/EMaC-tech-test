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

describe('/api/recipes requests', () => {

  test('GET /api/recipes -> 200: Returns all recipes', async () => {
    const {body} = await request.get('/api/recipes').expect(200);
    
    expect(body.recipes.length).toBe(10);
    body.recipes.forEach((recipe) => {

      expect(recipe).toMatchObject({
        id: expect.any(String),
        imageUrl: expect.any(String),
        instructions: expect.any(String),
        ingredients: expect.any(Array) 
      });
    });
  });

  test.only('GET /api/recipes?exclude_ingredients=... -> 200: Returns valid recipes', async () => {
    const {body} = await request.get('/api/recipes?excludes_ingredients=apples,bananas,carrots');

    expect(body.recipes.length).toBe(7);
    const exclude = /(apples|bananas|carrots)/;

    // make sure no ingredients on the exclude list
    body.recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        expect(exclude.test(ingredient.name)).toBe(false);
      });
    });
  });

});




