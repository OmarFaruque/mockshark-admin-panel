import React from "react";

const Modal = ({ modalId, modalHeader, modalCloseButton, children }) => {
  return (
    <>
      <div className="modal fade" id={modalId}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalHeader}</h5>
              <button
                ref={modalCloseButton}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>{children}</form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
