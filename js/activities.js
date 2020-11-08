function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
    
    
    
    var activ = tweet_array.map(activitiesItem => {
      return {"a": activitiesItem.activityType, "b": activitiesItem.time}
    });

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activ
	  },
      "mark": "bar",
      "encoding": {
        "x": {"field": "a", "type": "nominal", "axis": {"labelAngle": 90}},
    "y": {"aggregate": "count", "field": "a"}
      }
	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});