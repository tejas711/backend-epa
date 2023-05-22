const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRouter");
const proposalRouter = require("./routes/proposalRouter");

const singleUser=require("./routes/singleUser")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);
app.use("/proposal", proposalRouter);
app.use("/",singleUser)

module.exports = app;