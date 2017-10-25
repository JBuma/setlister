var express = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
// seedDb      = require("./seeds"),
flash       = require("connect-flash"),
passport    = require("passport"),
LocalStrategy = require("passport-local"),
methodOverride = require("method-override"),
request         =require("request");

mongoose.connect("mongodb://localhost/setlister");

//======================
//Require Models
//======================
var Song = require("./models/song");

//======================
//Require Routes
//======================
var authRoutes = require("./routes/index"),
    songRoutes = require("./routes/songs");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(authRoutes);
app.use("/songs",songRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Setlister Started");
});