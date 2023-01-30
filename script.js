
const cities = [];

const citySearch=document.getElementById("citySearch");

const searchInput=document.getElementById("searchInput");
const searchDisplay = document.getElementById("searchDisplay");
const previousSearches = document.getElementById("previousSearches");

const currentCastDashboard=document.getElementById("currentCastDashboard");

const forecastHeader = document.getElementById("forecastHeader");


var cities = [];


var getSearchCityWeather = function(city){
    var apiKey = "523b55d0fba1e533fc90809576b9db58"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};


var formSumbitHandler = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    if(city){
        geSearchCityWeather(city);
        cityInput.value = "";
    } else{
       placeholder("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}



var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};


//Current Weather Dashboard
var displayWeather = function(weather, previousCity){

    weatherContent.textContent = " "; 
    cityPreviousSearch.textContent = previousCity;

    //create data 
    var currentDate = document.createElement("span")
    currentDate.textContent =" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearchInput.appendChild(currentDate);
 
    //create an weather icon
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weatherDaily.weather[0].icon}@2x.png`);
    citySearchInput.appendChild(weatherIcon);
 
    //weather data with span element
    var temperature = document.createElement("span");
    temperature.textContent = "Temperature: " + weather.main.temp + " °C";
    temperature.classList = "list"

    var wind = document.createElement("span");
    wind.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    wind.classList = "list"

    var humidity = document.createElement("span");
    humidity.textContent = "Humidity: " + weather.main.humidity + " %";
    humidity.classList = "list"

    weatherContent.appendChild(temperature);
    weatherContent.appendChild(wind);
    weatherContent.appendChild(humidity);

}


cityAppend.addEventListener("submit", formSumbitHandler);