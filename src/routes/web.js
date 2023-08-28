import express from "express";
import { handleHome, handleUserPage } from "../controllers/homeController";

const router = express.Router();
const initWebRoutes = (app) => {
  router.get("/", handleHome);
  router.get("/user", handleUserPage);
  return app.use("/", router);
};
export default initWebRoutes;
