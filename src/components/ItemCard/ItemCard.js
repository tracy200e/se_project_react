import "./ItemCard.css";
import likeButton from "../../images/like.svg";

const ItemCard = ({ clothingItem, onSelectedCard }) => {
  return (
    <div className="card">
      <img
        className="card__image"
        src={clothingItem.imageUrl}
        onClick={() => onSelectedCard(clothingItem)}
        alt={clothingItem.name}
      />
      <div className="card__title">
        <h3 className="card__name">{clothingItem.name}</h3>
        <img src={likeButton} className="card__like" alt="like button" />
      </div>
    </div>
  );
};

export default ItemCard;
