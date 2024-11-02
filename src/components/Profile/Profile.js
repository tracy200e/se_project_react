import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  onSelectedCard,
  onCreateModal,
  clothingItems,
  currentUser,
  onCardLike,
  handleLogOut,
  openEditModal,
}) {
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
}

export default Profile;
