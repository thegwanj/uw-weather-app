var apiKey = '70603af3e62af0e02116a806e050a69c';
var cityBtn = document.getElementById('submit');
var input = document.getElementById('input');
var weatherEl = document.getElementById('weather');
var historyEl = document.getElementById('history');

// Submit the form to fetch the weather information

    // Fetch the city name from the text input

    // Call the fetchGeolocation and pass the city name
    //fetchGeolocation(cityName);

// Handle button clicks to fetch weather information
cityBtn.addEventListener('click', getLocation);

function getLocation(){
    // Get the city name from the click button's (event.target) data-city attribute
    cityName = input.value;
    // Call the fetchGeolocation and pass the city name
    fetchGeolocation(cityName);
}

// Fetch geolocation data (Geocoding API)
function fetchGeolocation(cityName){
    var request = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=70603af3e62af0e02116a806e050a69c`;

    fetch(request)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            // Access lat and lon from data
            var lat = data[0].lat;
            var lon = data[0].lon;

            console.log(lat);
            console.log(lon);

            // Call fetchOneCallWeather and pass through the lat and lon
            fetchOneCallWeather(lat, lon, cityName);

            // Render and add on to search history
            var outputHTML = document.createElement('div');
            outputHTML.innerHTML = `
            <div class="row">
                <p>${cityName}</p>
            </div>
            `;
            historyEl.appendChild(outputHTML);    
        });
}

// Fetch the weather data (Onecall)
function fetchOneCallWeather(lat, lon, cityName){

    var request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=70603af3e62af0e02116a806e050a69c`;

    fetch(request)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        // Render/display the weather data
        var outputHTML = document.createElement('div');
        outputHTML.innerHTML = `
        <div class="overview" id="current">
            <h1>${cityName} (Current)</h1>

            <p>Temp: </p>
            <p>Wind: </p>
            <p>Humidity: </p>
            <p>UV Index: </p>
        </div>
        <div class="forcast" id="forcast">
            <h3>5-Day Forcast:</h3>
        </div>
        `;

        // Clears weather then renders the new search
        try {
            var currentWeather = document.getElementById('current');
            currentWeather.remove();
            var forcastEl = document.getElementById('forcast');
            forcastEl.remove();
        }
        catch (error){
            console.error(error);
        }
        weatherEl.appendChild(outputHTML);
    })

}