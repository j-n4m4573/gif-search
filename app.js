


var express = require('express')
var app = express()
var exphbs = require('express-handlebars');
var http = require('http');



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    console.log(req.query.term)
    var queryString = req.query.term
    // Encoding query to remove white spaces and restricted characters
    var term = encodeURIComponent(queryString)
    // Put the search term into the gify api search url
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

    http.get(url, function(response) {
        // set encoding of response to utf8
        response.setEncoding('utf8');
        var body = '';

        response.on('data', function(d) {
            // continuously update the stream with data from giphy
            body += d;
        });

        response.on('end', function() {
            // when data is fully recieved parse into json
            var parsed = JSON.parse(body);
            // Render the home template and pass the gif data into the template
            res.render('home', {gifs: parsed.data})
        })
    })
});

app.get('/hello-gif', function(req, res) {
    var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
    res.send('hello-gif', {gifUrl: gifUrl})
});

app.get('/greetings/:name', function(req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
});

// app.get('/', function (req, res) {
//     res.render('home')
// })

app.listen(3000, function() {
    console.log('Gif search listening on port localhost:3000!');
});
