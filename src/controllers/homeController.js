import { createNewUser, getUserList } from "../service/userService";
const handleHome = (req, res) => {
  return res.render("home");
};
const handleUserPage = (req, res) => {
  return res.render("user");
};
const handleCreateUser = (req, res) => {
  createNewUser(req.body);
  // getUserList();
  return res.send("handleCreateUser");
};
module.exports = { handleHome, handleUserPage, handleCreateUser };
