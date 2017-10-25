var express = require("express");
var router = express.Router();


//=====================
//Routes
//=====================
router.get("/",function(req,res){
    res.redirect("/songs");
})

router.get("/spotify",function(req,res){
    Spotify.request('https://api.spotify.com/v1/users/zadooky/playlists/3SYjh2nmOKBwSzVUpae37w').then(function(data){
        console.log(data['tracks']['items'][0]['track']['name']);
        res.send(data);
    })
    .catch(function(err){
        console.log(err);
    })
})

router.get("/newspotify",function(req,res){
    res.render('newspotify');
})

module.exports = router;