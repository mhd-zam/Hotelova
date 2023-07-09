const express = require("express");
const app = express();
const cors = require("cors");
const createError = require("http-errors");
const userRouter = require("./router/user");
const adminRouter = require("./router/admin");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server,{path:'/server/socket.io/'},{
  cors: {
    origin: "*",
    methods:["GET","POST","OPTIONS"]
  },
});
require('./listeners/socketManager')(io)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: ["https://hotelova.site","https://admin.hotelova.site/"],
    credentials: true,
  })
);


app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(cookieParser());
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



app.use("/server/users", userRouter);

app.use("/server/admin", adminRouter);

server.listen(4000, () => {
  console.log("server running");
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});
