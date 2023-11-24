const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const authRouter = require("./routes/auth.js");
const conversationRouter = require("./routes/conversations.js");
const publicacionRouter = require("./routes/publicacion.js");
const userRouter = require("./routes/users.js");
const amistadRouter = require("./routes/amistad.js");
// var upload = multer();

dotenv.config();
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(upload.array());
app.use(express.static("public"));

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
app.use("/", authRouter);
app.use("/conversation", conversationRouter);
app.use("/", amistadRouter);

app.get("/", function (req, res) {
  res.send("Red social");
});

start();
