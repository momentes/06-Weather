
const cities = [];

const citySearch=document.getElementById("citySearch");

const searchInput=document.getElementById("searchInput");
const searchDisplay = document.getElementById("searchDisplay");
const previousSearches = document.getElementById("previousSearches");

const currentCastDashboard=document.getElementById("currentCastDashboard");

const forecastHeader = document.getElementById("forecastHeader");

const clearHistory = document.getElementById("clearHistory");


// function toAllCaps(str){
//     return str.toUpperCase();
// }

// function toTitleCase(str) {
//     return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
// } 


const saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};


clearHistory.addEventListener("click", function(){
    localStorage.removeItem("cities");
    previousSearches.textContent = "";
});


const formSumbitHandler = function(event){
    event.preventDefault();
    const cityCountry = searchInput.value.trim();
    if(cityCountry){
        const cityCountryArray = cityCountry.split(',');
        const city = cityCountryArray[0].trim();
        const country = cityCountryArray[1] ? cityCountryArray[1].trim() : '';
        if (country) {
          getCurrentCast(city, country);
          getForecast(city, country);
          cities.unshift({city, country});
        } else {
          getCurrentCast(city);
          getForecast(city);
          cities.unshift({city});
        }
        searchInput.value = "";
        saveSearch();
        previousSearch(city, country);
    } else{
        searchInput.placeholder = "Please enter a city, country";
    }
}


const getCurrentCast = function(city, country){
    let apiKey = "523b55d0fba1e533fc90809576b9db58"
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`
 
     fetch(apiURL)
     .then(function(response){
         response.json().then(function(data){
             currectCastDirectory(data, city);
         });
     });
 };


 const currectCastDirectory = function(weather, currentCity){
    
    //Clear Search
    currentCastDashboard.textContent= "";  
    searchDisplay.textContent = toTitleCase(currentCity);
    
    //Create Header Element 
    let country = document.createElement("span")
    country.textContent = ", " + weather.sys.country;
 
    let currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("MMMM D, YYYY") + ") ";
 
    let weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
 
    //Create Description Element
    let description = document.createElement("span");
    description.textContent = "Description: " + toTitleCase(weather.weather[0].description);
    description.classList = "list-group-item"
 
    let temperatureFeels = document.createElement("span");
    temperatureFeels.textContent = "Feels Like: " + weather.main.feels_like + " °C";
    temperatureFeels.classList = "list-group-item"
 
    let temperature = document.createElement("span");
    temperature.textContent = "Temperature: " + weather.main.temp + " °C";
    temperature.classList = "list-group-item"
   
    let humidity = document.createElement("span");
    humidity.textContent = "Humidity: " + weather.main.humidity + " %";
    humidity.classList = "list-group-item"
 
    let windSpeed = document.createElement("span");
    windSpeed.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeed.classList = "list-group-item"
 
    //Append Header Element
    searchDisplay.appendChild(country);
    searchDisplay.appendChild(currentDate);
    searchDisplay.appendChild(weatherIcon);
 
    //Append Description Element
    currentCastDashboard.appendChild(description);
    currentCastDashboard.appendChild(temperatureFeels);
    currentCastDashboard.appendChild(temperature);
    currentCastDashboard.appendChild(humidity);
    currentCastDashboard.appendChild(windSpeed);
  
 }
 

citySearch.addEventListener("submit", formSumbitHandler);
previousSearches.addEventListener("click", pastSearchHandler);