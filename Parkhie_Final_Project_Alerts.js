function loadAlerts() {
    let data = JSON.parse(localStorage.getItem("weatherData"))
    let box = document.getElementById("alertsBox")
    box.innerHTML = ""

    if (!data) {
        box.innerHTML = "Search a location on the home page first."
        return
    }

    fetch("/api/alerts?lat=" + data.latitude + "&lon=" + data.longitude)
    .then(res => res.json())
    .then(alertData => {
        if (!alertData.features || alertData.features.length == 0) {
            box.innerHTML = "No active alerts for this location."
            return
        }

        for (let i = 0; i < alertData.features.length; i++) {
            let item = alertData.features[i].properties

            box.innerHTML += `
                <div class="alertCard">
                    <h2>${item.headline}</h2>
                    <p><b>Severity:</b> ${item.severity}</p>
                    <p><b>Issued:</b> ${item.sent}</p>
                    <p><b>Effective:</b> ${item.effective}</p>
                    <p><b>Ends:</b> ${item.ends}</p>
                    <p>${item.description}</p>
                </div>
            `
        }
    })
}