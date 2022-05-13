# README - Lizzo’s Juicy Juice Bar - The Server

## Prerequisites

- Node > v17.5
- npm

## Getting Started

Before attempting anything, ensure you have run `npm i` in this directory to install all dependencies.

## Testing

All tests are in the `test` directory. We use `jest` and `supertest` to test our server. Run `npm t` to execute tests.
There are 2 databases on the system - a development database and a smaller test database that is ran and seeded when tests are ran.

## Running Dev Server

Run `npm run dev` to run the development server. It is configured to run on localhost:9090 by default.

## Endpoints

- `/api`
  - GET - Returns a 200 and an `ok` message when the server is online
- `/api/recipes`
  - queries -> exclude_ingredients?item1,item2,...
  - GET - Returns a 200 and an array of JSON objects / all recipes that don't include items in the query list
- `/api/recipes/:id`
  - GET - Returns a 200 and a JSON object
