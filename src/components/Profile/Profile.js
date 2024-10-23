import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onSelectedCard,
  onCreateModal,
  clothingItems,
  currentUser,
  onCardLike,
}) {
  return (
    <div>
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
