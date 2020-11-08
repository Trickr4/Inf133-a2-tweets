class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        if(this.text.startsWith("Just completed") == true || this.text.startsWith("Just posted") == true)
          return "completed_event";
        else if(this.text.startsWith("Achieved") == true)
          return "achievement";
        else if(this.text.startsWith("Watch") == true)
          return "live_event";
        else
          return "miscellaneous";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if(this.source == 'miscellaneous')
          return true;
        else if(this.source == 'completed_event'){
          var filtered_text = this.text;
          filtered_text.replace("#Runkeeper", "");
          filtered_text.replace("@Runkeeper", "");
          var urlCharAt = filtered_text.indexOf("https://t.co");
          var url = filtered_text.substring(urlCharAt,urlCharAt+22);
          filtered_text.replace(url, "");
          if(filtered_text.includes(" - "))
            return true;
        }
        return false;
        //TODO: identify whether the tweet is written
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        var kilo = this.text.match(/(\d{1,2}\.\d{2})\s(km)/);
        var mile = this.text.match(/(\d{1,2}\.\d{2})\s(mi)/);
        if(kilo != null && kilo.length > 0)
        {
          var start = this.text.search(kilo[0])+kilo[0].length;
          var split_with = this.text.substring(start,this.text.indexOf(' with', start+1));
          var split_dash = this.text.substring(start,this.text.indexOf(' -', start+1))
          if (split_with.length < split_dash.length)
            return split_with;
          return split_dash;
        }
        else if(mile != null && mile.length > 0)
        {
          var start = this.text.search(mile[0])+mile[0].length;
          var split_with = this.text.substring(start,this.text.indexOf(' with', start+1));
          var split_dash = this.text.substring(start,this.text.indexOf(' -', start+1))
          if (split_with.length < split_dash.length)
            return split_with;
          return split_dash;
        }
        //TODO: parse the activity type from the text of the tweet
        return "unknown";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}