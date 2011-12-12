var tweets = new Array();
	function getTweets() {
		$("#tweets").html("");
		$.getJSON("http://twitter.com/statuses/user_timeline/sfttwit.json?count=5&callback=?", function(data) {
			$.each(data, function(i, item) {
				tweet = item.text;
				tweets[i] = tweet;
			});
			console.log(tweets);
			for(var j = 0; j < tweets.length; j++) {
				$("#tweets").append("<p><b>&raquo;</b> " + tweets[j] + "</p>");
			}
		});
	};

	//Call the function to populate the tweet div
	getTweets();
	int = setInterval(getTweets, 900000);
});