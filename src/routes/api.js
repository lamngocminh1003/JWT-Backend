import express from "express";
import apiController from "../controllers/apiController";
const router = express.Router();
const initApiRoutes = (app) => {
  router.get("/testAPI", apiController.testAPI);
  router.post("/register", apiController.handleRegister);

  return app.use("/api/v1", router);
};
export default initApiRoutes;
