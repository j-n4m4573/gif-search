


var express = require('express')
var app = express()
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/hello-gif', function(req, res) {
    var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
    res.send('hello-gif', {gifUrl: gifUrl})
});

app.get('/greetings/:name', function(req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
})

app.get('/', function (req, res) {
    res.render('home')
})

app.listen(3000, function() {
    console.log('Gif search listening on port localhost:3000!');
});

 
