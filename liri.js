require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var action = process.argv[2];

switch (action) {
    case "my-tweets":
        printTweets();
        break;
    case "spotify-this-song":
        var querySong = process.argv[3];
        console.log('here');
        spotifySong(querySong);
        break;
    case "movie-this":
        var movieEntry = process.argv[3];
        if (movieEntry === undefined) {
            var movieEntry = "Mr. Nobody";
        }
        //console.log(movieEntry);
       movie(movieEntry);
               break;

}

function printTweets() {
    var params = { screen_name: 'missynorman412', count: 20 };
    client.get('statuses/user_timeline/', params, function (error, tweets) {
        if (error) {
            throw error;
        } else {
            for (i = 0; i < 20; i++) {
                console.log(tweets[i].text + " " + tweets[i].created_at);
            }
        }
    });
}

function spotifySong(querySong) {
        //console.log(querySong);
    spotify.search({ type: 'track', query: querySong }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
            console.log(data[0]);
    });
}

function movie(movieEntry) {
    if (movieEntry === "undefined") {
        movieEntry = "Mr. Nobody";
    }
    var request = require("request");
    // Then run a request to the OMDB API with the movie specified
    console.log(movieEntry);
    request("http://www.omdbapi.com/?t=" + movieEntry, function (error, response, body) {
        
    
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            console.log("here");  
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);


        }  
    });
    

}
