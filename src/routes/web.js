import express from "express";
import {
  handleHome,
  handleUserPage,
  handleCreateUser,
  handleDeleteUser,
} from "../controllers/homeController";

const router = express.Router();
const initWebRoutes = (app) => {
  router.get("/", handleHome);
  router.get("/user", handleUserPage);
  router.post("/user/create-user", handleCreateUser);
  router.post("/user/delete-user/:id", handleDeleteUser);

  return app.use("/", router);
};
export default initWebRoutes;
