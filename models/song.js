var mongoose = require("mongoose");

var songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    spotifyLink: String,
    youtubeLink: String,
    imageLink: String
});

module.exports = mongoose.model("Song",songSchema);