var apiKey = '70603af3e62af0e02116a806e050a69c';

// Submit the form to fetch the weather information

// Handle button clicks to fetch weather information

// Fetch geolocation data (Geocoding API)
function fetchGeolocation(cityName){
    var request = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=70603af3e62af0e02116a806e050a69c`;

    fetch(request)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
}

fetchGeolocation("Seattle");

// Fetch the weather data (Onecall)