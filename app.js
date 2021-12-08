const express = require("express");
const mongoose = require("mongoose");
let albumRouter = require("./routes/albums")();
const bodyParser = require("body-parser");
const url = "mongodb://localhost/music_collection";
let app = express();

// Connect to db, object to prevent error
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

app.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send('{"message": "Wowzers in my trousers it works!"}');
});

/**
 * Check if the db connection is opened
 */
con.on("open", () => {
  console.log("connected to db...");
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extendedparser: true, extended: true }));

/**
 * For all albums requests you have to send a request to the albums router"
 * albumRouter == albums.js
 * Points to localhost:8070/api/
 */
app.use("/api", albumRouter);

/**
 * Listen to http://localhost:8070
 */
app.listen(process.env.PORT || 8070, () => {
  console.log("Server Started");
});
