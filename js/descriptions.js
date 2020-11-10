var written_tweet_array=[];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
    tweet_array = runkeeper_tweets.map(function(tweet) {
        return new Tweet(tweet.text, tweet.created_at);
    });
// Filter to just the written tweets
    written_tweet_array=[];
	for(var y=0;y<tweet_array.length;y++){
	    if(tweet_array[y].written){
	        written_tweet_array.push(tweet_array[y]);
        }
    }



}
// search written tweets
function returnSearchList(term){
    var tempArray=[];
    var tableStr="";

    var count=0;
    for(var t=0; t < written_tweet_array.length;t++){

        if(written_tweet_array[t].writtenText.includes(term)) {
            count++;

            tableStr+=written_tweet_array[t].getHTMLTableRow(count.valueOf(),written_tweet_array[t].source.toString(),written_tweet_array[t].text.toString());

        }
    }

    $('#searchCount').text(count);
    $('#searchText').text(term);
    return tableStr;
}

// handle events
function addEventHandlerForSearch() {
    //TSearch the written tweets as text is entered into the search box, and add them to the table

    $('#textFilter').keyup(function () {
        var x =document.getElementById("textFilter");
        //refresh/clear page on action
        $('#tweetTable').empty();

        if(x.value.toString().length>0) {


            $('#tweetTable').append(returnSearchList(x.value.toString()));
        }else {
            //when the input is empty everything clears
            $('#searchCount').text("???");
            $('#searchText').text("???");
        }

    }
     );
//clear fields on change
    $('#liveButton').click(function () {

        document.getElementById('textFilter').value = '';
        $('#tweetTable').empty();
        $('#searchCount').text("???");
        $('#searchText').text("???");

    });




}

//Wait for the DOM to load
$(document).ready(function() {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});