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
