const express = require("express"); // For the routing we need Express as well
const router = express.Router();
const Album = require("../models/album"); // album.js -> model

/**
 * CRUD = READ
 * Get request
 * /albums is root */
router.get("/", async (req, res) => {
  try {
    const albums = await Album.find(); // SELECT ALL FROM ALBUM MODEL
    res.json(albums); // Give data back in .json format
  } catch (err) {
    res.send("Error " + err); // Error message if query fails
  }
});

/** Get a specific item for details page based on id parameter */
router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    res.json(album); // Give data back in .json format
  } catch (err) {
    res.send("Error " + err); // Error message if query fails
  }
});

/**
 * CRUD = CREATE
 * Post request
 */
router.post("/", async (req, res) => {
  /**
   * New object gets created and the values get filled in with the input
   * from the post request a.k.a. the body of the request
   */
  const album = new Album({
    name: req.body.name,
    tracks: req.body.tracks,
    year: req.body.year,
  });

  /** Saving the object */
  try {
    const a1 = await album.save();
    res.json(a1);
  } catch (err) {
    res.send("Make sure you fill in the values for name, tracks, and year.");
  }
});

/**
 * CRUD = Update
 * PATCH request
 * Updates a specific item based on its id
 */
router.patch("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    album.name = req.body.name;
    album.tracks = req.body.tracks;
    album.year = req.body.year;
    const a1 = await album.save();
    res.json(a1);
  } catch (err) {
    res.send(
      "Make sure you give a value for the properties: name, tracks, and year :3"
    );
  }
});

/** Export the albums router */
module.exports = router;
