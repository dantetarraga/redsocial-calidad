import dotenv from "dotenv";
import express, { json } from "express";
import { connect } from "mongoose";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import publicacionRouter from "./routes/publicacion.js";
import conversationRouter from "./routes/conversations.js";
import groupRouter from "./routes/group.js";


import bodyParser  from 'body-parser';
import multer from 'multer';
var upload = multer();

dotenv.config();
const app = express();
//app.use(json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array()); 
app.use(express.static('public'));

const start = async () => {
  try {
    /*await connect('mongodb://127.0.0.1:27017/myDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });*/
    app.listen(3000, () => console.log("Server started on port 3000"));
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

app.get('/', function(req, res){
  res.send("Red social");
});

start();