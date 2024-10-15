import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useState, useEffect } from "react";

const Header = ({
  onCreateModal,
  openRegisterModal,
  openLoginModal,
  city,
  isLoggedIn,
  currentUser,
}) => {
  const [currentDate, setCurrentDate] = useState("");
  const history = useHistory();
  const initial = currentUser.name
    ? Array.from(currentUser.name)[0].toUpperCase()
    : "";

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    history.push("/signin");
  };

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const options = {
        month: "long",
        day: "numeric",
      };

      return date.toLocaleDateString(undefined, options);
    };

    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          {currentDate}, {city}
        </div>
      </div>
      <div className="header__navigation">
        <ToggleSwitch />
        {isLoggedIn ? (
          <div className="header__navigation">
            <button
              className="header__button"
              type="text"
              onClick={handleLogOut}
            >
              Log Out
            </button>
            <button
              className="header__button"
              type="text"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
            <Link to="/profile">{currentUser.name}</Link>
            <div>
              {currentUser.avatar ? (
                <img
                  className="header__avatar-logo"
                  src={currentUser.avatar}
                  alt="avatar"
                />
              ) : (
                <div className="header__avatar-logo">{initial}</div>
              )}
            </div>
          </div>
        ) : (
          <div className="header__navigation">
            <button
              className="header__button"
              type="text"
              onClick={openRegisterModal}
            >
              Sign Up
            </button>
            <button
              className="header__button"
              type="text"
              onClick={openLoginModal}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
