# Our Backend: Productive

Productive is a backend web API service for productivity needs, especially like todos. Built using [NestJS](https://github.com/nestjs/nest) framework TypeScript starter repository.

Similar with:

- Google Keep
- Microsoft Todo
- Todoist
- Checklist in Notion
- GitHub Issues

## Links

- Live:
  - <https://our-backend.mhaidarhanif.com>
  - <https://our-backend.up.railway.app>
- Images:
  - <https://hub.docker.com/r/mhaidarh/our-backend>
  - <https://asia-southeast2-docker.pkg.dev/project-name-123/docker/our-backend>
- Repo: <https://github.com/revou-fsse/our-backend>
- Status: <https://our-status.mhaidarhanif.com>

## Team

| Name        | Role                                 |
| ----------- | ------------------------------------ |
| First Name  | Lead and Backend Developer           |
| Second Name | Backend Developer and Database Admin |
| Third Name  | Backend Developer and Infra Engineer |

## API Documentation

Base API URLs:

- <http://localhost:4000/api>
- <https://our-backend.mhaidarhanif.com/api>

Swagger:

- <https://our-backend.mhaidarhanif.com/docs>

Endpoints:

| HTTP     | Endpoint           | Description             |
| :------- | :----------------- | :---------------------- |
| `GET`    | `/`                | Show welcome            |
| `POST`   | `/auth/register`   | Register new user       |
| `POST`   | `/auth/login`      | Login to user           |
| `GET`    | `/todos`           | Get all todos           |
| `GET`    | `/todos/completed` | Get all completed todos |
| `GET`    | `/todos/:id`       | Get one todo by id      |
| `POST`   | `/todos`           | Create new todo         |
| `PUT`    | `/todos/:id`       | Update one todo by id   |
| `PATCH`  | `/todos/:id`       | Update one todo by id   |
| `DELETE` | `/todos`           | Delete all todos        |
| `DELETE` | `/todos/:id`       | Delete one todo by id   |

## Infra Architecture

![diagram](assets/architecture-diagram.png)

## Install dependencies

```sh
$ pnpm i
```

## Prepare Database

Make sure the database is ready before doing any dependency installation. Edit `.env` file for the app if needed:

```sh
DATABASE_URL="postgres://the_user:the_password@the_hostname:5432/db"
JWT_SECRET="abdefghijklmnopqrstuvwxyzabcdefghi"
UNSPLASH_ACCESS_KEY="abdefghijklmnopqrstuvwxyzabcdefghi"
```

- `DATABASE_URL`, can be retreived from local database instance/container
- `JWT_SECRET`, recommended to generate with `scripts/random.sh`
- `UNSPLASH_ACCESS_KEY`, get it from Unsplash Developer app portal

Run Docker on your machine and run Docker Compose that specifically only run the database instance in the background:

```sh
$ docker compose -f docker-compose.dev.yaml up -d
```

## Install Dependencies

Install local dependencies:

```sh
$ pnpm i
```

Install global dependencies:

```sh
$ pnpm i -g @nestjs/cli
$ pnpm i -g prettier
$ pnpm i -g eslint
```

Check available scripts/commands:

```sh
$ pnpm run
```

## Run for Development

Push or migrate schema to the database or generate Prisma schema while in development:

```sh
$ pnpm prisma:push
$ pnpm prisma:migrate
$ pnpm prisma:generate
```

Then we can run the app

```sh
# development with watch mode
$ pnpm dev

# development
$ pnpm start

# production mode
$ pnpm start:prod
```

## Test

```sh
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```

## License

[MIT License](LICENSE)
