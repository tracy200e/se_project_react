import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import likeButton from "../../images/like-button.svg";
import activeLikeButton from "../../images/like-active.svg";

const ItemCard = ({ clothingItem, onSelectedCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);

  const isLikedByUser = clothingItem.likes.some((id) => id === currentUser._id);

  const handleCardLike = (evt) => {
    onCardLike({ id: clothingItem._id, isLikedByUser });
  };

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
        {currentUser ? (
          <img
            src={isLikedByUser ? activeLikeButton : likeButton}
            alt={isLikedByUser ? "liked" : "disliked"}
            onClick={handleCardLike}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
