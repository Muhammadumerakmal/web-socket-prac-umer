// main.js

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { WebSocketServer } from "ws";

// ---------------------------------------------------------------------------------------------------------------//

const app = express();

const secret_port = process.env.PORT || 5000;

const server = app.listen(secret_port, () => {
  console.log("server is running on secret port 🔐");
});


const wss = new WebSocketServer({ server });


wss.on("connection",(webs)=>{
    console.log(" 🔌 websocket connected on secret port 🌐");

    webs.on("message",(data)=>{
        console.log("✅" , data);
        
        webs.send("thanks for your message 😊")
        
    })
})