import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp = "", currentTemperatureUnit}) => {
  const imageSource = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSourceUrl = imageSource[0].url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather_info">{weatherTemp} °{currentTemperatureUnit}</div>
      <img src={imageSourceUrl} className="weather_image" alt="weather" />
    </section>
  );
};

export default WeatherCard;
