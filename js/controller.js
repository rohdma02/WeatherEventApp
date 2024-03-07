"use strict";

class WeatherEventController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async showInfo(cityName) {

        const cityNameWeather = document.getElementById('cityNameWeather');
        const cityNameEvent = document.getElementById('cityNameEvent');
        cityNameWeather.textContent = `Today weather in ${cityName}`;
        cityNameEvent.textContent = `Today events near ${cityName}`;

        try {
            const coordinates = await this.model.getCityLatLong(cityName);

            if (!coordinates.lat) {
                return;
            } else {
                const { lat, lon } = coordinates;
                let savedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
                if (!savedCities.includes(cityName)) {
                    savedCities.push(cityName);
                    localStorage.setItem('searchedCities', JSON.stringify(savedCities));
                }

                const savedCityData = JSON.parse(localStorage.getItem(cityName));
                if (savedCityData && savedCityData.weather) {
                    this.view.displayWeather(savedCityData.weather);
                    if (savedCityData.events) {
                        this.view.displayEvent(savedCityData.events);
                    }
                } else {
                    const weatherData = await this.model.getWeatherData(lat, lon);
                    const eventData = await this.model.getEventData(lat, lon);
                    const cityData = {
                        weather: weatherData,
                        events: eventData,
                    };
                    localStorage.setItem(cityName, JSON.stringify(cityData));
                    this.view.displayWeather(weatherData);
                    this.view.displayEvent(eventData);

                }
            }

            this.view.displaySavedCities();
        } catch (error) {
            return;
        }

    }

    saveSearchedCity(cityName, weatherData, eventData) {
        let savedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
        savedCities.push(cityName); 
        localStorage.setItem('searchedCities', JSON.stringify(savedCities));

        const weatherDataObject = {
            temp: weatherData.temp,
            max_temp: weatherData.max_temp,
            min_temp: weatherData.min_temp,
            feels_like: weatherData.feels_like,
            humidity: weatherData.humidity,
            wind_speed: weatherData.wind_speed,
        };
        const eventDataObject = {
            city: cityName,
            events: eventData,
        };

        localStorage.setItem(cityName + '-weather', JSON.stringify(weatherDataObject));
        localStorage.setItem(cityName + '-events', JSON.stringify(eventDataObject));
    }

    showSavedCityInfo(cityName) {
        const cityData = JSON.parse(localStorage.getItem(cityName));
        if (cityData) {
            this.view.displayWeather(cityData.weather);
            this.view.displayEvent(cityData.events);

            const cityWeatherData = JSON.parse(localStorage.getItem(cityName + '-weather'));
            if (cityWeatherData) {
                this.view.displayWeather(cityWeatherData);
            }
        }
    }

    removeCity(cityName) {
        this.view.displayInitial();
        const cityNameWeather = document.getElementById('cityNameWeather');
        const cityNameEvent = document.getElementById('cityNameEvent');
        cityNameWeather.textContent = `Today weather`;
        cityNameEvent.textContent = `Today events`;
        let savedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
        const updatedCities = savedCities.filter(city => city !== cityName);

        if (updatedCities.length === 0) {
            localStorage.removeItem('searchedCities');
        } else {
            localStorage.setItem('searchedCities', JSON.stringify(updatedCities));
        }

        localStorage.removeItem(cityName);
        localStorage.removeItem(cityName + '-weather');
        localStorage.removeItem(cityName + '-events');
        this.view.displaySavedCities();
    }

    removeAll() {
        localStorage.clear()
        const cityNameWeather = document.getElementById('cityNameWeather');
        const cityNameEvent = document.getElementById('cityNameEvent');
        cityNameWeather.textContent = `Today weather`;
        cityNameEvent.textContent = `Today events`;
        this.view.displayInitial();
        this.view.displaySavedCities();
    }
}

const model = new WeatherEventModel();
const view = new WeatherEventView();
const controller = new WeatherEventController(model, view);
const searchButton = document.getElementById('fetchData');
const cityNameInput = document.getElementById('cityName');
searchButton.addEventListener('click', () => {
    if (!cityNameInput.checkValidity()) {
        cityNameInput.reportValidity();
    } else {
        const cityNameSplitted = cityNameInput.value.split(' ');
        const formattedCityName = cityNameSplitted.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
        controller.showInfo(formattedCityName);
        cityNameInput.value = '';

    }
});


window.onload = () => {
    controller.view.displaySavedCities();
};
