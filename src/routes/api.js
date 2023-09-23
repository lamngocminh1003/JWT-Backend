import express from "express";
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import groupController from "../controllers/groupController";
const router = express.Router();
const initApiRoutes = (app) => {
  router.get("/testAPI", apiController.testAPI);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get("/user/read", userController.show);
  router.get("/user", userController.getUserByIdController);
  router.post("/user/create", userController.create);
  router.put("/user/update", userController.update);
  router.delete("/user/delete", userController.deleteUserApi);

  router.get("/group/read", groupController.show);

  return app.use("/api/v1", router);
};
export default initApiRoutes;
