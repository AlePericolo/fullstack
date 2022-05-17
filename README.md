# Fullstack-test-project

## Dependency Installation

```sh
$ git clone https://github.com/AlePericolo/fullstack.git
$ cd fullstack/client
$ npm i
$ cd fullstack/server
$ npm i
```

## Server Dev Scripts

```sh
dir: fullstack/server
$ cd docker
$ docker compose up
$ cd ..
$ npm run start
```

## Client Dev Scripts

```sh
dir: fullstack/client
$ export API_ENDPOINT=http://localhost:3000 && npm run serve
```


## Swagger Dev

http://localhost:3000/documentation/static/index.html