const apiKey = "5/dfTc4LqvH/7iqxYUx0tQ==bXmRHMXt8K3nEM2f"
const lat = ""
const lon = ""

fetch(`https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`, {
  method: 'GET',
  headers: {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json',
  },
})
    .then(response => response.json())
    .then(data => console.log(data))