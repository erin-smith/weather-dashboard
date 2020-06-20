$(document).ready(function ()
{

    function getWeather (cityName, honza)
    {
        const APIKey = "07ddd2102ddf91d384e4734ebe2258cc";
        const queryURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + APIKey + "&q=" + cityName;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then((data) =>
        {
            honza(data);
        });
    }

    function getForecast (lat, lon, callback)
    {
        const APIKey = "07ddd2102ddf91d384e4734ebe2258cc";
        const queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then((data) =>
        {
            callback(data);
        });
    }

    function updateToday (todayData)
    {
        $("#city").text(todayData.name);
        $("#day").text("Date: " + new Date().toLocaleDateString("en-US"));
        //ICON to enter  //Color that indicates favorable, moderate, or severe
        $("#description").text("Conditions: " + todayData.weather[0].description);
        $("#wind").text("Wind Speed: " + todayData.wind.speed);
        $("#humidity").text("Humidity: " + todayData.main.humidity);
        $("#temp").text("Temperature (C): " + todayData.main.temp);
        $("#tempF").text("Temperature (F): " + Math.floor((todayData.main.temp) * 1.80 + 32));

    }

    function updateForecast (data)
    {
        $("#dailyW").empty();
        const fiveDay = [];
        for (let i = 1; i < 6; i++) {
            fiveDay.push(makeCard(data.daily[i]));
        }
        console.log(fiveDay);
        $("#dailyW").append(fiveDay);
    }

    function makeCard(myVar){
        const myNewCard = $("<div>").addClass("card");
        let a = $("<ul>").html("<h3>" + "Date:" + (new Date(myVar.dt*1000).toLocaleDateString("en-US")) + "</h3>");
        //$("<li>").//ICON illustrating weather conditions
        let b = $("<li>").text("Conditions: " + myVar.weather[0].description);
        let c = $("<li>").text("Daily High:" + Math.floor((myVar.temp.max- 273.15) * 1.80 + 32));
        let d = $("<li>").text("Daily Low:" + Math.floor((myVar.temp.min- 273.15) * 1.80 + 32));
        let e = $("<li>").text("Humidity: " + myVar.humidity);
        return myNewCard.append(a, b, c, d, e);
    }

    function showCity(city)
    {
        getWeather(city, (weather) =>
        {
            console.log(weather);
            updateToday(weather);
            getForecast(weather.coord.lat, weather.coord.lon, (forecast) =>
            {
                console.log(forecast);
                updateForecast(forecast);
            });
        });
    }

    function saveCity(milleu){
        const placeBtn = $("<button>").text(milleu).click(function(){
            showCity(milleu);
        });
        $("#cities-view").append(placeBtn);
    }

    $("#searchq").on("click", function(event){
        event.preventDefault();
        const city = $("#city-input").val();
        saveCity(city);
        showCity(city);
    });

});

//Needs local storage
//Needs search button only show one search per palce
//Needs obviously formatting