//Time function
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let timeElement = document.querySelector("#timeNow");
let currentTime = new Date();
timeElement.innerHTML = formatDate(currentTime);
//////////////////////////////////////////////////////////////////////////////////
//Get results from city search
//////////////////////////////////////////////////////////////////////////////////

function displayWeatherCondition(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("temperatureElement");
  temperatureElement.innerHTML = celsiusTemp;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("descriptionElement");
  descriptionElement.innerHTML = description;
  let currentCity = response.data.name;
  let cityElement = document.querySelector("cityElement");
  cityElement.innerHTML = currentCity;
  let windVar = response.data.wind.speed;
  let windElement = document.querySelector("windElement");
  windElement.innerHTML = windVar;
  let humidityVar = response.data.main.humidity;
  let humidityElement = document.querySelector("humidityElement");
  humidityElement.innerHTML = humidityVar;
  let iconElement = document.querySelector("#icon");
  let weatherIcon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "24938515d6364eea8b6bfd1202de9eb1";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(displayWeatherCondition);
  console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
//Temp Conversion

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  console.log(fahrenheitTemp);
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

//Forecast Fill
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "24938515d6364eea8b6bfd1202de9eb1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Globals
let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Berlin");
