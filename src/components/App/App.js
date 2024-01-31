import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, context } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  }

  useEffect(() => {
    getForecastWeather().then((data) => {
      const temperature = parseWeatherData(data);
      console.log(temperature);
      setTemp(temperature);
    })
    .catch(error => {
      console.error(`Error: ${error.status}`);
    });
  }, []);

  console.log(currentTemperatureUnit);

  return (
    <div>
      <div className="app_page">
        <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
        <Header onCreateModal={handleCreateModal} />

        <Switch>
          <Route exact path="/">
              <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
          </Route>
          <Route path="/profile">
              Profile
          </Route>
        </Switch>

        <Footer />
        {activeModal === "create" && (
          <ModalWithForm title="New Garment" onClose={handleCloseModal}>
            <div className="form__input">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  minLength="1"
                  maxLength="30"
                  className="form__text-input"
                  placeholder="Name"
                />
              </label>
            </div>
            <div className="form__input">
              <label>
                Image
                <input
                  type="url"
                  name="link"
                  minLength="1"
                  maxLength="30"
                  className="form__text-input"
                  placeholder="Image"
                />
              </label>
            </div>
            <div className="form__input">
              <p>Select the weather type:</p>
              <div>
                <div>
                  <label>
                    <input name="weatherType" type="radio" id="hot" value="hot" />
                    Hot
                  </label>
                </div>
                <div>
                  <label>
                    <input name="weatherType" type="radio" id="warm" value="warm" />
                    Warm
                  </label>
                </div>
                <div>
                  <label>
                    <input name="weatherType" type="radio" id="cold" value="cold" />
                    Cold
                  </label>
                </div>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
