import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route, Redirect } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import { addItems, getItems, deleteItems } from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (evt) => {
    evt.preventDefault();
    setIsLoggedIn({
      isLoggedIn: true,
    });
  };

  const handleOpenModal = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

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
          <Route path="/register">
            <RegisterModal handleCloseModal={handleCloseModal} />
          </Route>
          <Route path="/login">
            <LoginModal
              handleCloseModal={handleCloseModal}
              handleLogin={handleLogin}
            />
          </Route>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile">
            <Profile
              onSelectedCard={handleSelectedCard}
              onCreateModal={() => handleOpenModal("create")}
              clothingItems={clothingItems}
            />
          </ProtectedRoute>
          <Route path="/">
            {isLoggedIn ? <Redirect to="/profile" /> : <Redirect to="/login" />}
            <Main
              weatherTemp={temp}
              onSelectedCard={handleSelectedCard}
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
