<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Zingvel Backend API

## Getting Started

### Development
```bash
npm install
npm run dev
```
- Runs on: http://localhost:3434
- Swagger docs: http://localhost:3434/swagger

### Useful Commands

#### Check MongoDB TTL Index for Visitors Collection
To verify that the TTL index (auto-delete after 7 days) is set on the visitors collection, run this in the MongoDB shell:

```bash
mongo <your-db-uri>
use zingvel
// List all indexes for the visitors collection
 db.visitors.getIndexes()
```
You should see an index with `expireAfterSeconds: 604800` (7 days).

#### Other Common Commands
- **Start in watch mode:**
  ```bash
  npm run start:dev
  ```
- **Start in production mode:**
  ```bash
  npm run start:prod
  ```
- **Run unit tests:**
  ```bash
  npm run test
  ```
- **Run e2e tests:**
  ```bash
  npm run test:e2e
  ```
- **Check test coverage:**
  ```bash
  npm run test:cov
  ```

### Production
```bash
npm run build:prod
npm run serve:prod
```
- Runs on: http://localhost:3434
- Swagger docs: http://localhost:3434/swagger

### Environment Variables
- `.env.development` for development
- `.env.production` for production

#### Example .env
```
db_uri=mongodb://localhost:27017/zingvel
jwt_secret=dev_secret
port=3434
cors_origins= # comma-separated list for prod, leave blank for none
```

### MongoDB Atlas
Set your MongoDB Atlas URI in the `db_uri` variable in the appropriate `.env` file.

---

## Features
- Fastify + NestJS
- Dynamic CORS (dev: *, prod: configurable)
- Swagger API docs at `/swagger`
- MongoDB connection via helper
- Helmet for security

---

## Deployment
For PM2 or similar:
```bash
npm run build:prod
npm run serve:prod
```

---

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
# zingvel_backend_v3
