const client_id = 'Mzc1NTEzODZ8MTY5NzM5NzAxMi4zMTE3OTI5+';
const latitude = 43.3015; // Replace with the desired latitude
const longitude = -91.7844; // Replace with the desired longitude
const range = '100km';
const perPage = 1;

fetch(`https://api.seatgeek.com/2/events?lat=${latitude}&lon=${longitude}&range=${range}&client_id=${client_id}&per_page=${perPage}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
