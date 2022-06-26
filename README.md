## Description

AWS S3 uploader

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

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

## Environment Variables

#### Example

```aidl
PORT=3000
MAX_FILE_SIZE=5mb
AWS_S3_BUCKET_NAME=frinverity
VALID_FILE_EXTENSIONS='.jpg .jpeg .png'
VALID_CONTENT_TYPES='image/png image/jpg image/jpeg'
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
```

## Docs

You can find Swagger documentation at **[http://localhost:3000/api](http://localhost:3000/api)**.
