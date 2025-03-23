import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({
  handleCloseModal,
  activeModal,
  handleLogin,
  handleTextButton,
}) => {
  const { values: loginData, handleChange } = useForm({
    email: "",
    password: "",
  });

  // Submit function
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }
    handleLogin(loginData);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="LogIn"
      linkText="or Sign Up"
      linkHref="/signup"
      onClose={handleCloseModal}
      isOpen={activeModal === "login"}
      onSubmit={handleSubmit}
      handleTextButton={handleTextButton}
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
