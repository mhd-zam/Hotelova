const express = require("express");
const app = express();
const cors = require("cors");
const createError = require('http-errors');
const userRouter = require("./router/user");
const adminRouter = require("./router/admin");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require('morgan')
const upload=require('./controller/multer')
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))


app.use(
  cors({
    origin: ['http://localhost:3000','http://localhost:3001'],
    credentials: true,
  })
);
app.use(cookieParser())
require("dotenv").config();
mongoose
  .connect(process.env.DATABASE, {
    dbName: "hotelova",
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log(err);
  });

  

app.use("/users", userRouter);

app.use("/admin", adminRouter);

app.listen(4000, () => {
  console.log("server running");
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});
