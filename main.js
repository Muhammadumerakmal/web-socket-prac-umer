// main.js

import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();

const secret_port = process.env.PORT || 5000;

const server = app.listen(secret_port, () => {
  console.log("server is running on secret port 🔐");
});
