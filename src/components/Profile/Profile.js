import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Profile = ({
  onSelectedCard,
  onCreateModal,
  clothingItems,
  onCardLike,
  handleLogOut,
  openEditModal,
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="profile">
      <SideBar handleLogOut={handleLogOut} openEditModal={openEditModal} />
      <ClothesSection
        onSelectedCard={onSelectedCard}
        clothingItems={clothingItems}
        onCreateModal={onCreateModal}
        currentUser={currentUser}
        onCardLike={onCardLike}
      />
    </div>
  );
};

export default Profile;
