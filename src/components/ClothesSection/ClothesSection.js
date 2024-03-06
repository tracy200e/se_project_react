import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ onSelectedCard, onCreateModal, clothingItems }) => {
    
    return (
        <div>
            <div className="clothes__section_header">
                <div>Your items</div>
                <div>
                    <button
                        className="clothes__card_button"
                        type="text"
                        onClick={onCreateModal}
                    >
                        + Add Clothes
                    </button>
                </div>
            </div>
            <section className="clothes__card_section">
                {clothingItems.map((clothingItem) => (
                <ItemCard 
                key={clothingItem._id}
                clothingItem={clothingItem}
                onSelectedCard={onSelectedCard}
                />
            ))}
            </section>
        </div>
    )
}

export default ClothesSection;