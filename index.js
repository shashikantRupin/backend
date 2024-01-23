const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const {router} =require("./routes/aliens")

const app=express();

const mongoUrl = process.env.MONGODB_URL;


// console.log(mongoUrl);
//another way
// const databaseName = "backendcrud";

mongoose.connect(mongoUrl, {
  // dbName: databaseName,
  useNewUrlParser: true
});

const con = mongoose.connection;

con.on('open', () => {
  console.log("Connected to MongoDB!");
});

con.on('error', (err) => {
  console.error("MongoDB connection error:", err);
});


app.use(express.json())
app.use("/aliens", router);

app.listen(9000, ()=>{
      console.log("listening to the  port 9000...")
})