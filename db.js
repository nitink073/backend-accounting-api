require("dotenv").config()
const mysql= require("mysql2")

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYDATABASE,
  port: process.env.PORT,
//   waitforconnections:true,
//   connectionlimit:10,
//   connectionTimeout:10000
})

module.exports = pool;