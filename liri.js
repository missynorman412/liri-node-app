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
        console.log(data);
    });
}
function movie(movieEntry) {
    if (movieEntry === "undefined") {
        movieEntry = "Mr. Nobody";
    }
    var request = require("request");
    // Then run a request to the OMDB API with the movie specified
    console.log(movieEntry);

    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + movieEntry + "&apikey=trilogy", function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            console.log("here");
            // Parse the body of the site and recover just the imdbRating
            
            console.log("The movie's title is: " + JSON.stringify(JSON.parse(body),null,2));
            
             console.log("The movie's title is: " + JSON.parse(body).Title);
             console.log("The year the movie came out is: " + JSON.parse(body).Year);
             console.log("The movie's imdb rating is: " + JSON.parse(body).imdbRating);
            // var arrLength = JSON.parse(body).Ratings.length;
            // for (i = 0; i < arrLength; i++){
            //     if (JSON.parse(body).Ratings.Source === "Rotten Tomatoes"){
            //         console.log("The Rotten Tomatoes value is: " + JSON.parse(body).Ratings[Source])
            //     }
            // }
            // console.log(arrLength);
            //console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[Source]['Rotten Tomatoes']);


        }


    });

}

