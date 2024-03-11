import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
    handleCloseModal();
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="form__input">
        <label>
          Name
          <input
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
            className="form__text-input"
            placeholder="Name"
          />
        </label>
      </div>
      <div className="form__input">
        <label>
          Image
          <input
            type="url"
            name="link"
            minLength="1"
            maxLength="70"
            value={imageUrl}
            onChange={handleUrlChange}
            className="form__text-input"
            placeholder="Image URL"
          />
        </label>
      </div>
      <div className="form__input">
        <p>Select the weather type:</p>
        <div>
          <div>
            <input 
              name="weatherType" 
              type="radio" 
              id="hot" 
              value="hot"
              onChange={handleWeatherChange} 
            />
            <label>Hot</label>
          </div>
          <div>
            <input 
              name="weatherType" 
              type="radio" 
              id="warm" 
              value="warm"
              onChange={handleWeatherChange}
            />
            <label>Warm</label>
          </div>
          <div>
            <input 
              name="weatherType" 
              type="radio" 
              id="cold" 
              value="cold"
              onChange={handleWeatherChange}
            />
            <label>Cold</label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;