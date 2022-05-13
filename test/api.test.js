const supertest = require('supertest');
const server = require('../server');
const request = supertest(server);
const {seed} = require('../data/seed.js')

beforeEach(() => {
  seed();
});

describe('General Errors', () => {

  test('404: Path Not Found', async () => {
    const {body} = await request.get('/api/not_a_path').expect(404);
    expect(body.msg).toBe('Path not found');
  });
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

  test('GET /api/recipes?exclude_ingredients=... -> 200: Returns valid recipes', async () => {
    const {body} = await request.get('/api/recipes?excludes_ingredients=apples,bananas,carrots')
      .expect(200);

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

describe('/api/recipes/:id requests', () => {

  test('GET api/recipes/:id -> 200: Returns single recipe', async () => {

    const {body} = await request.get('/api/recipes/recipe-88').expect(200);

    expect(body.recipe).toEqual(
       {
        "id": "recipe-88",
        "imageUrl": "http://www.images.com/12",
        "instructions": "blend with oat milk and ice, sprinkle with salt",
        "ingredients": [
          { "name": "blueberries", "grams": 114 },
          { "name": "coffee", "grams": 20 },
          { "name": "kale", "grams": 48 }
        ]
      }
    );
  });

  test('GET api/recipes/:id -> Recipe Ingredients get reduced', async () => {

    const {body} = await request.get('/api/recipes/recipe-77').expect(200);

    expect(body.recipe.ingredients).toEqual([
      { "name": "coconut", "grams": 71 },
      { "name": "lime", "grams": 153 },
      { "name": "oat milk", "grams": 31 }
    ]);
  })

  test('GET api/recipes/:id -> 404: ID Not Found', async () => {

    const {body} = await request.get('/api/recipes/recipe-1000000').expect(404);
    expect(body.msg).toBe("ID not found");
  });

  test('Get api/recipes/:id -> 400: Invalid ID', async () => {

    const {body} = await request.get('/api/recipes/88').expect(400);
    expect(body.msg).toBe("Invalid ID");
  });
  
});




