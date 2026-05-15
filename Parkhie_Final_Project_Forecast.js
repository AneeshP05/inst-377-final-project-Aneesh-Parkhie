let data = JSON.parse(localStorage.getItem("weatherData"))

if (!data) {
    document.getElementById("hourlyList").innerHTML = "Go to the home page and search a location first."
} else {
    let labels = data.hourly.time.slice(0, 24)
    let temps = data.hourly.temperature_2m.slice(0, 24)
    let rain = data.hourly.precipitation_probability.slice(0, 24)

    new Chart(document.getElementById("forecastChart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Hourly Temperature",
                    data: temps,
                    borderColor: "yellow"
                },
                {
                    label: "Precipitation Probability",
                    data: rain,
                    borderColor: "blue"
                }
            ]
        }
    })

    let list = document.getElementById("hourlyList")

    for (let i = 0; i < 24; i++) {
        list.innerHTML += "<p>" + data.hourly.time[i] +
        " Temp: " + data.hourly.temperature_2m[i] +
        "°C, Rain: " + data.hourly.precipitation_probability[i] +
        "%, Wind: " + data.hourly.wind_speed_10m[i] + " km/h</p>"
    }
}