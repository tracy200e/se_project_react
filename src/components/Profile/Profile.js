import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ onSelectedCard, onCreateModal, clothingItems }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        onSelectedCard={onSelectedCard}
        clothingItems={clothingItems}
        onCreateModal={onCreateModal}
      />
    </div>
  );
}

export default Profile;
