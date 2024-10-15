import "./ItemModal.css";
import { Modal } from "../Modal/Modal";

const ItemModal = ({ selectedCard, onClose, deleteItem, currentUser }) => {
  const handleDeleteItem = () => {
    deleteItem(selectedCard._id);
  };
  const isOwn = selectedCard.owner === currentUser._id;
  const itemDeleteClassName = `modal-item__delete-button ${
    isOwn
      ? "modal-item__delete-button_visible"
      : "modal-item__delete-button_hidden"
  }`;

  return (
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
          className={itemDeleteClassName}
          type="button"
          onClick={handleDeleteItem}
        >
          Delete item
        </button>
      </div>
      <div>Weather type: {selectedCard.weather}</div>
    </Modal>
  );
};

export default ItemModal;
