// Update with your config settings.

module.exports = {

  development: {
    client: "pg",
    connection: {
      user: 'postgres',
      host: 'localhost',
      database: 'blogger_server',
      password: '1234',
      port: 5432
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

  // add postgres plugin to heroku project
    // heroku addons: create heroku-posgresql: hobby-dev
    // heroku config: set PGSSLMODE = no-verify
    // heroku run knex migrate: rollback
    // heroku run knex migrate: latest
    // heroku run knex seed: run