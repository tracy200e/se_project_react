import "./ItemModal.css";
import { Modal } from "../Modal/Modal";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, deleteItem }) => {
  const currentUser = useContext(CurrentUserContext);
  const handleDeleteItem = () => {
    deleteItem(selectedCard._id);
  };
  const isOwnedByUser = selectedCard.owner === currentUser._id;
  const itemDeleteClassName = `modal-item__delete-button ${
    isOwnedByUser
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
