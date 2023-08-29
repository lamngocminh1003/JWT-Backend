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
const createNewUser = async (data) => {
  // create the connection to database
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt-db",
    port: "3307",
    password: "123456",
    Promise: bluebird,
  });
  let { email, userName, password } = data;
  let hashPasswordUser = hashPassword(password);
  try {
    const [rows, fields] = await connection.execute(
      `INSERT INTO users (email, password, userName)
    VALUES (?, ?, ?)`,
      [email, hashPasswordUser, userName]
    );
    return rows;
  } catch (error) {
    console.log("check error");
  }
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
const deleteUser = async (userId) => {
  // create the connection to database
  let { id } = userId;
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt-db",
    port: "3307",
    password: "123456",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      `DELETE FROM users WHERE id=?`,
      [id]
    );
    return rows;
  } catch (error) {
    console.log("check error", error);
  }
};
const handleGetUserByIdService = async (userId) => {
  // create the connection to database
  let { id } = userId;
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt-db",
    port: "3307",
    password: "123456",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      `SELECT * FROM users WHERE id=?`,
      [id]
    );
    return rows;
  } catch (error) {
    console.log("check error", error);
  }
};
const handleUpdateUserService = async (data) => {
  // create the connection to database
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt-db",
    port: "3307",
    password: "123456",
    Promise: bluebird,
  });
  let { id, email, userName } = data;
  try {
    const [rows, fields] = await connection.execute(
      `UPDATE users
      SET email = ?, userName= ?
      WHERE id = ?;`,
      [email, userName, id]
    );
    return rows;
  } catch (error) {
    console.log("check error");
  }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  handleGetUserByIdService,
  handleUpdateUserService,
};
