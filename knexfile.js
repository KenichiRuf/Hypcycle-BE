// Update with your config settings.

module.exports = {

  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/hypcycle.db3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    useNullAsDefault: true,
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  }

};
