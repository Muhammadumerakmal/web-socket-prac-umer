// main.js

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { WebSocketServer } from "ws";

// ---------------------------------------------------------------------------------------------------------------//

const app = express();

const secret_port = process.env.PORT || 5000;

const server = app.listen(secret_port, () => {
  console.log(`server is running on secret port 🔐 ${secret_port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (webs, req) => {
  // Get client IP address
  const ip =
    req.headers["x-forwarded-for"] || // for proxy/ngrok/vercel
    req.socket.remoteAddress;

  console.log("🔌 websocket connected on secret port 🌐");
  console.log("🌍 User IP Address:", ip);

  webs.on("message", (data) => {
    console.log(`✅ Message from ${ip}: ${data}`);

    webs.send("thanks for your message 😊");
  });

  webs.on("close", () => {
    console.log(`❌ websocket connection closed for ${ip}`);
  });
});
