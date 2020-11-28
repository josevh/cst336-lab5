const migration = require("mysql-migrations")

const connection = require("./dbPool.js")

migration.init(connection, __dirname + "/migrations", function () {
  console.log("Finished running migrations");
})