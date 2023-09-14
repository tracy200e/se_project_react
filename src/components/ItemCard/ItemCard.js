import "./ItemCard.css";
import likeButton from "../../images/like.svg";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card">
      <img
        key={item.id}
        src={item.link}
        className="card_image"
        onClick={() => onSelectCard(item)}
        alt={item.name}
      />
      <div className="card_title">
        <h3 className="card_name">{item.name}</h3>
        <img src={likeButton} className="card_like" alt="like button" />
      </div>
    </div>
  );
};

export default ItemCard;
