import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useState, useEffect, context } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleCreateModal = () => {
    setActiveModal("create");
  }

  const handleCloseModal = () => {
    setActiveModal("");
  }

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleAddItemSubmit = (item) => {
    setClothingItems([item, ...clothingItems]);
  }

  const handleDeleteItem = () => {
    setClothingItems(clothingItems => clothingItems.filter((clothingItem, index) => index !== index));
    handleCloseModal();
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

  useEffect(() => {
    getForecastWeather()
    .then((data) => {
      const temperature = parseWeatherData(data);
      setTemp(temperature);
    })
    .catch(error => {
      console.error(`Error: ${error.status}`);
    });
  }, []);

  return (
    <div>
      <div className="app_page">
        <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
        <Header onCreateModal={handleCreateModal} />

        <Switch>
          <Route exact path="/">
              <Main 
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
              />
          </Route>
          <Route path="/profile">
              Profile
          </Route>
        </Switch>

        <Footer />
        {activeModal === "create" && (
        <AddItemModal 
        handleCloseModal={handleCloseModal} 
        isOpen={activeModal === "create"} 
        onAddItem={handleAddItemSubmit}
        />
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} deleteItem={handleDeleteItem}/>
        )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;