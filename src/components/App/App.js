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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    avatar: "",
    _id: "",
  });
  const history = useHistory();

  const handleRegistration = ({ email, password, name, avatar }) => {
    return auth
      .signUp({ email, password, name, avatar })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    return auth
      .signIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        checkToken();
        console.log(data);
        history.push("/profile");
        handleCloseModal();
      })
      .catch(console.error);
  };

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkUserToken(jwt).then((res) => {
        if (res) {
          setCurrentUser(res);
          setIsLoggedIn(true);
        }
      });
    }
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
      .then(({ data }) => {
        setClothingItems([data, ...clothingItems]);
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
    checkToken();

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app_page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onCreateModal={() => handleOpenModal("create")}
            openRegisterModal={() => handleOpenModal("register")}
            openLoginModal={() => handleOpenModal("login")}
            city={currentCity}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
          <Main
            weatherTemp={temp}
            onSelectedCard={handleSelectedCard}
            clothingItems={clothingItems}
          />
          <Switch>
            <Route path="/signup">
              <RegisterModal
                handleRegistration={handleRegistration}
                handleCloseModal={handleCloseModal}
              />
            </Route>
            <Route path="/signin">
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
                userData={currentUser}
              />
            </ProtectedRoute>
            <Route path="/" exact={true}></Route>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
