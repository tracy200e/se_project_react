import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({
  handleCloseModal,
  activeModal,
  handleRegistration,
  handleTextButton,
}) => {
  const {
    values: registerData,
    handleChange,
    setValues: setRegisterData,
  } = useForm({ email: "", password: "", name: "", avatar: "" });

  // Submit function
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegistration(registerData);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      linkText="or Log In"
      linkHref="/signin"
      onClose={handleCloseModal}
      isOpen={activeModal === "register"}
      onSubmit={handleSubmit}
      handleTextButton={handleTextButton}
    >
      <div className="form__input">
        <label>
          Email*
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
            className="form__text-input"
            placeholder="Email"
          />
        </label>
      </div>
      <div className="form__input">
        <label>
          Password*
          <input
            type="password"
            name="password"
            minLength="8"
            value={registerData.password}
            onChange={handleChange}
            className="form__text-input"
            placeholder="Password"
          />
        </label>
      </div>
      <div className="form__input">
        <label>
          Name*
          <input
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            value={registerData.name}
            onChange={handleChange}
            className="form__text-input"
            placeholder="Name"
          />
        </label>
      </div>
      <div className="form__input">
        <label>
          Avatar URL
          <input
            type="url"
            name="avatar"
            minLength="1"
            maxLength="70"
            value={registerData.avatar}
            onChange={handleChange}
            className="form__text-input"
            placeholder="Avatar URL"
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
