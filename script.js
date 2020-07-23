// API keys 4ab30337f3dc47ca63d4beafd0c4703f
//          5faf9a5ddc3e4b4b8641a9abb7954fb4
// queryURL api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

var today = moment().format("MMMM Do, YYYY");
var tomorrow = $("<h4>").text(moment().add(1,'days').format("MMM DD"));
var twoDays = $("<h4>").text(moment().add(2,'days').format("MMM DD"));
var threeDays = $("<h4>").text(moment().add(3,'days').format("MMM DD"));
var fourDays = $("<h4>").text(moment().add(4,'days').format("MMM DD"));
var fiveDays = $("<h4>").text(moment().add(5,'days').format("MMM DD"));

for (let i = 0; i < 10; i++) {
    var cityKey = localStorage.key(i);
    var storCity = localStorage.getItem(cityKey);
    if (cityKey !== null) {
        addButton(storCity);
    }
}

$("#submit").on("click", function displayWeather() {
    var input = document.getElementById("cityInput").value;
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=4ab30337f3dc47ca63d4beafd0c4703f";
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + input + "&cnt=5&units=imperial&appid=4ab30337f3dc47ca63d4beafd0c4703f";

    // Current weather conditions for inputted city
    $.ajax({
        url: queryURL1,
        method: "GET"
    }) .then(function(response) {
        $("#cityInput").val("");
        $("#today").remove();

        if (input !== "" || response) {
            addButton(input);
            localStorage.setItem(input, input);
        }
    
        var card = $("<div>");
        $("#cityOutput").prepend(card);
        card.attr("class", "card-body");
        card.attr("id", "today");
        
        var city = $("<h2>").text("Today's weather in " + input);
        card.append(city);
        
        var date = $("<h3>").html(today + "<br>");
        card.append(date);

        var imgSrc = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        var icon1 = $("<img>").attr("src", imgSrc);
        card.append(icon1);
        
        var temp = $("<p>").text("Temperature: " + Math.round(response.main.temp) + "˚F");
        card.append(temp);
        
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        card.append(humidity);
        
        var wind = $("<p>").text("Wind Speed: " + Math.round(response.wind.speed) + " mph");
        card.append(wind);
        
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var queryURL3 = "http://api.openweathermap.org/data/2.5/uvi?appid=4ab30337f3dc47ca63d4beafd0c4703f&lat=" + latitude + "&lon=" + longitude;
        
        $.ajax({
            url: queryURL3,
            method: "GET"
        }) .then(function(response) {
            var UVindex = $("<p>").text("UV Index: " + Math.round(response.value));
            card.append(UVindex);
        })
    })

    // Include a 5-Day Forecast
    document.getElementById("cityForecast").style.display = "";

    $.ajax({
        url: queryURL2,
        method: "GET"
    }) .then(function(response) {
        $("#tomorrow").empty("");
        $("#next-day").empty("");
        $("#three-days").empty("");
        $("#four-days").empty("");
        $("#five-days").empty("");
        
        $("#tomorrow").append(tomorrow);
        $("#next-day").append(twoDays);
        $("#three-days").append(threeDays);
        $("#four-days").append(fourDays);
        $("#five-days").append(fiveDays);

        var icon1 = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png";
        var weatherImg1 = $("<img>").attr("src", icon1);
        $("#tomorrow").append(weatherImg1);
        
        var icon2 = "http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + ".png";
        var weatherImg2 = $("<img>").attr("src", icon2);
        $("#next-day").append(weatherImg2);
        
        var icon3 = "http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + ".png";
        var weatherImg3 = $("<img>").attr("src", icon3);
        $("#three-days").append(weatherImg3);
        
        var icon4 = "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + ".png";
        var weatherImg4 = $("<img>").attr("src", icon4);
        $("#four-days").append(weatherImg4);
        
        var icon5 = "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + ".png";
        var weatherImg5 = $("<img>").attr("src", icon5);
        $("#five-days").append(weatherImg5);
        
        var tempDay1 = $("<h5>").text("Temps: " + Math.round(response.list[0].temp.max) + "˚F / " + Math.round(response.list[0].temp.min) + "˚F");
        $("#tomorrow").append(tempDay1);
        
        var tempDay2 = $("<h5>").text("Temps: " + Math.round(response.list[1].temp.max) + "˚F / " + Math.round(response.list[1].temp.min) + "˚F");
        $("#next-day").append(tempDay2);
        
        var tempDay3 = $("<h5>").text("Temps: " + Math.round(response.list[2].temp.max) + "˚F / " + Math.round(response.list[2].temp.min) + "˚F");
        $("#three-days").append(tempDay3);
        
        var tempDay4 = $("<h5>").text("Temps: " + Math.round(response.list[3].temp.max) + "˚F / " + Math.round(response.list[3].temp.min) + "˚F");
        $("#four-days").append(tempDay4);
        
        var tempDay5 = $("<h5>").text("Temps: " + Math.round(response.list[4].temp.max) + "˚F / " + Math.round(response.list[4].temp.min) + "˚F");
        $("#five-days").append(tempDay5);
        
        var humid1 = $("<h5>").text("Humidity: " + response.list[0].humidity + "%");
        $("#tomorrow").append(humid1);
        
        var humid2 = $("<h5>").text("Humidity: " + response.list[1].humidity + "%");
        $("#next-day").append(humid2);
        
        var humid3 = $("<h5>").text("Humidity: " + response.list[2].humidity + "%");
        $("#three-days").append(humid3);
        
        var humid4 = $("<h5>").text("Humidity: " + response.list[3].humidity + "%");
        $("#four-days").append(humid4);
        
        var humid5 = $("<h5>").text("Humidity: " + response.list[4].humidity + "%");
        $("#five-days").append(humid5);

    })
})

// Include search history buttons
function addButton(item) {
    var newButton = $("<button>").attr({"type":"button", "class":"btn btn-outline-secondary btn-lg"});
    $(newButton).text(item);
    console.log(item);
    $("#buttons").append(newButton);
}