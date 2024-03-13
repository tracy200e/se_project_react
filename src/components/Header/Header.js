import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useState, useEffect } from "react";
import { getForecastWeather } from "../../utils/weatherApi";

const Header = ({ onCreateModal }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentCity, setCurrentCity] = useState("");

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const options = {
        month: "long",
        day: "numeric",
      };

      return date.toLocaleDateString(undefined, options);
    };

    navigator.geolocation.getCurrentPosition((position) => {
      getForecastWeather()
        .then((data) => {
          setCurrentCity(data.name);
        })
        .catch((error) => console.error(`Error fetching city: ${error.status}`));
    });

    setCurrentDate(getCurrentDate());
    setCurrentCity();
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
          {currentDate}, {currentCity}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        </div>
        <Link to="/profile">Name</Link>
        <div>
          <img src={avatar} alt="profile-pic" />
        </div>
      </div>
    </header>
  );
};

export default Header;
