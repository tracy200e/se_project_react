import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import { addItems, getItems, deleteItems } from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState("");

  const handleOpenModal = (modalType) => {
    setActiveModal(modalType)
  }

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSwitch = () => {
    activeModal === "login"
    ? setActiveModal("register")
    : setActiveModal("login");
  }

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItemSubmit = (item) => {
    setIsLoading(true);
    addItems(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(`Unable to add clothing item due to: ${error.status}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteItem = (_id) => {
    deleteItems(_id)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((clothingItem) => clothingItem._id !== _id)
        );
        handleCloseModal();
      })
      .catch((error) => console.error(`Error: ${error.status}`));
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        setCurrentCity(data.name);
      })
      .catch((error) => console.error(`Error: ${error.status}`));

    getItems()
      .then((item) => {
        setClothingItems(item);
      })  
      .catch((error) => console.error(`Error: ${error.status}`));
  }, []);

  return (
    <div className="app_page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header 
          onCreateModal={() => handleOpenModal("create")}
          registerModal={() => handleOpenModal("register")}
          loginModal={() => handleOpenModal("login")}
          city={currentCity}
        />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectedCard={(handleSelectedCard)}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <Profile
              onSelectedCard={handleSelectedCard}
              onCreateModal={() => handleOpenModal("create")}
              clothingItems={clothingItems}
            />
          </Route>
        </Switch>
        <Footer />

        {activeModal === "register" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "register"}
            switchToLogin={handleSwitch}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "login"}
            switchToRegister={handleSwitch}
          />
        )}
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={handleAddItemSubmit}
            buttonText={isLoading ? "Adding Garment..." : "Saved"}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            deleteItem={handleDeleteItem}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;