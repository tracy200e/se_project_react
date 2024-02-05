import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
  isOpen,
  onSubmit
}) => {
  console.log("ModalWithForm");
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        />
        <div className="modal__title">{title}</div>
        <form onSubmit={onSubmit}>
          {children}
        <button type="submit" className="modal__submit-button">{buttonText}</button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
