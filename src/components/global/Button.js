import React from "react";

const Button = ({
  modalId,
  buttonText,
  buttonOnClick,
  buttonColor,
  fontSize,
  btnClass,
}) => {
  return (
    <>
      <button
        type="button"
        className={`btn ${btnClass ? btnClass : ""} ${
          buttonColor ? buttonColor : "btn-secondary"
        } btn-rounded`}
        data-toggle="modal"
        data-target={modalId ? modalId : undefined}
        onClick={buttonOnClick ? buttonOnClick : undefined}
        style={{ fontSize: fontSize ? fontSize : "" }}
      >
        {buttonText}
      </button>
      {/* <a
        href="true"
        className="btn btn-secondary btn-rounded"
        data-toggle="modal"
        data-target={modalId ? modalId : undefined}
      >
        {buttonText}
      </a> */}
    </>
  );
};

export default Button;
