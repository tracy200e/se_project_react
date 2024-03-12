import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo, useContext } from "react";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectedCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;
  const weatherType = useMemo(() => {
    if (temp === undefined) { return 'OW!'}
    if (currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp <= 85) {
        return "warm";
      } else if (temp <= 65) {
        return "cold";
      }
    } else if (currentTemperatureUnit === "C") {
        if (temp >= 30) {
          return "hot";
        } else if (temp >= 19 && temp <= 29) {
          return "warm";
        } else if (temp <= 18) {
          return "cold";
        }
      }
  }, [temp]);

  const filteredCards = clothingItems.filter((clothingItem) => {
    return clothingItem.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type="sunny" weatherTemp={temp} currentTemperatureUnit={currentTemperatureUnit} />
      <section className="card_section" id="card-section">
        Today is {temp} °{currentTemperatureUnit} / You may want to wear:
        <div className="card_items">
          {filteredCards.map((clothingItem) => (
            <ItemCard 
              key={clothingItem._id} 
              clothingItem={clothingItem} 
              onSelectedCard={onSelectedCard}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;