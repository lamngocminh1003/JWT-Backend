import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import "dotenv/config";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
const app = express();
const PORT = process.env.PORT || 8000;

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

//test connection
connection();
//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log("JWT - Backend is running on the port = ", PORT);
});
