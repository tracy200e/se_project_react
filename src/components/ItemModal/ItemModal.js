const ItemModal = ({ selectedCard, onClose, deleteItem }) => {
  console.log("item modal");

  const handleDeleteItem = () => {
    deleteItem(selectedCard._id)
  }

  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        >
        </button>
        <img src={selectedCard.link} alt={selectedCard.name} />
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
