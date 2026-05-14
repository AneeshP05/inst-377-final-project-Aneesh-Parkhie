# inst-377-final-project-Aneesh-Parkhie
Project Title: Weather Planner

Description:
Weather Planner is a web application that helps users view weather forecasts and weather alerts in one place. Users can search for a location by entering either a city name or geographic coordinates. The application displays the current temperature, weather conditions, and a ten day forecast for the selected location. Users can also navigate to a forecast details page to view hourly weather information such as hourly temperatures, precipitation probability, and wind speed. The application includes a chart created with Chart.js to help visualize hourly weather trends. Another page displays official weather alerts and advisories using data from the National Weather Service API. Users are also able to save favorite locations using a Supabase database so they can quickly revisit commonly searched locations later.

Target Browsers:
This application is designed primarily for desktop browsers. The application was tested mainly in Google Chrome and Microsoft Edge. The layout and styling should also function similarly on other modern desktop browsers.

Developer Manual:
This app uses Node.js with Express for the backend server. The backend communicates with the Open-Meteo Forecast API, the National Weather Service API, and a Supabase database. The frontend uses plain HTML, CSS, and JavaScript along with the Chart.js and Leaflet.js libraries.

To install the dependencies, open a terminal in the project folder and run:

npm install

After installing dependencies, start the server by running:

node server.js

The app will then run locally on:

http://localhost:3000

There are several API endpoints. The /api/weather endpoint retrieves forecast information from the Open-Meteo API based on a city name or geographic coordinates. The /api/alerts endpoint retrieves active weather alerts from the National Weather Service API. The /api/favorites GET endpoint retrieves saved locations from the Supabase database, while the /api/favorites POST endpoint stores a new favorite location in the database.

The frontend communicates with all data sources through the backend using Fetch API requests. The Home page loads current weather and ten day forecast information. The Forecast Details page displays hourly forecast data and weather charts. The Alerts page loads active weather alerts for the selected location. The Favorites page retrieves saved locations from the database and allows users to reload weather information for those saved locations.

Some known issues are that the National Weather Service API may sometimes return no alerts if there are no active warnings for the selected location and occasionally, API requests may fail if a location is entered incorrectly or if external APIs are temporarily unavailable. The current version of the application also does not include user authentication or mobile-specific styling.

Possible future improvements for the project include adding user login functionality, improving the styling and responsiveness of the interface, adding weather icons and better condition descriptions, and allowing users to delete saved favorite locations.
