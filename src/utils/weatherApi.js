// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
import { processServerResponse } from "./api";

const latitude = 44.34;
const longitude = 10.99;
const APIkey = "8f3e6016f778ab708b4e61e89e1d48e0";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then(processServerResponse)
    .catch((err) => {
      throw err;
    });

  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main?.temp;
  if (!temperature) {
    return null;
  }
  const weather = {
    temperature: {
      F: `${Math.round(temperature)}`,
      C: `${Math.round(((temperature - 32) * 5) / 9)}`,
    },
  };

  return weather;
};
