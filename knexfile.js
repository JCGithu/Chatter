module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './server/Database/dev.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './server/Database/migrations',
    },
  },
};
