import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { withRouter, useHistory } from "react-router-dom";
import * as auth from "../../utils/auth";

const LoginModal = ({ handleCloseModal, isOpen = true, handleLogin }) => {
  const history = useHistory();
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
    if (!loginData.email || !loginData.password) {
      return;
    }
    auth.authorize(loginData.email, loginData.password).then((data) => {
      if (data.jwt) {
        setLoginData(
          {
            email: "",
            password: "",
          },
          () => {
            handleLogin();
            history.pushState("/");
          }
        ).catch((error) => console.log(error));
      }
    });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="LogIn"
      linkText="or Sign Up"
      linkHref="/register"
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

export default withRouter(LoginModal);
