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
// creating function for bands
function getBandsInTown(singer){
    var singer = userSearch;
    var singerQueryURL= "https://rest.bandsintown.com/artists/" + singer + "/events?app_id=codingbootcamp";
axios.get(singerQueryURL).then(
    function(response){
        //line breaker in between the bands
        console.log("====================")
        //console.log the name of the venue
        console.log("name of the venue: " + response.data[0].venue.name + "\r\n");
        //console.log  venue location
        console.log("venue Location: " + response.data[0].venue.city + "\r\n");
        // console the date of event
        console.log("date of event: " + moment(response.data[0].datetime).format("MM-DD-YYYY")+ "\r\n");
        var concert = "=========the concert by the band=====" + "\nName of the singer: " + singer + "\nName of the venue: " + response.data[0].venue.name + "\r\n"
        + "venue Location: " + response.data[0].venue.city + "\r\n" + "date of event:"+ moment(response.data[0].datetime).format("MM-DD-YYY") + "\r\n";
        fs.appendFile("log.txt",concert,function(err){
            if(err){
                console.log(err);
            } 

        });
    })
}
