import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal"

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
  isOpen,
  onSubmit
}) => {
  return (
    <div>
      <Modal name={name} onClose={onClose}>
        <div className="modal__title">{title}</div>
        <form onSubmit={onSubmit}>
          {children}
        <button type="submit" className="modal__submit-button">{buttonText}</button>
        </form>
      </Modal>
    </div>
  );
};

export default ModalWithForm;