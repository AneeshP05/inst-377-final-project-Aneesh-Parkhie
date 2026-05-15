let lastLocation = null
let map = null

function loadWeather() {
    let city = document.getElementById("cityInput").value
    let lat = document.getElementById("latInput").value
    let lon = document.getElementById("lonInput").value

    let url = "/api/weather?"

    if (city != "") {
        url += "city=" + city
    } else {
        url += "lat=" + lat + "&lon=" + lon
    }

    fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert(data.error)
            return
        }

        lastLocation = data
        localStorage.setItem("weatherData", JSON.stringify(data))

        document.getElementById("locationName").innerHTML = data.locationName
        document.getElementById("currentTemp").innerHTML = "Current Temperature: " + data.current.temperature_2m + "°C"
        document.getElementById("conditions").innerHTML = "Weather Code: " + data.current.weather_code

        let forecast = document.getElementById("dailyForecast")
        forecast.innerHTML = ""

        for (let i = 0; i < data.daily.time.length; i++) {
            forecast.innerHTML += "<p>" + data.daily.time[i] + ": High " +
            data.daily.temperature_2m_max[i] + "°C, Low " +
            data.daily.temperature_2m_min[i] + "°C</p>"
        }

        if (map) {
            map.remove()
        }

        map = L.map("map").setView([data.latitude, data.longitude], 8)

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19
        }).addTo(map)

        L.marker([data.latitude, data.longitude]).addTo(map)
    })
}

function saveFavorite() {
    if (!lastLocation) {
        alert("Search a location first")
        return
    }

    fetch("/api/favorites", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            city_name: lastLocation.locationName,
            latitude: lastLocation.latitude,
            longitude: lastLocation.longitude
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Favorite saved")
    })
}