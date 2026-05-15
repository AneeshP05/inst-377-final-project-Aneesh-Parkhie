const express = require("express")
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const supabase = createClient(
    "https://xcngapfskiugrdzrxztb.supabase.co/rest/v1/",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjbmdhcGZza2l1Z3JkenJ4enRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3OTE1MjQsImV4cCI6MjA5NDM2NzUyNH0.DCGXN45fMQbEGjNNrpAA8G9n0RrU_X0ChhVqSD4aQgk"
)

async function getCoords(city, lat, lon) {
    if (lat && lon) {
        return {
            latitude: lat,
            longitude: lon,
            name: "Custom Location"
        }
    }

    let geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1"
    let geoReq = await fetch(geoUrl)
    let geoData = await geoReq.json()

    if (!geoData.results || geoData.results.length == 0) {
        return null
    }

    return geoData.results[0]
}

app.get("/api/weather", async function(req, res) {
    try {
        let place = await getCoords(req.query.city, req.query.lat, req.query.lon)

        if (!place) {
            res.status(404).json({ error: "Location not found" })
            return
        }

        let url = "https://api.open-meteo.com/v1/forecast?latitude=" + place.latitude +
            "&longitude=" + place.longitude +
            "&current=temperature_2m,weather_code,wind_speed_10m" +
            "&hourly=temperature_2m,precipitation_probability,wind_speed_10m" +
            "&daily=temperature_2m_max,temperature_2m_min,weather_code" +
            "&forecast_days=10&timezone=auto"

        let weatherReq = await fetch(url)
        let weatherData = await weatherReq.json()

        weatherData.locationName = place.name
        res.json(weatherData)

    } catch (e) {
        res.status(500).json({ error: "Weather request failed" })
    }
})

app.get("/api/alerts", async function(req, res) {
    try {
        let lat = req.query.lat
        let lon = req.query.lon

        let url = "https://api.weather.gov/alerts/active?point=" + lat + "," + lon

        let alertReq = await fetch(url, {
            headers: {
                "User-Agent": "WeatherPlanner student project"
            }
        })

        let alertData = await alertReq.json()
        res.json(alertData)

    } catch (e) {
        res.status(500).json({ error: "Alerts request failed" })
    }
})

app.get("/api/favorites", async function(req, res) {
    let { data, error } = await supabase.from("favorites").select("*")

    if (error) {
        res.status(500).json({ error: error.message })
    } else {
        res.json(data)
    }
})

app.post("/api/favorites", async function(req, res) {
    let { city_name, latitude, longitude } = req.body

    let { data, error } = await supabase
        .from("favorites")
        .insert([{ city_name, latitude, longitude }])
        .select()

    if (error) {
        res.status(500).json({ error: error.message })
    } else {
        res.json(data)
    }
})

app.listen(3000, function() {
    console.log("server running on http://localhost:3000")
})