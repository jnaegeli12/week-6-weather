
var today = moment().format("MMMM Do, YYYY");
var tomorrow = $("<h4>").text(moment().add(1, 'days').format("MMM DD"));
var twoDays = $("<h4>").text(moment().add(2, 'days').format("MMM DD"));
var threeDays = $("<h4>").text(moment().add(3, 'days').format("MMM DD"));
var fourDays = $("<h4>").text(moment().add(4, 'days').format("MMM DD"));
var fiveDays = $("<h4>").text(moment().add(5, 'days').format("MMM DD"));

var input;

for (let i = 0; i < 10; i++) {
    var cityKey = localStorage.key(i);
    var storCity = localStorage.getItem(cityKey);
    if (cityKey !== null) {
        addButton(storCity);
    }
}

$("#submit").on("click", function () {
    input = document.getElementById("cityInput").value;
    ajaxCall(input);
    createButton();
})

$(".historyButton").on("click", function (event) {
    event.preventDefault();
    input = event.target.innerHTML;
    ajaxCall(input);
})

function createButton() {
    if (input !== "") {
        addButton(input);
        localStorage.setItem(input, input);
    }
}
function ajaxCall(input) {

    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=4ab30337f3dc47ca63d4beafd0c4703f";
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=imperial&appid=4ab30337f3dc47ca63d4beafd0c4703f";

    // Current weather conditions for inputted city
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        $("#cityInput").val("");
        $("#today").remove();
        $("#cityForecast").empty();

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
        }).then(function (response) {
            var UVindex = $("<p>").text("UV Index: " + Math.round(response.value));
            card.append(UVindex);
        })
    })

    // Include a 5-Day Forecast
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {

        var forecastList = response.list

        for (var i = 0; i < forecastList.length; i++) {

            var rawTime = convertUnix(forecastList[i].dt);
            console.log(rawTime);

            if (rawTime === "14:00:00") {

                var date = moment(forecastList[i].dt_txt).format("MMM DD");
                var description = forecastList[i].weather[0].main;
                var icon = "http://openweathermap.org/img/wn/" + forecastList[i].weather[0].icon + ".png";
                var temp = Math.round(forecastList[i].main.temp);
                var humidity = forecastList[i].main.humidity;

                $("<div>", {
                    "class": "card forecast"
                }).append([
                    $("<div>", {
                        "class": "card-body"
                    }).append([
                        $("<h4>").text(date),
                        $("<img>").attr("src", icon),
                        $("<h5>").text(description).attr("style", "text-transform: uppercase; font-weight: bold"),
                        $("<h5>").text("Temp: " + temp),
                        $("<h5>").text("Humidity: " + humidity + "%")
                    ])
                ]).appendTo("#cityForecast")

            }
        }
    })
}
// Include search history buttons
function addButton(item) {
    var newButton = $("<button>").attr({ "type": "button", "class": "btn btn-outline-secondary btn-lg historyButton" });
    $(newButton).text(item);
    $("#buttons").append(newButton);
}

function convertUnix(x) {
    var date = new Date(x * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}