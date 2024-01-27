const searchButton = document.querySelector("#search-button");
const day = document.querySelector("#day");
const date = document.querySelector("#date");
const area = document.querySelector("#location");
const dayDetailIcon = document.querySelector("#day-detail-icon");
const dayHeat = document.querySelector("#day-heat");
const dayState = document.querySelector("#day-state");
const feelsLike = document.querySelector("#feels-like");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const mon = document.querySelector("mon");
const tue= document.querySelector("tue");
const wed = document.querySelector("wed");
const thu = document.querySelector("thu");
const apiKey = "691c533d8f55b5f2ba445c6ed3f9a601";

fetchWeatherData('Kocaeli');

const weatherIconMap = {
    '01d': 'sunny',
    '01n': 'nights_stay',
    '02d': 'sunny',
    '02n': 'nights_stay',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04d': 'cloud',
    '09d': 'rainy',
    '09n': 'rainy',
    '10d': 'rainy',
    '10n': 'rainy',
    '11d': 'partly_cloudly_day',
    '11n': 'partly_cloudly_day',
    '13d': 'weather_snowy',
    '13n': 'weather_snowy',
    '50d': 'water',
    '50n': 'water'
};

searchButton.addEventListener('click', function(){
    fetchWeatherData('Ankara');
});

function fetchWeatherData(location){
    //Construct the API url with the location and api key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=tr&format=json&units=metric`;
    fetch(apiUrl).then(response => response.json()).then(data => {
        const todayWeather = data['weather'][0].description;
        const todayTemp = `${Math.round(data['main'].temp)}°C`;
        const todayWeatherIconCode = data['weather'][0].icon;

        day.textContent = new Date().toLocaleDateString('tr', {weekday: 'long'})
        date.textContent = new Date().toLocaleDateString('tr', {day: 'numeric', month: 'long', year:'numeric'})
        dayDetailIcon.innerHTML = weatherIconMap[todayWeatherIconCode];
        dayHeat.innerHTML = todayTemp;
        area.textContent = `📌 ${data.name}, ${data['sys'].country}`;
        dayState.textContent = `${todayWeather}`;
        feelsLike.textContent = `${data['main'].feels_like}°C`;
        humidity.textContent = `${data['main'].humidity}%`;
        windSpeed.textContent = `${data['wind'].speed}km/s`;
    });
}