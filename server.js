require("dotenv").config();
const mysql = require("mysql");
const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

connection.connect();

function queryUser(email, password) {
   return `
   SELECT
      id, email, created_at
   FROM
      users
   WHERE
      email = '${email}'
      AND password = '${password}'
   LIMIT 1;
`;
}
connection.query(queryUser("mike@gmail.com", "replace_me"), (err, res) => {
   if (err) {
      console.log(err);
   } else {
      console.log(res);
   }
});

connection.end();
