eventful= {
    api_key: "app_key=V8VVQZh9Ghmf7bGQ",
    end: "http://api.eventful.com/json/events/search?",
    city: "Richmond, VA",
    queryURL: function (search) {
       url = this.end + this.api_key + "&category=" + search + "&location=" + this.city + "&date=Future";
        return url;
    },
};
ticketmaster= {
    api_key: "&apikey=LoeeX4dO34SV1Xl7x72AzwTzSkHRVG0u",
    end: "https://app.ticketmaster.com/discovery/v2/events.json?",
    city: "Richmond",
    queryURL: function (search) {
        url = this.end + "keyword=" + search +"&source=universe&countryCode=US" + "&city="+this.city + this.api_key;
        return url;
    }
}

$("body").on("click", ".testButton", function () {
    console.log("clicked");
    // let interests = something from storage;
    $.ajax({
        url: eventful.queryURL("music"),
        dataType: "jsonp",
        method: "GET"
    }).then(function(response){
        console.log(response);
        for (var i = 0; i<response.events.event.length; i++) {
            // set variable to clean up code
            let event = response.events.event[i];
            // console logs each value from response
            console.log("title "+event.title, "start "+event.start_time, "end "+event.stop_time, "venue "+event.venue_name, "address "+event.venue_address, "url "+event.url);
        };
    });
    // url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword=music&source=universe&countryCode=US&city=Richmond&apikey=LoeeX4dO34SV1Xl7x72AzwTzSkHRVG0u",

    $.ajax({
        url: ticketmaster.queryURL("music"),
        async: true,
        dataType: "json",
        method: "GET"
    }).then(function(response){
        console.log(response);
        // for (var i = 0; i<response.events.event.length; i++) {
        //     // console logs titles of events
        //     console.log(response.events.event[i].title);
        // };
    });
});