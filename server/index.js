import express from "express";
import connection from "./database/db.js";
import dotenv from "dotenv";
import Routes from "./routes/Routes.js";
//const express=require("express")
//const { express } = pkg;

import cors from "cors";
import bodyParser from "body-parser";
const app = express();

const PORT = 8000;
dotenv.config();
app.use(bodyParser.json({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", cors());
app.use("/", Routes);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
//console.log(username,password);
connection();
app.listen(PORT, () => {
  console.log(`started server on port ${PORT}`);
});
