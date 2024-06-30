import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  handleCloseModal,
  handleLogin,
  switchToRegister,
  isOpen,
}) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Change function
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Submit function
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(loginData);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="LogIn"
      linkText="or Sign Up"
      switchToModal={switchToRegister}
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="form__input">
        <label>
          Email
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="form__text-input"
            placeholder="Email"
          />
        </label>
      </div>
      <div className="form__input">
        <label>
          Password
          <input
            type="password"
            name="password"
            minLength="8"
            value={loginData.password}
            onChange={handleChange}
            className="form__text-input"
            placeholder="Password"
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
