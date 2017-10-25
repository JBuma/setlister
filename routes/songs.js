var express = require("express"),
    router  = express.Router(),
    Song    = require("../models/song"),
    request = require("request");
    
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


//Create route
// router.post("/",function(req,res){
//     console.log(req.body.song);
//     var queryTitle = req.body.song["title"];
//     var queryArtist = req.body.song['artist'];
//     var url = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=7d507479f9825e3b4ed8f72fa26a75c7&artist="+req.body.song['artist']+"&track="+req.body.song['title']+"&format=json";
//     console.log(url);
//     request(url,function(err,response,body){
//         if (err){
//             console.log(err);
//         } else if(!err&&response.statusCode==200){
//             var data = JSON.parse(body);
//             // console.log(data);
//             if(data){
//                 req.body.song['imageLink'] = data['track']['album']['image'][3]['#text'];
//             } else {
//                 req.body.song['imageLink'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHTQsGBomHRUVITIhJSkrLi4uFx81OD8tNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEBAQADAQEBAAAAAAAAAAAAAQIDBgcFCAT/xABFEAACAQMABAsEBgYKAwAAAAAAAQIDBBEFElGRBgcTISQxQXF0gbMiUmGhJUJygrHBFDIzNLLDI2Jjc4SSosLS8DVTVP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDocpvL531vtGu9r3mZPnfexkDWs9r3l1nte9mC5A1rva97Gu9r3syMgb13te9l13te9nGi5A3rva97Lrva97MDIG9d7XvY13te9mQBvXlte9jlJbXvZgoG+Ulte9l15bXvZxlyBvlJbXvZeUlte9nGUDfKS2vexykvee9mABycpL3nvY5SXvS3s4y5A3ykvelvY5SXvPezAA3ykvelvY5SXvS3swAN8pL3pb2cNW5l1KUvi8sxVq9i82cOQOblJe9LewYACXW+9kI3zvvYA0VGQBoGSgXJTIyBrJTIA0i5M5AGimQBrIMlA0imRkDRTIA0CZAFBABThq1exebJVq9i82cAGgZAHKDIAS633gkut94ApTJQNAyXIFBABS5IANAhQKCFAoIANZBls57W0rVuajRq1v7qnOp+CA4slPu2vAzSlXGLSVNPtrThSx5N5+R9i04tbuX7a5tqS2U1Ury+aivmB0rJcn1uFWho6PulbRqOr/QU6rnKKhzylJYSz1eyfHA0cNWr2LzZKtXsXmzhAAAAAAOQgIAfW+8GX1vvAGgTIyBoGclyBoEyAKUy2eoaJ4tLSdKjVrXVxPlKdOpq01TpRWtFSxlp7fgB5lkJ8+F19i7We2WnAfRNHnVoqj216lStn7rePkfbtbKhQWKNCjRWylShT/BAeF2egL+v+ysrmaf1uRlGH+aWF8z7VpxeaUqYc4ULdf21eLeO6nrHsDkRyA86tOK//wB993xo0f8AdJ/kfZteLzRlP9dV67/tKzit1NI7U5GXID59poDR9DDpWVtFrqk6UZzX3pZfzPpa2Fhcy2LmRjJHIDbZlsw5GXIDyzjOf0mvCUP46h0+rV7F5s7Txo1PpJJf/JR5/v1Dp4FBABQQAUEAHJkEAGW+djJH1sgGhkzkuQNFyZyMgaKZGQNN8z7j9DaJl0W18Nb+nE/O7fMz9B6Hl0S18Lb+lED+/JlyMORipUUVrSajFdsmkt7A5XIy5Hw73hXo2hnXvaDa6405ctLdDJ8K84yrGHNRo3Nd9j1Y0ob5PPyA7u5EyeXXfGVdy/Y21Cj8akp1pfLB8S74XaTrZ1rypBP6tFRopecVn5ge01asYLWnJQiuuUmoxXmz4t5wt0bRzrXlKTXZSbrP/Rk8XrzlUlrVZzqy96pKVSW+REB6becZFpHPI0Lis0uZy1aMH5tt/I7bRr69OnPGNenCeM5xrRTxnzPAK1TmaWxnumj5dHt/7ij6aA804zn9JR8HR9SqdUydp4zH9JR8JR9SqdUyBSmcgDQyZAGgZyAOXIMgDLfOwGABSAC5BABrIyQoB9XkfoDQ0uiWnhbf0on5/Z73oaXQ7Twtv6UQOqcZ+lrq2/RI29xUoRqq45TkmouWNTHtda631PtPNbivUqvNapUrP3qtSdV75M75xtPnsO65/lnn4BFIUBkuSAC5MVKnYiTn2I4gEup9x7ro6XR7fw9D04nhUup9x7fo2XRrbw9D04ged8Zb+kY+Eo+pUOq5O0cZH/kI+EpepUOrAUEAFGSACggA5MgADLZCNgDWQZyXIFBMgDQyZyXIFZ7voWXQ7Twtt6UTwfJ7noSXQ7Pwtt6UQOncbD57H/E/yzoGTvvGq/3Hvuf5Z0HIGhkzkoGjjnPsRJz7EceQKCACs9r0ZLo1t4ah6cTxNns+i5dGtvDW/pxA6DxjPp8PC0vUqHVzs3GI+nw8LT9SodYAoJkAUEyAKCADlBMgDDJkjAGhkzkoGgZyUCjJABT2/Qkuh2fhLb0onh+T2vQkuhWfhLb0ogdU403zWXfcfhTOhZO9caD5rL7Vx+EDogGjEp9hmUjIFBABQQ1ThKfNBSm11qKcn8gIz2PRcui2vhrf0onjtWnKH68ZQ+3Fx/E9d0S+i2vhbb0ogdH4wn06HhafqVDrJ2XjB/fafhafqVDrIFBABQQAUEAHKDJQONsEYAoyQAaGSADQP79DaFub6Tjb08xi8TqzepSpvY5bfgss7da8X1JL+nu6kpbLeEYRX3p5zuQHQWez6Dl0Kz8JbelE65V4AWbXsXF1F7ZOjUjuUV+J2Wyo8jRo0dbW5KlTpa2NXW1YqOcdnUB1PjOfs2f2q/4QOhOR3njMfsWf2634ROhgUEAFOS3oTqzhSpxc6lSSjCEeuUv+9vZg4jvnF9o6MKM7ySzOrKVKk/dpReJNfFy5vu/ED+nQvA63oJTulG5rdbg8/o9N7Evr975vgdmpvUSjDEIrqjBKEV5IxkjYG6ktZOMvbi+uMvai/JmIpRSjFKMYpRjGKSjGKWEkl1IjZMgdA4wH02n4WHqVDrR2Th/++U/DQ9SodaAoIAKCACggA5QQAcbAZANZBkuQKfV4NaId9cxo5cacVyleaXPGkmlhf1m2ku/PYfJPQOLalFW1zU5tadwqbfbqwpppb6kgO329GnRpwpUoRp0qaxCEepL83tfWzTZnWMuQG2zLkYciawHTuMp+xafbrfwxOjHdeMiosWkPra1aWPhiKOkgUEAFPTOB1RPR1ul9Xloy+1ys3+aPMjsPBHT0bScqNZ4oVZJ6/ZSqYxrP+q+ZPZhfED0XJMmYyTSaaaaymnlNbUygMgHWuEvCaFCMqNvJTuGmnKPPGh8W+2Xw3/EOt8MbtVr6pqvMaMYUM9jksuXzk15HxSeeX1tvnbe0AUEAFBABQQAcoIAONkDAAAAU7hxeaSjCpVtZtLlmqtLPbUSxKPe0k/us6cWMmmnFuMk04yTw011NPaB7XrEcjo2iOG7ilC8hKTXNy9JLL+Mobfitx92HCrR8ln9JivhKFSL3NAfayYq1YwjKc5KMIpylKTxGMV1ts69ecM7KmnybqV5dihBxW+WPzOn6b4QXF77M8U6KeVRg3hvscn9Z7l8AM8ItK/ptzKqsqnFcnRT5nyaf6zW1vL3bD5gAAAAAAB/bo/S11bc1CtKEc55N4nT/AMsuryPqLhnfYxi2ztdKf/M68APp33CC9uE41K8owfXCklSi93O/NnzEsAAAAAAAAAAAAByAgA42AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHIQADDAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADYAAwwGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2AAKwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApAAAAHIAAP/Z';
//                 }
//                 Song.create(req.body.song,function(err,newSong){
//                     if(err){
//                         console.log(err);
//                     }else{
//                         newSong.save();
//                     }
//                     res.redirect("/songs");
//                     });
//             }
//         }
//     );
    
// });

//Spotify Create
router.post('/',function(req,res){
    var linkId = req.body.spotifyLink.substring(req.body.spotifyLink.indexOf("/track/")+7)
    console.log(linkId)
    Spotify.request('https://api.spotify.com/v1/tracks/'+linkId.toString()).then(function(data){
        // console.log(data);
        var song = {
            title: data['name'],
            artist: data['artists'][0]['name'],
            link: req.body.spotifyLink
        }
        var url = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=7d507479f9825e3b4ed8f72fa26a75c7&artist="+song['artist']+"&track="+song['title']+"&format=json";
            request(url,function(err,response,body){
        if (err){
            console.log(err);
        } else if(!err&&response.statusCode==200){
            var data = JSON.parse(body);
            // console.log(data);
            if(data){
                song['imageLink'] = data['track']['album']['image'][3]['#text'];
            } else {
                song['imageLink'] = 'data:image/jpeg;base64,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';
            }
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
    })
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
            // console.log(song['track']['album']['images']);
            var song = {
                title: song['track']['name'],
                artist: song['track']['artists'][0]['name'],
                link: "https://open.spotify.com/track/"+song['track']['id'],
                imageLink: song['track']['album']['images'][1]['url']
            }
            // console.log(song);
            var url = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=7d507479f9825e3b4ed8f72fa26a75c7&artist="+song['artist']+"&track="+song['title']+"&format=json";
                request(url,function(err,response,body){
            if (err){
                console.log(err);
            } else if(!err&&response.statusCode==200){
                var albumData = JSON.parse(body);
                // console.log(albumData);
                // if(albumData&&albumData['track']&&albumData['track']['album']&&albumData['track']['album']['image']&&!albumData['error']){
                //     song['imageLink'] = albumData['track']['album']['image'][3]['#text'];
                // } else {
                //     song['imageLink'] = 'data:image/jpeg;base64,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';
                // }
                Song.create(song,function(err,newSong){
                    if(err){
                        console.log(err);
                    }else{
                        newSong.save();
                    }
                    
                    });
                // } else if(err&&err['error']==6){
                //     song['imageLink'] = 'data:image/jpeg;base64,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';
                //     Song.create(song,function(err,newSong){
                //         if(err){
                //             console.log(err);
                //         }else{
                //             newSong.save();
                //         }
                //     });
                // }
            }})
        });
        res.redirect("/songs");
        // res.send(data);
    })
    .catch(function(err){
        console.log(err);
    });
});

module.exports = router;