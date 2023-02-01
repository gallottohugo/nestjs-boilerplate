# nestjs-boilerplate

## Quickstart

`npm run docker:start`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# full tests
$ npm run docker:test

# full e2e tests 
$ npp run test:e2e:full
```

## Migrations

### Explanation

You can find TypeORM and @nestjs/typeorm configuration in [src/ormconfig.ts](src/ormconfig.ts).

### Generating migrations

In order to generate migrations, please do the following:

- `npm run db:dev:up`
- `npm run migration:generate --name=`
- Drag the generated migration file to the `src/migrations` folder

### Running migrations inside docker container

In order to run migrations INSIDE the docker container generated with `npm run docker:start` just run `npm run docker:migration:run`.
If you wish to execute a typeorm-cli command inside the docker container, you can do `npm run docker:typeorm -- migration:run`
