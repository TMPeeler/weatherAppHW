//first I will need to implement and link all of my prerequisite files  -----------
//(javascript, jQuery, moment, OpenWeatherAPI, CSS, Bootstrap) ------
//Then I will build my basic HTML elements so that they can be styled to 
//make room for the appended elements
//Then I will make a form (prevent default) that has a search bar and button
//When the button is pressed, if the text field has content that matches data from openWeatherAPi, it will show that city and its weather forecast as 
//it will save the name of that city and the weather conditions in the local storage as a variable
//after the button is pressed it will make a button with the name of the city that will make a request for the forecast upon click of that button


// set variables and grab dom elements for the current weather, the 5 day forecast, and the search history

// fetch weather, 5 day forecast, and uv index from API

// render the weather, the forecast, and the uv index (color green, yellow, red)

// set any text entered in the text field to store as a variable

// set search history items to be parsed and appended to the page from local storage


var currentWeather = $("#currentWeather"); 
var fiveDay = $("#fiveDay");
var searchHistory = $("#searchHistory");
var formBehave = $("#formBehave");
var formText = $("#formText");
var city = formText.val;

var todaysWeather = function (city) {
    var todaysAPIkey = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=dd76701e25ab4039c10dae0c18be5401&units=imperial";
    fetch(todaysAPIkey)
    .then(function(response) {
        return response.json();
        
    })
    .then(function (data) {
        
        // renderTodaysWeather(data);
        console.log(data);
    });
    
}


var fiveForecast = function ()  { 
    var fiveForecastAPIkey = "https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=dd76701e25ab4039c10dae0c18be5401&units=imperial";
    fetch(fiveForecastAPIkey)
    .then(function(response) {
        return response.json();
    }).then(function (response) {
        renderFiveForecast(response);
    });
}

var renderTodaysWeather = function() {
    var date = moment().format("dddd, MMMM, Do YYYY, h:mm:ss a");
    
}

var renderFiveForecast = function() {


}

formBehave.on("submit", (event) => {
    event.preventDefault();
    todaysWeather(city);
    
});



