import bcrypt from "bcryptjs";
// get the client
import mysql from "mysql2/promise";
// get the promise implementation, we will use bluebird
import bluebird from "bluebird";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
const createNewUser = async (data) => {
  let { email, userName, password } = data;
  let hashPasswordUser = hashPassword(password);
  try {
    await db.user.create({
      email: email,
      password: hashPasswordUser,
      userName: userName,
    });
  } catch (error) {
    console.log("check error", error);
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
    const [rows, fields] = await connection.execute("SELECT * FROM `user`");
    return rows;
  } catch (error) {
    console.log("check error", error);
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
      `DELETE FROM user WHERE id=?`,
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
      `SELECT * FROM user WHERE id=?`,
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
      `UPDATE user
      SET email = ?, userName= ?
      WHERE id = ?;`,
      [email, userName, id]
    );
    return rows;
  } catch (error) {
    console.log("check error", error);
  }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  handleGetUserByIdService,
  handleUpdateUserService,
};
