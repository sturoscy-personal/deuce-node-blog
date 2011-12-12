$(document).ready(function(){

	//Initialize array for tweets
	var tweetArray = new Array();

	//Call the function to populate the tweet div
	getTweets();

	function getTweets() {
		$.getJSON("http://twitter.com/statuses/user_timeline/sfttwit.json?count=5&callback=?", function(data) {
			$.each(data, function(i, item) {
				tweet = item.text;
				tweetArray[i] = {
					tweets: tweet
				}
			});
		});
		
		console.log(tweetArray);	
	};
});