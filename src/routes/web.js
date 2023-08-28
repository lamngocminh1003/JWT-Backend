import express from "express";
import {
  handleHome,
  handleUserPage,
  handleCreateUser,
} from "../controllers/homeController";

const router = express.Router();
const initWebRoutes = (app) => {
  router.get("/", handleHome);
  router.get("/user", handleUserPage);
  router.post("/user/create-user", handleCreateUser);

  return app.use("/", router);
};
export default initWebRoutes;
