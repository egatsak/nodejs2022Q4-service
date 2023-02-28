# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/)

## Downloading

```
git clone {repository URL}
```

Then `cd nodejs2022q4-service`

Then `git checkout auth-logger`

## Installing NPM modules

```
npm install
```

Then delete `pgdata` and `pgadmin-data` folders! And delete any files in `migration` folder if they exist.

## Adding .env

Please create `.env` file from `.env.example` !

Add two vars to it:

`LVL_LOG=3`

`FILE_SIZE_KB=10`

## Running application

```
docker-compose up
```

This command creates 3 images and 3 containers. Default app exposed port is 4000, postgresql exposed port is 5432, pgadmin exposed port is 8080.

If you want to explore the database using pg4admin, open `http://localhost:8080`, then login (credentials are provided in the `.env` file), then connect to the database. If you face `ECONNREFUSED` error, please run `docker inspect postgres-db`, then find `"Config" : {"Hostname": "<you need this!>"}` in the large JSON in the console, e.g. `25ab3bba603c`, copy this value and insert it as a hostname in a pg4admin rest-service options.

## Migration

If you want to test migrations, run `npm run typeorm:generate` and then `npm run typeorm:run`.

If you want to test only the auth & logger, open `typeorm.config.ts` and set `synchronize:true`.

## NB

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Open the console or the Docker terminal for `nest-rest-service` container to observe logging.

## Testing

After application running (please wait for the message `Server listening on port 4000`!) open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

If fails, please try

```
npm run test:auth -- --runInBand
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

NB! Some tests may fail due to timeout so please run them several times or increase the timeout for them (all the suite takes ~30sec to run).

### Logs

can be found in dist/logs folder

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
