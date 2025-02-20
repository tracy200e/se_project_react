import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { useState, useEffect, useCallback } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route, useHistory } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  addItems,
  getItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      })
      .catch(console.error);
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(() => handleCloseModal())
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    handleSubmit(() => {
      return auth
        .editUserProfile({ name, avatar }, token)
        .then((updatedUser) => {
          setCurrentUser(updatedUser);
        });
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/");
  };

  const checkToken = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkUserToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setIsLoggedIn(true);
            handleCloseModal("/profile");
          }
          setIsLoading(false);
        })
        .catch(() => console.log("Not Authorised"));
    } else {
      setIsLoading(false);
    }
  }, [history]);

  const handleOpenModal = (modalType, url) => {
    setActiveModal(modalType);
    history.push(url);
  };

  const handleCloseModal = (url) => {
    setActiveModal("");
    history.push(url);
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
    console.log(card);
  };

  const handleAddItemSubmit = (item) => {
    handleSubmit(() =>
      addItems(item).then(({ data }) => {
        setClothingItems([data, ...clothingItems]);
      })
    );
  };

  const handleDeleteItem = (_id) => {
    deleteItems(_id)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((clothingItem) => clothingItem._id !== _id)
        );
      })
      .then(() => handleCloseModal())
      .catch((error) => console.error(`Error: ${error.status}`));
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardLike = ({ _id }, isLiked, setIsLiked) => {
    const token = localStorage.getItem("jwt");
    if (isLiked) {
      addCardLike(_id, token, isLiked, setIsLiked)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((card) => (card.id === _id ? updatedCard.data : card))
          );
          console.log(updatedCard);
        })
        .catch(console.error);
    } else {
      removeCardLike(_id, token, isLiked, setIsLiked)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((card) => (card.id === _id ? updatedCard.data : card))
          );
          console.log(updatedCard);
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    checkToken();

    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        setCurrentCity(data.name);
      })
      .catch(console.error);

    getItems()
      .then((item) => {
        setClothingItems(item);
      })
      .catch(console.error);
  }, [checkToken]);

  if (isLoading) return null;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app_page">
          <Header
            onCreateModal={() => handleOpenModal("create")}
            openRegisterModal={() => handleOpenModal("register")}
            openLoginModal={() => handleOpenModal("login")}
            city={currentCity}
            isLoggedIn={isLoggedIn}
          />
          <Switch>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile">
              <div className="profile-page">
                <Profile
                  onSelectedCard={handleSelectedCard}
                  onCreateModal={() => handleOpenModal("create")}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                  handleLogOut={handleLogOut}
                  openEditModal={() =>
                    handleOpenModal("update", "/profile/edit")
                  }
                />
              </div>
            </ProtectedRoute>
            <Route path="/" exact={true}>
              <Main
                weatherTemp={temp}
                onSelectedCard={handleSelectedCard}
                clothingItems={clothingItems}
                onCardLike={handleCardLike}
              />
            </Route>
          </Switch>
          <Footer />

          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={() => handleCloseModal()}
              isOpen={activeModal === "create"}
              onAddItem={handleAddItemSubmit}
              buttonText={isLoading ? "Adding Garment..." : "Saved"}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={() => handleCloseModal()}
              deleteItem={handleDeleteItem}
            />
          )}
          {activeModal === "update" && (
            <EditProfileModal
              onClose={() => handleCloseModal("/profile")}
              handleEditProfile={handleEditProfile}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              handleRegistration={handleRegistration}
              activeModal={activeModal}
              handleCloseModal={() => handleCloseModal("/")}
              handleTextButton={() => setActiveModal("login")}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleCloseModal={() => handleCloseModal("/")}
              activeModal={activeModal}
              handleLogin={handleLogin}
              handleTextButton={() => setActiveModal("register")}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
