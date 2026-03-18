const tomorrowTemp = document.querySelector('#tomTemp');
const dayAfterTemp = document.querySelector('#dayAfterTemp');

const tomorrow = document.querySelector('#tomorrow');
const dayAfter = document.querySelector('#dayAfter');

const key = "6dae3c6e1013f342fa9f2f8a6c207d66";
const lat = "33.29";
const long = "-96.59";

const forecastURL = `//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=imperial`;

async function forecastFetch() {
  try {
    const response = await fetch(forecastURL);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data); 
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayForecast(data) {
    const twoDayForecast = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")).slice(0, 2);
    console.log(twoDayForecast);

    tomorrowTemp.innerHTML = `${twoDayForecast[0].main.temp_max}&deg;F`;
    dayAfterTemp.innerHTML = `${twoDayForecast[1].main.temp_max}&deg;F`;

    tomorrow.innerHTML = new Date(twoDayForecast[0].dt_txt).toLocaleDateString([], {weekday: "long"});

    dayAfter.innerHTML = new Date(twoDayForecast[1].dt_txt).toLocaleDateString([], {weekday: "long"});

}



forecastFetch();