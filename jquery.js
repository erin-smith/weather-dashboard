$(document).ready(function () {
var homeCity = "Oceanside";
var enterCity;
var lat = response.coord.lat;
var lon = response.coord.lon;
var recentSearches = [];
var APIKey = "07ddd2102ddf91d384e4734ebe2258cc";
var qetUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey;
var queryfive = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly&appid=" +APIKey;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKey + "&q=" + cityNow;

var city = document.querySelector("#city-input").value;  //store user input from HTML page
$(document).on("click","#searchq", searchCity); // click event naming function to engage search

if (city === "") {
  $("#msg").text("error", "City cannot be blank");
} else if (city !== response.name) {
  $("#msg").text("error", "City not found");
} else {
  $("#msg").text("success", "Getting Weather");
}
  showCity(enterCity);  //function to get city weather
});

$(document).on("click",".ListBtn", reLookcity); // on click event- recall button from list cities

  var cityNow = $("#city-input").val(); 
  var APIKey = "07ddd2102ddf91d384e4734ebe2258cc";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKey + "&q=" + cityNow;
  showCity(cityNow);
  console.log(cityNow);

//start local storage
function listPlaces() {
  recentSearches = JSON.parse(localStorage.getItem("recentSearches")); //call local storage, set "key"
  if (recentSearches === null) {
    recentSearches = [];  //array for searched cities, starts empty
  }
}
listPlaces();
$("#day-cards").empty();     //empty this one

function clearOldList() {      // empty old searches so no doubles, etc.
  $("#cities-view").empty();

  recentSearches.forEach(function(city,i) {   //function that makes list of button-cities clickable
  
    var a = $("<button>");
    a.addClass(list-item-action);
    a.addClass("ListBtn");
    a.attr("cityWeather",city);
    a.text(city);
    $("div #cities-view").append(a);  //put my list of cities in form <ul> in html
  });
  }
clearOldList();

function reLookcity(event) {    
  event.preventDefault();     //function to show city data when clicked from searched city list
  let city = $(this).attr("cityWeather");
  console.log(this);
  showCity(city); 
}

function setCity(city) {       // put city in array 
  if (!recentSearches.includes(city)) {
    recentSearches.push(city);
  }
  localStorage.setItem("recentSearches",JSON.stringify(recentSearches)); //set city info in local storage
  clearOldList();
}

function searchCity(event) {    //grab new data on every cearch button push!
  event.preventDefault();
  var cityNow = $("#city-input").value;
  showCity(cityNow);
  console.log(cityNow);
}

function showCity (cityNow) {    //function (1) where all the action is!
  var APIKey = "07ddd2102ddf91d384e4734ebe2258cc";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKey + "&q=" + cityNow;

           $.ajax({                  // AJAX call to the OpenWeatherMap API GET TODAY WEATHER ONLY
            url: queryURL,
            method: "GET"

           }) .then(function(response) {     // We store all of the retrieved data inside of an object called "response"
      
              // Log the resulting object
          var description= response.weather[0].description;
            console.log(description);
           // Convert the temp to fahrenheit
           
           enterCity = response.name;
           var day = new Date().toLocaleDateString("en-US");
           console.log(day);
           //icon//
           var tempK = response.main.temp;
           var tempF = (response.main.temp - 273.15) * 1.80 + 32;
           var windSpeed = response.wind.speed;
           var humid = response.main.humidity;
           setCity(enterCity);

              // Transfer content to HTML
              $(".city").html("<h3>" + response.name + " Weather Details: </h3>");
              $(".day").text("Date: " + day)
              $(".description").text("Conditions: " + description);
              $(".wind").text("Wind Speed: " + windSpeed);
              $(".humidity").text("Humidity: " + humid);
              $(".temp").text("Temperature (K): " + tempK);
              $(".tempF").text("Temperature (F): " + tempF);

        //seperate call for UV elements
       var lat = response.coord.lat;
      var lon = response.coord.lon;
      var APIKey = "07ddd2102ddf91d384e4734ebe2258cc";
      var qetUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey;
    
    }) .then(function () {

      $.ajax({
        url: queryUV + "&lat=" + lat + "&lon=" + lon,
        method: "GET"

      }).then(function (response) {
        $(".UV-index").text(response.value);
      });
    
//NOT FINISHED OBVIOUSLY>>>

//STILL ON MY LIST


 //GET 5 DAY Forecast
 //DIsplay data on screen   
 // function makeCards() {   // Here is where I neeed to append divs to card and enter info for 5 days
 //hold recent searches that are visible (succesfully)
 //click on them to see data  
 //Add ICONS
 // Add more coloring/grid spacing/formatting 
    })
  }
