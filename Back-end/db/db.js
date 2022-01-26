const mysql = require("mysql");

const db = mysql.createConnection({
  host: "bxfh7w9vnlao9idt3e6d-mysql.services.clever-cloud.com",
  port: "3306",
  user: "umuuaf8m3vxxzzmv",
  password: "Qihef6M9ksnuyAaWwWZO",
  database: "bxfh7w9vnlao9idt3e6d",
});

module.exports = db;
