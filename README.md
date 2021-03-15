# 01.post_ventas_backend
**Post Ventas**  is a project to manage the way that the buyer makes a warranty after buying a real state unit. And the way they have  connection with  the builder.

## About API Stack
* TypeOrm
* TypeScript
* PostgreSQL
* Express

## Let's start

### Clone the project

```bash
git clone git@github.com:InnovaPacs/post_ventas_backend.git
```

```bash
cd post_ventas_backend
```

```bash
npm i
```

### Configure database

You could find ormconfig.js file to configure the database

```
{
  "type": "postgres",
  "host": "localhost",
  "port": "5431",
  "username": "postventa",
  "password": "postventa",
  "database": "postventa",
  "entities": ["build/database/entities/**/*.js"],
  "synchronize": true,
  "name": "postventa"
}
```

### Start development
First transpile the code of TypeScript and run nodemon in different command-line.

```bash
npm run tsc
```

```bash
npm run start:dev
```




