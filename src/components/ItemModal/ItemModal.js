import "./ItemModal.css";
import { Modal } from "../Modal/Modal";

const ItemModal = ({ selectedCard, onClose, deleteItem }) => {
  const handleDeleteItem = () => {
    deleteItem(selectedCard._id)
  }

  return (
    <div>
      <Modal onClose={onClose}>
        <div className="modal__image-container">
            <img
              className="modal__image"
              src={selectedCard.imageUrl}
              alt={selectedCard.name}
            />
          </div>
          <div className="modal__header">
            <h3>{selectedCard.name}</h3>
            <button
              className="modal__delete-button"
              type="button"
              onClick={handleDeleteItem}
            >
              Delete item
            </button>
          </div>
          <div>Weather type: {selectedCard.weather}</div>
      </Modal>
    </div>
  );
};

export default ItemModal;
