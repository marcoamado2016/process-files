require("dotenv").config({ path: "./.env" });
import mongoose from "mongoose";
const connection = async () => {
  const mongo = process.env.MONGODB_URL;

  if(mongo)await mongoose.connect(mongo);
};
export default connection;
