// Function to get real time weather from any city

function getWeather(response) {
  console.log(response);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.temperature.current);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.city;
}

// ----------------------------------------------------------------------
function search(city) {
  let apiKey = "be923c79304a1acdofa6t0cb040e4779";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputSearch = document.querySelector("#search-bar");
  search(cityInputSearch.value);
}

let form = document.querySelector("#form-submit");
form.addEventListener("submit", handleSubmit);

search("Ohrid");

// ------------------------------------------------------------------------

// Function to change the H1 to whatever city is being inputted by the user in the search bar

function changeCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-bar");
  let h1 = document.querySelector("#city");
  return (h1.innerHTML = `${inputCity.value}`);
}

let searchCity = document.querySelector("#form-submit");
searchCity.addEventListener("submit", changeCity);

// Function formatting date to current date and time
function formatDate(date) {
  let now = date;
  let dateTime = document.querySelector("#date-time");
  let currentDate = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let day = days[now.getDay()];
  return (dateTime.innerHTML = `${day} ${currentDate} ${hours}:${minutes}`);
}

let realDate = new Date();
formatDate(realDate);
