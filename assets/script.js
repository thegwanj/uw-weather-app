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
    var request = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=70603af3e62af0e02116a806e050a69c`;
    
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
        //console.log(data.daily[0].temp);
        // Averages the min and max temperature of that day
        //console.log(Math.round((data.daily[0].temp.min + data.daily[0].temp.max) / 2));

        // Collect and store data under variable names
        // Current Day
        var currentTemp = Math.round((data.daily[0].temp.min + data.daily[0].temp.max) / 2);
        var currentWind = data.daily[0].wind_speed;
        var currentHumidity = data.daily[0].humidity;
        var currentUVI = data.daily[0].uvi;
        var uviCondition;

        if(currentUVI >= 11){
            uviCondition = 'uviExtreme';
        } else if(currentUVI >= 8){
            uviCondition = 'uviVeryHigh';
        } else if(currentUVI >= 6){
            uviCondition = 'uviHigh';
        } else if(currentUVI >= 3){
            uviCondition = 'uviModerate';
        } else{
            uviCondition = 'uviLow';
        }

        // Clears weather to get ready to render the new search
        try {
            var currentWeather = document.getElementById('current');
            currentWeather.remove();
            var forcastEl = document.getElementById('forcast');
            forcastEl.remove();
        }
        catch (error){
            console.error(error);
        };

        // Render/display the weather data
        var outputHTML = document.createElement('div');
        outputHTML.innerHTML = `
        <div class="overview" id="current">
            <h1>${cityName} (Current)</h1>
            <img src="http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}.png">
            <p>Temp: ${currentTemp}\u00B0F</p>
            <p>Wind: ${currentWind} MPH</p>
            <p>Humidity: ${currentHumidity}%</p>
            <p class="${uviCondition}">UV Index: ${currentUVI}</p>
        </div>
        <div class="forcastRow" id="forcast">
            <h3>5-Day Forcast:</h3>
        </div>
        `;

        weatherEl.appendChild(outputHTML);

        var forcastEl = document.getElementById('forcast');
        var date = new Date();
        date.setDate(date.getDate());

        // Rendering the 5-day forcast to the forcastEl
        for(i = 1; i < 6; i++){
            //Getting values for the day and putting them into variables
            var temp = Math.round((data.daily[i].temp.min + data.daily[0].temp.max) / 2);
            var wind = data.daily[i].wind_speed;
            var humidity = data.daily[i].humidity;

            // Creating the date string
            date.setDate(date.getDate()+1);
            var dateString = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

            outputHTML = document.createElement('div');
            outputHTML.innerHTML = `
            <div class="forcastItem">
                <h4>${dateString}</h4>
                <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png">
                <p>Temp: ${temp}\u00B0F</p>
                <p>Wind: ${wind} MPH</p>
                <p>Humidity: ${humidity}%</p>
            </div>
            `;

            forcastEl.appendChild(outputHTML);
        };

    })
}