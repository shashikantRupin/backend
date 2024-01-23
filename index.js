const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { router } = require("./routes/aliens");

const app = express();

const mongoUrl = process.env.MONGODB_URL;
//console.log(mongoUrl);
//another way
// const databaseName = "backendcrud";
// Check if MONGODB_URL is defined
if (!mongoUrl) {
  console.error("MONGODB_URL is not defined");
  process.exit(1); // Exit the process or handle the error appropriately
}

mongoose.connect(mongoUrl, {
  // dbName:databaseName,
 
});

const con = mongoose.connection;

con.on('open', () => {
  console.log("Connected to MongoDB!");

  // Start your Express server only if MongoDB connection is successful
  app.use(express.json());
  app.use("/doctor", router);

  app.listen(9000, () => {
    console.log("Listening on port 9000...");
  });
});

con.on('error', (err) => {
  console.error("MongoDB connection error:", err);

  // Handle the error appropriately, e.g., exit the process
  process.exit(1);
});

// console.log(mongoUrl);
//another way
// const databaseName = "backendcrud";