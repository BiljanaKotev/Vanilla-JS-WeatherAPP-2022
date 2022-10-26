function changeCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-bar");
  let h1 = document.querySelector("#city");
  return (h1.innerHTML = `${inputCity.value}`);
}

let searchCity = document.querySelector("#form-submit");
searchCity.addEventListener("submit", changeCity);

function formatDate(date) {
  let now = new Date(date);
  let currentDate = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let day = days[now.getDay()];

  let dateTime = document.querySelector("#date-time");
  return (dateTime.innerHTML = `${day} ${currentDate} ${hours}:${minutes}`);
}
// let realDate = new Date();
// formatDate(realDate);

function getWeather(response) {
  console.log(response);
  let temp = document.querySelector("#temperature");
  let cityName = document.querySelector("#city");
  let wind = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let forecastDescription = document.querySelector("#forecast");
  let dateTime = document.querySelector("#date-time");
  let weatherIcon = document.querySelector("#top-icon");

  temp.innerHTML = Math.round(response.data.temperature.current);
  cityName.innerHTML = response.data.city;

  wind.innerHTML = Math.round(response.data.wind.speed);

  humidity.innerHTML = response.data.temperature.humidity;
  forecastDescription.innerHTML = response.data.condition.description;
  dateTime.innerHTML = formatDate(response.data.time * 1000);
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

// ----------------------------------------------------------------------

function search(city) {
  let apiKey = "be923c79304a1acdofa6t0cb040e4779";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=be923c79304a1acdofa6t0cb040e4779&units=metric`;

  axios.get(apiUrl).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputSearch = document.querySelector("#search-bar");
  search(cityInputSearch.value);
}

let celsiusTemp = null;

let form = document.querySelector("#form-submit");
form.addEventListener("submit", handleSubmit);

function changeDegreeUnitToFahrenheit(event) {
  event.preventDefault();
  let degreeUnit = document.querySelector("#temperature");
  let fahrenheitDegree = (celsiusTemp * 9) / 5 + 32;
  degreeUnit.innerHTML = Math.round(fahrenheitDegree);
}
let fahrenheitClick = document.querySelector("#fahrenheit");
fahrenheitClick.addEventListener("click", changeDegreeUnitToFahrenheit);

function changeDegreeUnitToCelsius(event) {
  event.preventDefault();
  let degreeUnit = document.querySelector("#temperature");
  degreeUnit.innerHTML = Math.round(celsiusTemp);
}

let celsiusClick = document.querySelector("#celsius");
celsiusClick.addEventListener("click", changeDegreeUnitToCelsius);

search("Ohrid");
