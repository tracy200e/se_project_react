import "./ItemCard.css";
import likeButton from "../../images/like.svg";

const ItemCard = ({ clothingItem, onSelectedCard }) => {
  console.log("Item Card", clothingItem.imageUrl)
  return (
    <div className="card">
      <img
        src={clothingItem.imageUrl}
        className="card_image"
        onClick={() => onSelectedCard(clothingItem)}
        alt={clothingItem.name}
      />
      <div className="card_title">
        <h3 className="card_name">{clothingItem.name}</h3>
        <img src={likeButton} className="card_like" alt="like button" />
      </div>
    </div>
  );
};

export default ItemCard;
