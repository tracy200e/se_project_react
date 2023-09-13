import "./ItemCard.css";
import likeButton from "../../images/like.svg";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div className="card">
        <img
          src={item.link}
          className="card_image"
          onClick={() => onSelectCard(item)}
          alt="suggestion card"
        />
        <div className="card_title">
          <div className="card_name">{item.name}</div>
          <img src={likeButton} className="card_like" alt="like button" />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
