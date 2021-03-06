var express = require('express'),
    cors = require('express-cors'),
    path = require('path'),
	  Twit = require('twit');

var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
})    
 
var app = express();

//For Heroku
app.set('port', (process.env.PORT || 5000));

app.use(cors({
    allowedOrigins: [
        'twitter.com'
    ]
}));

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.sendFile('index.html');
});
 
app.get('/api/search/:hashtag', function(req, res){ 

	T.get('search/tweets', { q: '#'+req.hashtag, count: 10 }, function(err, data, response) {

    if (err !== null) {
      res.send({ ok: false, message: 'error while fetching' });
      console.log('fetch error', err);
    } else {
      res.json(data); 
      console.log(data);
    }
	});
});

app.param('hashtag', function(req, res, next, hashtag){
	req.hashtag = hashtag;
	next();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



