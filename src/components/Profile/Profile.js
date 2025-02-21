import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

const Profile = ({
  onSelectedCard,
  onCreateModal,
  clothingItems,
  onCardLike,
  handleLogOut,
  openEditModal,
}) => {
  return (
    <div className="profile">
      <SideBar handleLogOut={handleLogOut} openEditModal={openEditModal} />
      <ClothesSection
        onSelectedCard={onSelectedCard}
        clothingItems={clothingItems}
        onCreateModal={onCreateModal}
        onCardLike={onCardLike}
      />
    </div>
  );
};

export default Profile;
