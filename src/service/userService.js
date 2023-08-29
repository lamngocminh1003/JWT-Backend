import bcrypt from "bcryptjs";
// get the client
import mysql from "mysql2/promise";
// get the promise implementation, we will use bluebird
import bluebird from "bluebird";

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
const getUserList = async () => {
  // create the connection to database
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt-db",
    port: "3307",
    password: "123456",
    Promise: bluebird,
  });
  let user = [];
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM `users`");
    return rows;
  } catch (error) {
    console.log("check error");
  }
};
module.exports = { hashPassword, createNewUser, getUserList };
