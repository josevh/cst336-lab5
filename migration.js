var mysql = require('mysql')
var migration = require('mysql-migrations')

var connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || 'db',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'cst336-lab5',
  insecureAuth: true
})

migration.init(connection, __dirname + '/migrations', function () {
  console.log("Finished running migrations");
})