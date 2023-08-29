import { createNewUser, getUserList, deleteUser } from "../service/userService";
const handleHome = (req, res) => {
  return res.render("home");
};
const handleUserPage = async (req, res) => {
  let userList = await getUserList();
  return res.render("user", { userList: userList });
};
const handleCreateUser = (req, res) => {
  createNewUser(req.body);
  return res.redirect("/user");
};
const handleDeleteUser = async (req, res) => {
  await deleteUser(req.params);
  console.log("req.params.id", req.params.id);
  return res.redirect("/user");
};
module.exports = {
  handleHome,
  handleUserPage,
  handleCreateUser,
  handleDeleteUser,
};
