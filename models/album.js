const mongoose = require("mongoose");

/** Album Model = Entity
 *  name, tracks, year = Table names
 */
const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  tracks: {
    type: String,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },
});

/** Export the schema for the route */
module.exports = mongoose.model("Album", albumSchema);
