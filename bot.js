
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
require( "console-stamp" )( console, { pattern : "dd/mm/yyyy HH:MM:ss.l" } );

var getParams = {
  q: 'india OR rivers',
  geocode: '20.5937,78.9629,1700km',
  lang: 'en',
  count: 1
}

function tweetIt() {
  T.get('search/tweets', getParams, gotData);
}

tweetIt();
setInterval(tweetIt, 1000*60*5);

function gotData (err, data, response) {
  if (err) {
    console.error("Getting data failed!");
  }
  var tweets = data.statuses;
  var rTweet = randIndex(tweets)

    if(typeof rTweet != 'undefined') {
  		var targetId = rTweet.user.id_str;
      var targetScreenName = rTweet.user.screen_name;

      var postParams = {
        status: '@'+targetScreenName+' Rally for Rivers (#RallyForRivers) - Campaign Launch by Sadhguru https://youtu.be/k9dkhESbi5A via @YouTube'
      }

  		T.post('statuses/update', postParams, postedData);

      function postedData (err, data, response) {
        if (err) {
          console.error("Posting data failed!");
        }
  	  }
    }
}

function randIndex (arr) {
  var index = Math.floor(arr.length*Math.random());
  return arr[index];
};
