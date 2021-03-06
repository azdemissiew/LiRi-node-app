require("dotenv").config(); 
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var axios = require('axios');
var fs = require('fs');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

function liri(command,userInput){
    switch(command){
        case "concert-this":
            getBands(userInput);
            break;
        case "spotify-this-song":
            getSpotify(userInput);
            break;
        
        case "movie-this":
            getOMDB(userInput);
            break;
        case "do-what-it-says":
            getRandom(userInput);
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
liri(command,userInput);
// creating function for bands
function getBands(singer){
    var singer = userInput;
    var singerQueryURL= "https://rest.bandsintown.com/artists/" + singer + "/events?app_id=codingbootcamp";
axios.get(singerQueryURL).then(
    function(response){
        //line breaker in between the bands
        console.log("====================");
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

function getOMDB(movie){
    if(!movie){
        movie ="Mr. Nobody,";
    }
    var movieQueryURL="http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    axios.request(movieQueryURL).then( function(response){
         //line breaker in between the bands
         console.log("====================");
         console.log("Title of the movie: "+ response.data.Title + "\r\n");
         console.log("years of the movie: " + response.data.Year+ "\r\n");
         console.log("IMDB Rating: " + response.data.imdbRating + "\r\n");
         console.log("Rotten Tomatos Rating: " + response.data.Ratings[1].Value + "\r\n");
         console.log("country of the movie: " + response.data.Country + "\r\n");
         console.log( "language:" + response.data.Language + "r\n");
         console.log("plot of the movie: " + response.data.Plot + "\r\n");
         console.log("Actor: " + response.data.Actors + "\r\n");

        var movieslist= "========='the movie list'=====" + "\r\n" +"movieName:"+ response.data.Title + "\r\n" +
         "years of the movie: " + response.data.Year+ "\r\n" + "IMDB Rating: " + response.data.imdbRating + "\r\n" +
         "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n" +
         "Country of the movie: " + response.data.Country +"\r\n" + "language:" + response.data.Language + 
         "\r\n"+ "plot of the movie: " + response.data.Plot + "\r\n" + "Actor: " + response.data.Actors + "\r\n";

         fs.appendFile("log.txt", movieslist, function(err){
            if(err){
                console.log(err);
            } 

        });
    } );
}

function getRandom(){ 
    fs.readFile("random.txt",'utf8',function(err, data){
        if(err){
            console.log(err);
                    }else {console.log(data)};
 
    var dataArr = data.split(",");
    liri(dataArr[0],dataArr[1]);
 
 });
 
}


   