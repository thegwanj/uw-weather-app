var apiKey = '70603af3e62af0e02116a806e050a69c';

// Submit the form to fetch the weather information

    // Fetch the city name from the text input

    // Call the fetchGeolocation and pass the city name

// Handle button clicks to fetch weather information

    // Get the city name from the click button's (event.target) data-city attribute

    // Call the fetchGeolocation and pass the city name

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

            // Call fetchOneCallWeather and pass through the lat and lon

        });
}

fetchGeolocation("Seattle");

// Fetch the weather data (Onecall)
function fetchOneCallWeather(lat, lon){

    var request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=70603af3e62af0e02116a806e050a69c`;

    fetch(request)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        // Render/display the weather data
    })

}

fetchOneCallWeather();