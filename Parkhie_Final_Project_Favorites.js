function loadFavorites() {
    let box = document.getElementById("favoritesBox")
    box.innerHTML = ""

    fetch("/api/favorites")
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            box.innerHTML = "Could not load favorites."
            return
        }

        for (let i = 0; i < data.length; i++) {
            box.innerHTML += `
                <div class="favoriteCard">
                    <h2>${data[i].city_name}</h2>
                    <p>Latitude: ${data[i].latitude}</p>
                    <p>Longitude: ${data[i].longitude}</p>
                    <button onclick="loadFavoriteWeather('${data[i].latitude}', '${data[i].longitude}')">View Weather</button>
                </div>
            `
        }
    })
}

function loadFavoriteWeather(lat, lon) {
    fetch("/api/weather?lat=" + lat + "&lon=" + lon)
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("weatherData", JSON.stringify(data))
        alert("Weather loaded. Go to Home or Forecast Details.")
    })
}