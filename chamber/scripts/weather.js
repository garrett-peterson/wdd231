const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#condition');
const tempHigh = document.querySelector('#high');
const tempLow = document.querySelector('#low');
const humidity = document.querySelector('#humid');
const sunrise = document.querySelector('#rise');
const sunset = document.querySelector('#set');

const todayTemp = document.querySelector('#todayTemp');


const myKey = "6dae3c6e1013f342fa9f2f8a6c207d66";
const myLat = "33.29";
const myLong = "-96.59";

const url = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data); 
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayResults(data) {
    todayTemp.innerHTML = `${data.main.temp_max}&deg;F`;
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.setAttribute('src', iconsrc);
    captionDesc.textContent = `${desc}`;

    tempHigh.innerHTML = `${data.main.temp_max}&deg;`;
    tempLow.innerHTML = `${data.main.temp_min}&deg;`;
    humidity.textContent = data.main.humidity;

    sunrise.innerHTML = `${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
        })}`;
    sunset.innerHTML = `${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
        })}`;
}

apiFetch();