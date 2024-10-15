import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  onSelectedCard,
  onCreateModal,
  clothingItems,
  currentUser,
}) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        onSelectedCard={onSelectedCard}
        clothingItems={clothingItems}
        onCreateModal={onCreateModal}
        currentUser={currentUser}
      />
    </div>
  );
}

export default Profile;
