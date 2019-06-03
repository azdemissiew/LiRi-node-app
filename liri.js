require("dotenv").config(); 
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var axios = require('axios');
var fs = require('fs');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);

var appCommand = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");

function liriRun(appCommand,userSearch){
    switch(appCommand){
        case "concert-this":
            getBandsInTown(userSearch);
            break;
        case "spotify-this-song":
            getSpotify(userSearch);
            break;
        
        case "movie-this":
            getOMDB(userSearch);
            break;
        case "do-what-it-says":
            getRandom(userSearch);
            break;
    }
}


function getSpotify(songName){
    
    if(!songName){
        songName ="The sign"
    }
    spotify.search({ type: "track", query:songName}, function(err,data){
        if(err){
            return console.log('Error: '+ err);
        }
        console.log("===================");
        // artist name
        console.log("artist's Name: "  + data.tracks.items[0].album.artists[0].name +"\r\n" );
        //song name
        console.log("song Name: " + data.tracks.items[0].name + "\r\n" );
        //  return the preview link of the song from Spotify
        console.log("song preview link: " + data.tracks.items[0].href + "\r\n" );
        // return the album that the song is from
        console.log( "album:" + data.tracks.items[0].album.name + "\r\n"  );
        // append text into log.txt
        var logSong = "\n=========================="+ "\nartist's Name: "  + data.tracks.items[0].album.artists[0].name + "\r\n" + "song Name: " + data.tracks.items[0].name + "\r\n"
       + "song preview link: " + data.tracks.items[0].href +  "\r\n" +
        "album:" + data.tracks.items[0].album.name + "\r\n" ;

        fs.appendFile("log.txt", logSong, function(err){
            if(err) throw err;
        });


    });
};
liriRun(appCommand,userSearch);
