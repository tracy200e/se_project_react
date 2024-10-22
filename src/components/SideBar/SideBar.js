import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const SideBar = ({ handleLogOut, openEditModal }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div>
      <div className="side-bar">
        <div className="side-bar__profile">
          <img
            className="side-bar__profile-avatar"
            src={currentUser.avatar}
            alt="profile-pic"
          />
          <div>{currentUser.name}</div>
        </div>
        <div className="side-bar__menu">
          <div className="side-bar__menu-button" onClick={openEditModal}>
            Change profile data
          </div>
          <div className="side-bar__menu-button" onClick={handleLogOut}>
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
