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

// var city;
// var formText = $("#formText");
// var city = 
// var city = formText.val;

var currentWeather = $("#currentWeather"); 
var fiveDay = $("#fiveDay");
var searchHistory = $("#searchHistory");
var formBehave = $("#formBehave");
var forecastCont = $("#forecastCont");

// fetch call for the currentweather from the weather API that does current weather in location
// I learned how to use template literals to edit the link instead of adding multiple strings together so that I could target the parameters (shoutout Alex Yu)
var todaysWeather = function (city) {
    // var city = $("#formText").val();
    var todaysAPIkey = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dd76701e25ab4039c10dae0c18be5401&units=imperial`;
    fetch(todaysAPIkey)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        renderTodaysWeather(data);
        // console.log(data);
    });
    
}

// fetch request for 5 day forecast (which in hindsight I really shouldn't have used cuz it caused me all types of bugs and I would have switched if given the option to do something different but I ran out of time)
var fiveForecast = function (city)  { 

    var fiveForecastAPIkey = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=dd76701e25ab4039c10dae0c18be5401&units=imperial`;
    fetch(fiveForecastAPIkey)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        renderFiveForecast(data);
        // console.log(data);
    });
}

var renderTodaysWeather = function(city) {
    var date = moment().format("dddd, MMMM, Do YYYY, h:mm:ss a");
    currentWeather.empty();
    var weatherPic = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
    var weatherOfTheDay = $(`
    <div class = "row ml-2"> 
    <h1>${city.name} ${date}<img src="${weatherPic}"></h1>
    <p>Temperature: ${city.main.temp} F</p>
    <p>Humidity:  ${city.main.humidity} % </p>
    <p>Wind Speed: ${city.wind.speed} MPH </p>
    </div>
    `);
   currentWeather.append(weatherOfTheDay);

    
}

var renderFiveForecast = function(city) {
    
    forecastCont.empty();
    console.log(city)
    for(var i = 7; i <= 39; i+=8) { //so basically I had to skip values because this API was giving me a new object every 3 hours and I only needed daily data. 
        //Basically it's bugged because I picked an API without really understanding or reading the docs oh well lesson learned
        var date = moment(city.list[i-7].dt_txt).format("ddd"); // date shows the day of the week and I had to pick the index minus 7 so that it would start at the correct day of the week based off of the day after the current day
        var forecastPicture = `https://openweathermap.org/img/wn/${city.list[i].weather[0].icon}@2x.png`
    var forecastWeekly = $(`    
    <div class="card col-2">
        <div class ="card-body">
            <h3 class="card-title"> ${date} <h3>
            <img src="${forecastPicture}">
            <p class ="card-text"> Tmp: ${city.list[i].main.temp} F </p>
            <p class ="card-text"> Hum: ${city.list[i].main.humidity} %</p>
        </div>
    </div>
    
    
    
    `);
    console.log("test");
    forecastCont.append(forecastWeekly);
}

}

formBehave.on("submit", (event) => {
    event.preventDefault();
    var city = $("#formText").val();
    todaysWeather(city);
    fiveForecast(city);
});



