import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";
import { useHistory } from "react-router-dom";

const ModalWithForm = ({
  children,
  buttonText,
  linkText,
  title,
  onClose,
  name,
  isOpen = true,
  onSubmit,
  handleTextButton,
}) => {
  const history = useHistory();

  return (
    <Modal name={name} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit}>
        {children}
        <div className="modal__submit-section">
          <button
            type="submit"
            className="modal__button-text modal__submit-button"
          >
            {buttonText}
          </button>
          <button
            type="button"
            className="modal__button-text modal__redirect-link"
            onClick={() => {
              onClose();
              handleTextButton();
            }}
          >
            {linkText}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalWithForm;
