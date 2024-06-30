import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";

const ModalWithForm = ({
  children,
  buttonText,
  switchToModal,
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
          <p className="modal__redirect-link" onClick={switchToModal}>{linkText}</p>
        </div>
      </form>
    </Modal>
  );
};

export default ModalWithForm;
