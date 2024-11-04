import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";
import { Link } from "react-router-dom";

const ModalWithForm = ({
  children,
  buttonText,
  linkHref,
  linkText,
  title,
  onClose,
  name,
  isOpen = true,
  onSubmit,
}) => {
  return (
    <Modal name={name} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit}>
        {children}
        <div className="modal__submit-section">
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
          <Link className="modal__redirect-link" to={linkHref}>
            {linkText}
          </Link>
        </div>
      </form>
    </Modal>
  );
};

export default ModalWithForm;
