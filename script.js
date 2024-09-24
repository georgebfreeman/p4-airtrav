// Enhance the travel checklist web application by adding a weather forecast section 
// One that displays the weather for the next 4 days using a free weather API.

// Weather Forecast Functionality

// API key for OpenWeatherMap (you should replace this with your own)
const apiKey = 'a62b39ee5819b4d1a0a2433b1d510e1f';
const defaultCity = 'Boston';

// Function to fetch weather data from the API
async function getWeatherData(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`);
  const data = await response.json();
  return data;
}

// Function to create a weather card for a single day
function createWeatherCard(forecast) {
  const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
  const description = forecast.weather[0].description;
  const tempHigh = Math.round(forecast.main.temp_max);
  const tempLow = Math.round(forecast.main.temp_min);

  return `
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">${date}</h3>
        <img src="${icon}" alt="${description}" class="w-16 h-16 mx-auto">
        <p class="text-center">${description}</p>
        <p class="text-center">High: ${tempHigh}°C | Low: ${tempLow}°C</p>
      </div>
    </div>
  `;
}

// Function to update the weather forecast
async function updateWeatherForecast(city) {
  const weatherData = await getWeatherData(city);
  const forecastContainer = document.getElementById('weatherForecast');
  forecastContainer.innerHTML = ''; // Clear existing forecast

  // Get forecast for next 4 days (API returns data in 3-hour intervals)
  const forecasts = weatherData.list.filter((f, index) => index % 8 === 0).slice(0, 4);

  forecasts.forEach(forecast => {
    const card = createWeatherCard(forecast);
    forecastContainer.innerHTML += card;
  });
}

// Event listener for the update button
document.getElementById('updateForecast').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value || defaultCity;
  updateWeatherForecast(city);
});

// Initial forecast for the default city
updateWeatherForecast(defaultCity);

// Project 6 JavaScript:
// 1. Create a function to insert new plans into the Supabase table
// 2. Fetch and display existing travel plans from Supabase
// 3. Use forEach and/or filter to organize and display the plans
// 4. Add the ability to delete or update existing plans

const travelPlans = "https://elveyapsielprtcrwwha.supabase.co/rest/v1/travel_plans?select=*&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsdmV5YXBzaWVscHJ0Y3J3d2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNDM2OTUsImV4cCI6MjA0MTgxOTY5NX0.oNUU6s8dV83Ake63TG840QNROpV4_KrTMK_KPyRC_fw"


const travelPlansEl = document.querySelector('#travel-plans-list');


// 1. connect to the endpont
fetch(travelPlans)
  // 2. pull the JSON
  .then(response => response.json())
  // 3. do stuff with the data that comes back
  .then(data => {
    // console.log(data);

   //  data.forEach(item => console.log(item))
    data.forEach(item => showPostsWebView(item))
  })



function showPostsWebView(item = {}) {

console.log(item)
  const div = document.createElement('div');
  div.innerHTML = `
                <div class="card-body">
                        <h3 class="card-title">${item['date']}</h3>
                        <p class="text-gray-600">Location: ${item['location']}</p>
                        <p>${item['plan']}</p>
                        <div class="card-actions justify-end">
                            <button type="submit" class="btn btn-primary">Add Plan</button>
                        </div>
                </div>
    `
  travelPlansEl.appendChild(div);
}

