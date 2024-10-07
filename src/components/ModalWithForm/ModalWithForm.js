import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";

const ModalWithForm = ({
  children,
  buttonText,
  linkHref,
  linkText,
  title,
  onClose,
  name,
  isOpen,
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
          <a className="modal__redirect-link" href={linkHref}>
            {linkText}
          </a>
        </div>
      </form>
    </Modal>
  );
};

export default ModalWithForm;
