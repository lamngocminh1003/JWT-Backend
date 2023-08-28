import bcrypt from "bcryptjs";
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
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
const createNewUser = (data) => {
  let { email, userName, password } = data;
  let hashPasswordUser = hashPassword(password);
  connection.query(
    `INSERT INTO users (email, password, userName)
      VALUES (?, ?, ?)`,
    [email, hashPasswordUser, userName],
    function (err, results, fields) {
      if (err) {
        console.log("err", err);
      }
    }
  );
};
const getUserList = () => {
  let user = [];
  connection.query("SELECT * FROM `users`", function (err, results, fields) {
    if (err) {
      console.log("err", err);
    }
    console.log("results", results);
  });
};
module.exports = { hashPassword, createNewUser, getUserList };
