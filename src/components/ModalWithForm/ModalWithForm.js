import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
}) => {
  console.log("ModalWithForm");
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        ></button>
        <div className="modal__title">{title}</div>
        <form>{children}</form>
        <button type="submit" className="modal__submit-button">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
