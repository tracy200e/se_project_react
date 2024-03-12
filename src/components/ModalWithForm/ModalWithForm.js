import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";

const ModalWithForm = ({
  children,
  buttonText,
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
        <button type="submit" className="modal__submit-button">
          {buttonText}
        </button>
      </form>
    </Modal>
  );
};

export default ModalWithForm;
