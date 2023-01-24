

const cityAppend=document.querySelector("#citySearch");
const cityInput=document.querySelector("#city");
const citySearchInput = document.querySelector("#searchForCity");

const previousSearchAppend = document.querySelector("#previousSearch");

const cities = [];


let getCityWeather = function(city){
    var apiKey = "523b55d0fba1e533fc90809576b9db58"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};


let saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};


const displayWeather = function(weather, searchForCity){


    citySearchInput.textContent=searchForCity;

    var currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearchInput.appendChild(currentDate);
 
    //create an image element
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchInput.appendChild(weatherIcon);
 

}