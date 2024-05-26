import connectToDB from "./db/connect.js";
import express from "express";
import todoRouter from "./routes/todo.route.js";
import dotenv from "dotenv";
// import { PORT } from "./config.js";
dotenv.config();
import cors from "cors";

const PORT = process.env.PORT;

connectToDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`[+] Server started at port ${PORT}`);
});
