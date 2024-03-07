"use strict";

class WeatherEventView {
    constructor() {
        this.weatherDetails = document.querySelector('.details');
        this.eventDetails = document.querySelector('.table.table-striped.table-primary tbody');
    }

    displayInitial() {
        this.weatherDetails.innerHTML = ``;
        this.eventDetails.innerHTML = ``;
    }

    displayNotFound() {
        this.weatherDetails.innerHTML = `<h3>City not found or city doesn't exist</h3>`;
        this.eventDetails.innerHTML = ``;
    }

    displayWeather(weatherData) {
        this.weatherDetails.innerHTML = `
        <p>Temperature: ${weatherData.temp} &degC</p>
        <p>Max Temperature: ${weatherData.max_temp}</p>
        <p>Min Temperature: ${weatherData.min_temp}</p>
        <p>Feels like: ${weatherData.feels_like}</p>
        <p>Humidity: ${weatherData.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind_speed} m/s</p>
        <!-- Add more weather details as needed -->    
    `;
    }

    displayEvent(eventData) {
        const eventsTable = document.querySelector('.table.table-striped.table-primary tbody');
        // const eventsTableInfo = document.getElementById('tableEvents');
        eventsTable.innerHTML = '';

        eventData.events.forEach((event) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${event.venue.city}, ${event.venue.state}</td>
                <td>${event.title}</td>
                <td><a href="${event.url}" target="_blank">Event Link</a></td>
            `;
            eventsTable.appendChild(row);
        });
    }

    displaySavedCities() {

        const savedCitiesTable = document.getElementById('historyTable');
        savedCitiesTable.innerHTML = '';
        const savedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];

        savedCities.forEach((city, index) => {
            const cityWeatherData = JSON.parse(localStorage.getItem(city));
            const temperature = cityWeatherData ? cityWeatherData.weather.temp : 'N/A';

            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${city}</td>
                <td>${temperature} &deg;C</td>
                <td>
                    <button type="button" class="btn btn-primary" id="infoBtn" onclick="controller.showInfo('${city}')">Full Info</button>
                    <button type="button" class="btn btn-danger" id="removeBtn" onclick="controller.removeCity('${city}')">Delete</button>
                </td>
            `;
            savedCitiesTable.appendChild(row);
            row.querySelector(".btn-primary").addEventListener("click", () => {
                controller.showSavedCityInfo(city);
            });
        });
    }






}