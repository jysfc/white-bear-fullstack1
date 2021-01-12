require("dotenv").config();
const mysql = require("mysql");
const selectUser = require("./queries/selectUser");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

connection.connect();

connection.query(selectUser("mike@gmail.com", "replace_me"), (err, res) => {
   if (err) {
      console.log(err);
   } else {
      console.log(res);
   }
});

connection.end();
