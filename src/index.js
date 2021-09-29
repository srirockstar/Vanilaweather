function formatDate(timestamp) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(timestamp);
  let days = weekdays[date.getDay()];
  return `${days} `;
}
function formatDateForcast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function formatTime(timeNow) {
  let date = new Date(timeNow);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  console.log(date);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${hours}:${minutes}`;
}

function currentMounth(monthDay) {
  let monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date(monthDay);
  let month = monthName[date.getMonth()];
  let currentDay = date.getDate();
  return `${month} ${currentDay}`;
}
function displayForcast(response) {
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row" id="days">`;
  //console.log(response.data.daily);
  let forcast = response.data.daily;
  forcast.forEach(function (forcastDay, index) {
    if (index < 5) {
      forcastHTML =
        forcastHTML +
        `     <div class="col-2" id="day1">
            <ul class="horizontalListDay2">
              <li class="horizontalListDay">${formatDateForcast(
                forcastDay.dt
              )}</li>
             
              <li class="horizontalListDay2Li3">
              <img
              src="http://openweathermap.org/img/wn/${
                forcastDay.weather[0].icon
              }@2x.png"/>
              </li>
							 <li class="horizontalListDayDescription">${
                 forcastDay.weather[0].description
               }</li>
							 <li class="minTemp"> ${Math.round(forcastDay.temp.min)} </li>
							 <hr/ class="line">
							 <li class="maxTemp">${Math.round(forcastDay.temp.max)}</li>
            </ul>
          </div>
`;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}
function getForcast(coordinates) {
  let apiKey = "802a9523a0d10578c154dd32831cb977";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}
function displayTempreture(response) {
  let tempretureElement = document.querySelector("#temp-num");
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description-weather");
  let dateElement = document.querySelector("#date-day");
  let timeElement = document.querySelector("#date-hour");
  let monthElement = document.querySelector("#date-num");
  let iconElement = document.querySelector("#icon");

  //  celsiusTemp = response.data.main.temp;

  descriptionElement.innerHTML = response.data.weather[0].description;
  tempretureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  document.querySelector("#wind-km").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  monthElement.innerHTML = currentMounth(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForcast(response.data.coord);
}
function search(city) {
  let apiKey = "802a9523a0d10578c154dd32831cb977";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTempreture);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city-form").value;
  search(cityInputElement);
}

//let celsiusTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Boston");
