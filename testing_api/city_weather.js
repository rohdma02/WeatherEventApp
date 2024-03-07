const cityName = 'Decorah';
const apiKey1 = '5/dfTc4LqvH/7iqxYUx0tQ==bXmRHMXt8K3nEM2f';

let data; // Declare data in a higher scope

// First API URL
const firstApiUrl = `https://api.api-ninjas.com/v1/city?name=${cityName}`;

// Make a Fetch request to the first API
fetch(firstApiUrl, {
  method: 'GET',
  headers: {
    'X-Api-Key': apiKey1,
    'Content-Type': 'application/json',
  },
})
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error getting latitude and longitude: ${response.status}`);
    }
  })
  .then(function (responseData) {
    data = responseData; // Assign response data to the outer data variable
    // Extract latitude and longitude from the first API response
    const latitude = data[0].latitude;
    const longitude = data[0].longitude;

    // Second API URL
    const apiKey2 = '5/dfTc4LqvH/7iqxYUx0tQ==bXmRHMXt8K3nEM2f'; // Replace with your actual API key
    const secondApiUrl = `https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`;

    // Make a Fetch request to the second API
    return fetch(secondApiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey2,
        'Content-Type': 'application/json',
      },
    });
  })
  .then(function (weatherResponse) {
    if (weatherResponse.ok) {
      return weatherResponse.json();
    } else {
      throw new Error(`Error getting weather data: ${weatherResponse.status}`);
    }
  })
  .then(function (weatherData) {
    // Use Promise.all to ensure both API requests are complete before logging
    return Promise.all([data, weatherData]);
  })
  .then(function ([cityData, weatherData]) {
    console.log('City Data: Decorah', cityData);
    console.log('Weather Data: Decorah', weatherData);
  })
  .catch(function (error) {
    console.error(error.message);
  });
