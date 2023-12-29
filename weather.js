// Previous code...
const Key = "apiKey";

const dateObj = new Date();



function fetchWeatherData(location) {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=09b4567e97b04b1e9c2154412231611&q=${encodeURIComponent(location)}&days=7&aqi=no&alerts=no`;
    
    
  const fullDateStr = dateObj.toLocaleDateString('en-GB', {
    day: "numeric", month: "short", year: "numeric"
  });
  document.querySelector(".date-day").textContent = fullDateStr;
    fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
    document.querySelector('.location').textContent = `${data.location.name}, ${data.location.country}`;
    document.querySelector(".weather-temp").textContent = `${data.current.temp_c}°C`;
    document.querySelector(".weather-desc").textContent = `${data.current.condition.text}`;
    document.querySelector(".weather-icon").src = `${data.current.condition.icon}`;
    document.querySelector(".precipitation .value").textContent = `${data.current.precip_in}`;
    document.querySelector(".date-container").textContent = getDayName("long");
    document.querySelector(".precipitation .value").textContent = `${data.current.precip_in}`;
    document.querySelector(".humidity .value").textContent = `${data.current.humidity} %`;
    document.querySelector(".wind .value").textContent = `${data.current.wind_kph} km/h`;
    if (data.current.is_day){
      document.querySelector(".weather-side-day").classList.replace("night", "day");
    }else{
      document.querySelector(".weather-side-day").classList.replace("day", "night");
    }

    updateForecastData(data.forecast);
    

    });

    
    
    function updateForecastData(forecastVal) {

  

      const weekContainer = document.querySelector(".week-list");
  weekContainer.innerHTML = "";

  forecastVal.forecastday.forEach(eachForecast => {
    const dayVal = eachForecast.day;
    const currentDate = new Date(eachForecast.date);
    

    if (currentDate.toDateString() !== dateObj.toDateString()) {
      const liEl = document.createElement('li');

      liEl.innerHTML = `
        <img src="${dayVal.condition.icon}" alt="${eachForecast.date} temperature">
        

        <span class="day-name">${getDayName('short', currentDate)}</span>
        <span class="day-temp">${dayVal.maxtemp_c}C</span>`;

        weekContainer.appendChild(liEl);
    }
  })
  weekContainer.insertAdjacentHTML("beforeend", `<div class="clear"></div>`);
}}
document.querySelector(".location-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const searchLocation = document.getElementById("search-input").value.trim();
  if (searchLocation) {
    fetchWeatherData(searchLocation);
  }
});;
  


    



    





const getDayName = (dayType, dateVal = dateObj) => dateVal.toLocaleDateString('en-US', { weekday: dayType });
navigator.geolocation.getCurrentPosition(position =>{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = `${latitude}, ${longitude}`;
    fetchWeatherData(location)
}),error => {
    console.log('Error getting location', error);
  }

