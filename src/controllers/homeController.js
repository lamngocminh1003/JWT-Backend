import { createNewUser, getUserList } from "../service/userService";
const handleHome = (req, res) => {
  return res.render("home");
};
const handleUserPage = async (req, res) => {
  let userList = await getUserList();
  console.log("userList", userList);
  return res.render("user", { userList: userList });
};
const handleCreateUser = (req, res) => {
  createNewUser(req.body);
  return res.send("handleCreateUser");
};
module.exports = { handleHome, handleUserPage, handleCreateUser };
