import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { useState, useEffect, context } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import { addItems, getItems, deleteItems } from "../../utils/api";

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

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleAddItemSubmit = (item) => {
    addItems(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(`Unable to add clothing item due to: ${error.status}`);
      });
  };

  const handleDeleteItem = (_id) => {
    deleteItems(_id)
      .then(() => {
        setClothingItems(clothingItems => clothingItems.filter((clothingItem, index) => clothingItem._id !== index));
      })
      .catch((error) => console.error(`Error: ${error.status}`));
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
    .catch((error) => console.error(`Error: ${error.status}`));
  }, []);

  useEffect(() => {
    getItems()
    .then((item) => {
      setClothingItems(item);
    })
    .catch((error) => console.error(`Error: ${error.status}`));
  }, []);

  return (
    <div className="app_page">
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
      <Header onCreateModal={handleCreateModal} />

      <Switch>
        <Route exact path="/">
            <Main 
              weatherTemp={temp}
              onSelectedCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
        </Route>
        <Route path="/profile">
            <Profile
              onSelectedCard={handleSelectedCard}
              onCreateModal={handleCreateModal}
              clothingItems={clothingItems}
            />
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
  );
}

export default App;