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
    res.status(201).json(albums); // Give data back in .json format
  } catch (err) {
    res.status(500).send("Error " + err); // Error message if query fails
  }
});

/** Get a specific item for details page based on id parameter */
router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    res.json(album); // Give data back in .json format
  } catch (err) {
    res.status(404).send("Error " + err); // Error message if query fails
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
    res.status(201).json(a1);
  } catch (err) {
    res
      .status(400)
      .send("Make sure you fill in the values for name, tracks, and year.");
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
    res.status(200).json(a1);
  } catch (err) {
    res
      .status(400)
      .send(
        "Make sure you give a value for the properties: name, tracks, and year :3"
      );
  }
});

/**
 * PUT Request
 * Modifies all items with a specific id
 */
router.put("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    album.name = req.body.name;
    album.tracks = req.body.tracks;
    album.year = req.body.year;
    const a1 = await album.save();
    res.status(201).json(a1);
  } catch (err) {
    res
      .status(400)
      .send(
        "Make sure you give a value for the properties: name, tracks, and year :3"
      );
  }
});

/**
 * DELETE Request
 * Deletes an item with a specific id
 */
router.delete("/:id", async (req, res) => {
  try {
    const a1 = await album.remove();
    res.status(204).json(a1);
  } catch (err) {
    res
      .status(404)
      .send(
        "Make sure you give a value for the properties: name, tracks, and year :3"
      );
  }
});

/**
 * OPTIONS method for the whole collection
 * Here I've specified the possible HTTP requests on this webservice
 */
router.options("/", (req, res) => {
  res.header("Allow", "GET, POST, OPTIONS").send();
});

router.options("/:id", (req, res) => {
  res.header("Allow", "GET, POST, OPTIONS").send();
});

/** Export the albums router */
module.exports = router;
