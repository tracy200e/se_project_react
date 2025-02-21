import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ClothesSection = ({
  onSelectedCard,
  onCreateModal,
  clothingItems,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <div>Your items</div>
        <div>
          <button
            className="clothes-section__card-button"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        </div>
      </div>
      {clothingItems.length && currentUser && currentUser._id ? (
        <section className="clothes-section_cards">
          {clothingItems.map((clothingItem) =>
            clothingItem.owner === currentUser._id ? (
              <ItemCard
                key={clothingItem._id}
                clothingItem={clothingItem}
                onSelectedCard={onSelectedCard}
                onCardLike={onCardLike}
              />
            ) : null
          )}
        </section>
      ) : (
        <div>There are no items yet! Add new ones now.</div>
      )}
    </div>
  );
};

export default ClothesSection;
