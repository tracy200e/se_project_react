import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useState, useEffect } from "react";
import likeButton from "../../images/like-button.svg";
import activeLikeButton from "../../images/like-active.svg";

const ItemCard = ({ clothingItem, onSelectedCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(
      clothingItem.likes && clothingItem.likes.includes(currentUser._id)
    );
  }, [clothingItem, currentUser]);

  const handleCardLike = () => {
    onCardLike(clothingItem, isLiked, setIsLiked);
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
            src={isLiked ? activeLikeButton : likeButton}
            alt="like button"
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
