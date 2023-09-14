import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

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

  useEffect(() => {
    getForecastWeather().then((data) => {
      const temperature = parseWeatherData(data);
      console.log(temperature);
      setTemp(temperature);
    });
  }, []);

  console.log(temp);

  return (
    <div>
      <div className="app_page">
        <Header onCreateModal={handleCreateModal} />
        <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
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
                  <input type="radio" id="hot" value="hot" />
                  <label> Hot</label>
                </div>
                <div>
                  <input type="radio" id="warm" value="warm" />
                  <label> Warm</label>
                </div>
                <div>
                  <input type="radio" id="cold" value="cold" />
                  <label> Cold</label>
                </div>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default App;
