const mysql = require("mysql")

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || "db",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "root",
    database: process.env.MYSQL_DATABASE || "cst336-lab5",
    insecureAuth: true
  })

module.exports = pool