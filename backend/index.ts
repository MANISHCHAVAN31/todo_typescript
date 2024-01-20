import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import connectDatabase from "./config/db";

// DB connection
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ON ${process.env.PORT} !!!`);
});
