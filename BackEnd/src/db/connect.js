import mongoose from "mongoose";
// import { MONGO } from "../config.js";
import dotenv from "dotenv";
dotenv.config();

function connectToDb() {
  try {
    mongoose
      .connect(process.env.MONGO)
      .then(() => console.log("[+] Connected To DB..."));
  } catch (error) {
    console.log("[-] Connection To DB Failed..", error);
  }
}
export default connectToDb;
