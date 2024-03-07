"use strict";

class Subject {
    constructor() {
        this.handlers = [];
    }
    subscribe(func) {
        this.handlers.push(func);
    }
    unsubscribe() {
        this.handlers = this.handlers.filter(item => item !== func);
    }
    publish(msg, obj) {
        let scope = obj || window
        for (let f of this.handlers) {
            f(scope, msg)
        }
    }
}

class WeatherEventModel extends Subject {
    constructor() {
        super()
        this.weatherData = null;
        this.eventData = null;

    }
    async getCityLatLong(cityName) {
        const apiKey = "5/dfTc4LqvH/7iqxYUx0tQ==bXmRHMXt8K3nEM2f";
        const cityResponse = await fetch(`https://api.api-ninjas.com/v1/city?name=${cityName}`, {
            method: "GET",
            headers: {
                "X-Api-Key": apiKey,
                "Content-Type": "application/json",
            },
        });

        if (cityResponse.ok) {
            const data = await cityResponse.json();

            if (data && data[0] && data[0].latitude && data[0].longitude) {
                const lat = data[0].latitude;
                const lon = data[0].longitude;
                return { lat, lon };
            } else {
                view.displayNotFound()
            }
        } else {
            throw new Error('Failed to fetch city data.');
        }
    }


    async getWeatherData(lat, lon) {

        const apiKey = "5/dfTc4LqvH/7iqxYUx0tQ==bXmRHMXt8K3nEM2f";
        const response = await fetch(`https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    }

    async getEventData(lat, lon) {
        const client_id = 'Mzc1NTEzODZ8MTY5NzM5NzAxMi4zMTE3OTI5+';
        const range = '100km';
        const perPage = 4;

        const response = await fetch(`https://api.seatgeek.com/2/events?lat=${lat}&lon=${lon}&range=${range}&client_id=${client_id}&per_page=${perPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json()
    }
}


