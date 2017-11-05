var express = require("express"),
    router  = express.Router(),
    Song    = require("../models/song"),
    request = require("request"),
    YouTube = require("youtube-node");
    
var youtube = new YouTube();
youtube.setKey('AIzaSyASE8RUq7zqlfILlYjkq4XJ-HBqqyf9R0w');
    
var spotify = require("node-spotify-api");

var Spotify = new spotify({
    id: "9be4f2439c284011ab57809e55111d09",
    secret: "b2da2bee9c80489b888586541bccc8d7"
})

//Index Route
router.get("/",function(req,res){
    Song.find({},function(err,songs){
        if(err){
            console.log(err);
        }else{
            res.render("songs/index",{songs:songs});
        }
    })
});

//New Route
router.get("/new",function(req,res){
    res.render("songs/new");
})

//Spotify Create
router.post('/',function(req,res){
    var linkId = req.body.spotifyLink.substring(req.body.spotifyLink.indexOf("/track/")+7)
    // console.log(linkId)
    Spotify.request('https://api.spotify.com/v1/tracks/'+linkId.toString()).then(function(data){
        console.log(data["album"]['images'][1]['url']);

        var youtubeLink = ''
            youtube.search(data['name']+" "+data['artists'][0]['name'], 2, function(error, result) {
              if (error) {
                console.log(error);
              } else {
                var searchData = JSON.stringify(result, null, 2);
                searchData = JSON.parse(searchData);
                youtubeLink = 'https://www.youtube.com/watch?v='+searchData['items'][0]['id']['videoId'];
                
                var song = {
                title: data['name'],
                artist: data['artists'][0]['name'],
                spotifyLink: req.body.spotifyLink,
                youtubeLink : youtubeLink,
                imageLink: data["album"]['images'][1]['url'],
                spotifyUri: data['uri']
            }
                
                console.log(youtubeLink);
                console.log(song);
            Song.create(song,function(err,newSong){
                    if(err){
                        console.log(err);
                    }else{
                        newSong.save();
                    }
                res.redirect("/songs");
                });
              }
            });
            
             
            }
    )
    .catch(function(err){
        console.log(err);
    });
});

//spotify playlist
router.post("/playlist",function(req, res) {
    var userId = req.body.spotifyLink.substring(req.body.spotifyLink.indexOf("user/")+5,req.body.spotifyLink.indexOf("/playlist"));
    var playlistId = req.body.spotifyLink.substring(req.body.spotifyLink.indexOf("/playlist/")+10);
    Spotify.request("https://api.spotify.com/v1/users/"+userId+"/playlists/"+playlistId).then(function(data){
        data['tracks']['items'].forEach(function(song){
            console.log(song);
            youtube.search(song['track']['name']+" "+song['track']['artists'][0]['name'], 2, function(error, result) {
              if (error) {
                console.log(error);
              } else {
                var searchData = JSON.stringify(result, null, 2);
                searchData = JSON.parse(searchData);
                var youtubeLink = 'https://www.youtube.com/watch?v='+searchData['items'][0]['id']['videoId'];
                console.log(song);
                var makerSong = {
                    title: song['track']['name'],
                    artist: song['track']['artists'][0]['name'],
                    spotifyLink: song['track']['external_urls']['spotify'],
                    youtubeLink : youtubeLink,
                    imageLink: song['track']["album"]['images'][1]['url'],
                    spotifyUri: song['track']['uri']
                };
                
                console.log(youtubeLink);
                console.log(makerSong);
                Song.create(makerSong,function(err,newSong){
                    if(err){
                        console.log(err);
                    }else{
                        newSong.save();
                    }
                        
                    });
                }
            });
            
    })
    res.redirect("/songs");
    }).catch(function(err){
        console.log(err);
})

})

module.exports = router;