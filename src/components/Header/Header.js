import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useEffect, useContext } from "react";

const Header = ({ onCreateModal, openRegisterModal, openLoginModal, city }) => {
  const userData = useContext(CurrentUserContext);
  const [currentDate, setCurrentDate] = useState("");
  const history = useHistory();

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
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button
            className="header__button"
            type="text"
            onClick={openRegisterModal}
          >
            Sign Up
          </button>
        </div>
        <div>
          <button
            className="header__button"
            type="text"
            onClick={openLoginModal}
          >
            Log In
          </button>
        </div>
        <div>
          <button className="header__button" type="text" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        </div>
        <Link to="/profile">{userData.name}</Link>
        <div>
          <img src={avatar} alt="profile-pic" />
        </div>
      </div>
    </header>
  );
};

export default Header;
