import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ onSelectedCard, onCreateModal, clothingItems }) => {
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
      <section className="clothes-section_cards">
        {clothingItems.map((clothingItem) => (
          <ItemCard
            key={clothingItem._id}
            clothingItem={clothingItem}
            onSelectedCard={onSelectedCard}
          />
        ))}
      </section>
    </div>
  );
};

export default ClothesSection;
