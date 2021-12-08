const express = require("express"); // For the routing we need Express as well
const Album = require("../models/album"); // album.js -> model

let router = () => {
  let albumRouter = express.Router();

  // Middleware
  albumRouter.use((req, res, next) => {
    if (req.headers.accept == "application/json") next();
    else res.status(400).send(); // Send back client error
  });

  // CORS headers for the collection
  albumRouter.use("/album/", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  albumRouter
    .route("/albums")
    .options(async (req, res) => {
      console.log("OPTIONS REQUEST WORDT UITGEVOERD");
      res
        .status(200) // 200 = OK
        .header("Allow", "POST, GET OPTIONS")
        .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
        .header("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS")
        .send();
    })

    /**
     * CRUD: Create
     * A POST Request
     * name, artist, genre, tracks, year
     */
    .post(async (req, res) => {
      console.log("POST REQUEST UITGEVOERD");
      // Creating an album instance
      const album = new Album({
        name: req.body.name,
        artist: req.body.artist,
        genre: req.body.genre,
        tracks: req.body.tracks,
        year: req.body.year,
      });

      // Try to save the album on webservice
      try {
        const createdAlbumData = await album.save();
        res
          .status(201) // 201 = Created
          .header("Access-Control-Allow-Origin", "*")
          .header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
          )
          .json(createdAlbumData);

        // When saving the object fails
      } catch (err) {
        console.log("POST REQUEST GAAT MIS");
        res
          .status(400) // It's the clients fault haha
          .json({ message: err });
      }
    })

    /**
     * CRUD = READ
     * A GET REQUEST that reads the collection
     */
    .get((req, res) => {
      console.log("GET REQUEST UITGEVOERD");
      Album.find({}, (err, albums) => {
        if (err) {
          res.status(500).send(err);
        } else {
          let albumItems = [];
          for (let album of albums) {
            let albumItem = album.toJSON();

            albumItem._links = {
              self: {
                href: `http://${req.headers.host}/api/albums/${album.id}`,
              },
              collection: { href: `http://${req.headers.host}/api/albums` },
            };
            albumItems.push(albumItem);
          }

          let collections = {
            items: albumItems,
            _links: {
              self: { href: `http://${req.headers.host}/api/albums` },
            },
            pagination: {
              temp: "Can Kevin make a recursive solution for the pagination challenge?",
            },
          };

          res
            .status(200) // 200 = OK
            .header("Access-Control-Allow-Origin", "*")
            .header(
              "Access-Control-Allow-Headers",
              "Origin, X-Requested-With, Content-Type, Accept"
            )
            .json(collections);
        }
      });
    });

  albumRouter
    .route("/albums/:id") // api/albums/{id}
    .options(async (req, res) => {
      res
        .status(200) // 200 = OK
        .header("Allow", "GET, PUT, DELETE, OPTIONS")
        .header("Content-Type", "application/json")
        .header("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS")
        .send();
    })

    .get(async (req, res) => {
      try {
        let album = await Album.findById(req.params.id);
        let albumJsonData = album.toJSON();

        albumJsonData._links = {
          self: {
            href: `http://${req.headers.host}/api/albums/${req.params.id}`,
          },
          collection: { href: `http://${req.headers.host}/api/albums` },
        };

        res
          .status(200) // 200 = OK
          .header("Access-Control-Allow-Origin", "*")
          .header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested With, Content-Type, Accept"
          )
          .header("Content-Type", "application/json")
          .json(albumJsonData);
      } catch (err) {
        res.status(404).json({ message: err }); // 404 = File not found
      }
    })

    /** CRUD = UPDATE
     *  A PUT request that modifies the album collection
     */
    .put(getAlbum, async (req, res) => {
      if (req.body.name != null) res.album.name = req.body.name;
      if (req.body.artist != null) res.album.artist = req.body.artist;
      if (req.body.genre != null) res.album.genre = req.body.genre;
      if (req.body.tracks != null) res.album.tracks = req.body.tracks;
      if (req.body.year != null) res.album.year = req.body.year;

      try {
        const updatedAlbum = await res.album.save();
        res.status(202).json(updatedAlbum);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    })

    /** CRUD: Delete
     *  A DELETE request that deletes a specific album
     */
    .delete(getAlbum, async (req, res) => {
      try {
        await res.album.remove();
        res.status(204).json({ message: "The album has been deleted" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

  /** Function to check if the id exists of the album
   *  before updating and deleting data
   */
  async function getAlbum(req, res, next) {
    let album;
    try {
      album = await Album.findById(req.params.id);
      if (album == null)
        return res.status(404).json({ message: "The album doesn't exist" }); // 404 = file not found
    } catch (err) {
      return res.status(500).json({ message: err.message }); // Server error
    }

    res.album = album;
    next();
  }

  return albumRouter;
};

/** Export the albums router */
module.exports = router;
