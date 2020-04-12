console.log('client side js loaded')

const form = document.querySelector('form');
const input = document.querySelector('input');
const warning = document.querySelector('.warning');
const queryLocation = document.querySelector('.query-location');
const queryForecast = document.querySelector('.query-forecast');

const fetchAddress = (url) => {

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return warning.textContent = data.error;
      }
      warning.textContent = '';
      queryLocation.textContent = data.location;
      queryForecast.textContent = data.forecast;
    })
  })

}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  warning.textContent = 'Loading...';
  queryLocation.textContent = '';
  queryForecast.textContent = '';
  const location = input.value;
  const url = `/weather/?address=${location}`;
  fetchAddress(url);
})