import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, deleteItem }) => {
  const handleDeleteItem = () => {
    deleteItem(selectedCard._id)
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        >
        </button>
        <div className="modal__image-container">
          <img
            className="modal__image"
            src={selectedCard.imageUrl}
            alt={selectedCard.name}
          />
        </div>
        <h3>{selectedCard.name}</h3>
        <button
          type="button"
          onClick={handleDeleteItem}
        >
          Delete item
        </button>
        <div>Weather type: {selectedCard.weather}</div>
      </div>
    </div>
  );
};

export default ItemModal;
