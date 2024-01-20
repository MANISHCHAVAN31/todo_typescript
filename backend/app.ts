import express from "express";
const app = express();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan = require("morgan");

// middlewares
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import todoRoute from "./routes/todo.route";

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo", todoRoute);

export default app;
