// get the client
import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt-db",
  port: "3307",
  password: "123456",
});

// simple query
connection.query(
  `INSERT INTO users (email, password, userName)
  VALUES ('Cardinal', '123', 'Tom')`,
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);
const handleHome = (req, res) => {
  return res.render("home");
};
const handleUserPage = (req, res) => {
  return res.render("user");
};
const handleCreateUser = (req, res) => {
  let { email, userName, password } = req.body;
  connection.query(
    `INSERT INTO users (email, password, userName)
  VALUES (?, ?, ?)`,
    [email, password, userName],
    function (err, results, fields) {
      if (err) {
        console.log("err", err);
      }
    }
  );
  console.log("check req", req.body);
  return res.send("handleCreateUser");
};
module.exports = { handleHome, handleUserPage, handleCreateUser };
