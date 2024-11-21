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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
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
            <label>
              <input
                name="weatherType"
                type="radio"
                id="hot"
                value="hot"
                onChange={handleWeatherChange}
              />
              Hot
            </label>
          </div>
          <div>
            <label>
              <input
                name="weatherType"
                type="radio"
                id="warm"
                value="warm"
                onChange={handleWeatherChange}
              />
              Warm
            </label>
          </div>
          <div>
            <label>
              <input
                name="weatherType"
                type="radio"
                id="cold"
                value="cold"
                onChange={handleWeatherChange}
              />
              Cold
            </label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
