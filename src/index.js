function displayWeather(response) {
    let mainTemp = document.querySelector("#main-temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-app-city");
    let currentTime = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"];
    let day = days[date.getDay()];
    let currentCondition = document.querySelector("#current-condition");
    let currentHumidity = document.querySelector("#humidity");
    let currentWind = document.querySelector("#wind");
    let icon = document.querySelector("#main-temperature-icon"); 
    
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" id="main-temperature-icon" class="main-temperature-icon">`;

    cityElement.innerHTML = response.data.city;
    mainTemp.innerHTML = Math.round(temperature);
    currentTime.innerHTML = `${day} ${hours}:${minutes}`;
    if (minutes < 10) {
        currentTime.innerHTML = `${day} ${hours}:0${minutes}`;
    }
    currentCondition.innerHTML = response.data.condition.description;
    currentHumidity.innerHTML = response.data.temperature.humidity + `%`;
    currentWind.innerHTML = response.data.wind.speed + ` km/h`;
    
    console.log(response.data);
    fetchForecast(response.data.city);
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "73a2286e35ab2408d94of591bf48e09t";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather); 
}

function searchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

function fetchForecast(city) {
    let apiKey = "73a2286e35ab2408d94of591bf48e09t";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    console.log(apiUrl);
}

function displayForecast(response) {
    let forecast = document.querySelector("#forecast");

    let forecastHtml = "";
    
    response.data.daily.forEach(function(day, index) {
        if (index < 6) { // Show only 6 days
            let date = new Date(day.time * 1000);
            let dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            forecastHtml = forecastHtml +`
            <div class="weather-forecast-day">
                <div class="weather-forecast-date">${dayName}</div>
                <img src="${day.condition.icon_url}" class="weather-forecast-icon" alt="${day.condition.description}">
                <div class="weather-forecast-temperatures">
                    <div class="weather-forecast-temperature">
                        <strong>${Math.round(day.temperature.maximum)}°</strong>
                    </div>
                    <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
                </div>
            </div>
            `;
        }
    });

    forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);
searchCity("Tokyo");