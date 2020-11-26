var mysql = require('mysql');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : 'mysql',
  user     : 'root',
  password : 'root',
  database : 'cst336-lab5'
});

migration.init(connection, __dirname + '/migrations', function() {
  console.log("Finished running migrations");
});
