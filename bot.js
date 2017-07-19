
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var params = {
  q: 'india OR rivers',
  geocode: '20.5937,78.9629,1700km',
  lang: 'en',
  count: 1
}

T.get('search/tweets', params, gotData);

function gotData (err, data, response) {
  var tweets = data.statuses;
  var rTweet = randIndex(tweets)
  	if(typeof rTweet != 'undefined')
  	{
  		var targetId = rTweet.user.id_str;
      var targetScreenName = rTweet.user.screen_name;

      var postParams = {
        status: '@'+targetScreenName+' Rally for Rivers (#RallyForRivers) - Campaign Launch by Sadhguru https://youtu.be/k9dkhESbi5A via @YouTube'
      }

  		T.post('statuses/update', postParams, function (err, data, response) {
      });
  	}
}

function randIndex (arr) {
  var index = Math.floor(arr.length*Math.random());
  return arr[index];
};
