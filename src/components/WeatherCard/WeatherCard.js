import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  console.log("weather card");

  const imageSource = weatherOptions.filter((i) => {
    console.log(i);
    return i.day === day && i.type === type;
  });

  console.log(imageSource);
  console.log(imageSource[0].url);

  const imageSourceUrl = imageSource[0].url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather_info">{weatherTemp} °F</div>
      <img src={imageSourceUrl} className="weather_image" alt="weather" />
    </section>
  );
};

export default WeatherCard;
