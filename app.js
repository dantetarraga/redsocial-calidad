import dotenv from "dotenv";
import express, { json } from "express";
import { connect } from "mongoose";
import path from "path";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import publicacionRouter from "./routes/publicacion.js";
import conversationRouter from "./routes/conversations.js";
import groupRouter from "./routes/group.js";
import messageRouter from "./routes/message.js";

import bodyParser from "body-parser";
import multer from "multer";
import { Server } from "socket.io";
import { createServer } from "http";

const upload = multer();

dotenv.config();
const app = express();

const server = createServer(app);
const socketio = new Server(server);

socketio.on("connection", () => {
  console.log("Un usuario esta conectado");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array());
app.use(express.static("public"));

app.use((req, res, next) => {
  req.socketio = socketio;
  next();
});

const start = async () => {
  try {
    server.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

app.use("/user", userRouter);
app.use("/publicacion", publicacionRouter);
app.use("/auth", authRouter);
app.use("/conversation", conversationRouter);
app.use("/group", groupRouter);
app.use("/message", messageRouter);

app.get("/", function (req, res) {
  const __dirname = path.resolve(path.dirname(""));
  res.sendFile(__dirname + "/public/index.html");
});

start();
