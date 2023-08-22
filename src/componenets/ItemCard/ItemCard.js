const ItemCard = ({ item }) => {
    return <div>
      <div>
        <img src={item.link} className='card_image' alt='suggestion card' />
      </div>
      <div className='card_name'>{item.name}</div>
    </div>;
}

export default ItemCard;