const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/music_collection";

const app = express();

// Connect to db, object to prevent error
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

app.get("/", (req, res) => {
  res.send("wowzers");
});

/**
 * Check if the db connection is opened
 */
con.on("open", () => {
  console.log("connected to db...");
});

/**
 * Creating a Router
 */
const albumRouter = require("./routes/albums");

// Middleware
app.use(express.json());
// app.use(express.urlencoded());

/**
 * Middleware
 * For all albums requests you have to send a request to the albums router"
 * albumRouter == albums.js
 */
app.use("/albums", albumRouter);

/**
 * Listen to http://localhost:8000
 */
app.listen(process.env.PORT || 8070, () => {
  console.log("Server Started");
});
