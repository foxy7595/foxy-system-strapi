const path = require("path");

module.exports = ({ env }) => ({
  // connection: {
  //   client: "sqlite",
  //   connection: {
  //     filename: path.join(
  //       __dirname,
  //       "..",
  //       env("DATABASE_FILENAME", ".tmp/data.db")
  //     ),
  //   },
  //   useNullAsDefault: true,
  // },

  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("POSTGRES_PORT", 5432),
      database: env("POSTGRES_DB", "bank"),
      user: env("POSTGRES_USER", "postgres"),
      password: env("POSTGRES_PASSWORD", "0000"),
      // ssl: {
      //   rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false),
      // },
    },
    debug: false,
  },
});
