import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then((result) => {
      console.log(`MONGODB CONNECTED SUCCESSFULLY !!!`);
    })
    .catch((error) => {
      console.log("MONGODB CONNECTION FAILED");
      console.log(error);
      process.exit(1);
    });
};

export default connectDatabase;
