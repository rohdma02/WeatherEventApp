const apiKey = "5/dfTc4LqvH/7iqxYUx0tQ==bXmRHMXt8K3nEM2f";
const cityName = "Decorah";

fetch(`https://api.api-ninjas.com/v1/city?name=${cityName}`, {
  method: 'GET',
  headers: {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(function (responseCoordinates) {
    const data = responseCoordinates;
    const lat = data[0].latitude;
    const lon = data[0].longitude;
    console.log(lat + " " + lon);
  })
  .catch(error => console.error(error)); // Add error handling here
