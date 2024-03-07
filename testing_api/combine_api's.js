const client_id = 'Mzc1NTEzODZ8MTY5NzM5NzAxMi4zMTE3OTI5+';
const cityName = 'London';
const apiKey1 = '5/dfTc4LqvH/7iqxYUx0tQ==bXmRHMXt8K3nEM2f'; // Replace with your first API key
const apiKey2 = '5/dfTc4LqvH/7iqxYUx0tQ==bXmRHMXt8K3nEM2f'; // Replace with your second API key
const range = '100km';
const perPage = 1;

// 1. Fetch City Information
fetch(`https://api.api-ninjas.com/v1/city?name=${cityName}`, {
  method: 'GET',
  headers: {
    'X-Api-Key': apiKey1,
    'Content-Type': 'application/json',
  },
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error getting city data: ${response.status}`);
    }
  })
  .then(cityData => {
    // Extract latitude and longitude from the city API response
    const latitude = cityData[0].latitude;
    const longitude = cityData[0].longitude;

    // 2. Fetch Weather Information
    return fetch(`https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey2,
        'Content-Type': 'application/json',
      },
    })
      .then(weatherResponse => {
        if (weatherResponse.ok) {
          return weatherResponse.json();
        } else {
          throw new Error(`Error getting weather data: ${weatherResponse.status}`);
        }
      })
      .then(weatherData => {
        // 3. Fetch Event Information
        return fetch(`https://api.seatgeek.com/2/events?lat=${latitude}&lon=${longitude}&client_id=${client_id}&per_page=${perPage}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(eventResponse => {
            if (eventResponse.ok) {
              return eventResponse.json();
            } else {
              throw new Error(`Error getting event data: ${eventResponse.status}`);
            }
          })
          .then(eventData => {
            // Display City Information
            console.log('City Data: Decorah', cityData);

            // Display Weather Information
            console.log('Weather Data: Decorah', weatherData);

            // Display Event Information
            console.log('Event Data', eventData);
          })
          .catch(eventError => {
            console.error(eventError.message);
          });
      })
      .catch(weatherError => {
        console.error(weatherError.message);
      });
  })
  .catch(cityError => {
    console.error(cityError.message);
  });