import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link });
  };

  return (
    <ModalWithForm
      title="New Garment"
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
            maxLength="30"
            value={link}
            onChange={handleUrlChange}
            className="form__text-input"
            placeholder="Image"
          />
        </label>
      </div>
      <div className="form__input">
        <p>Select the weather type:</p>
        <div>
          <div>
            <label>
              <input name="weatherType" type="radio" id="hot" value="hot" onChange />
              Hot
            </label>
          </div>
          <div>
            <label>
              <input name="weatherType" type="radio" id="warm" value="warm" />
              Warm
            </label>
          </div>
          <div>
            <label>
              <input name="weatherType" type="radio" id="cold" value="cold" />
              Cold
            </label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
