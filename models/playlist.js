var mongoose = require("mongoose");

var playlistSchema = new mongoose.Schema({
    songs: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Song'
        }
        ],
    name: String
})

module.exports = mongoose.model('playlist',playlistSchema);