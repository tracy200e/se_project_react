import "./Header.css";
import Logo from "../../images/logo.svg";
import Avatar from "../../images/avatar.svg";

const Header = ({ onCreateModal }) => {
  console.log("Header");

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <div>Date</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        </div>
        <div>Name</div>
        <div>
          <img src={Avatar} alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
