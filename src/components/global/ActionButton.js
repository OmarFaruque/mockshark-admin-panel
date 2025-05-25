import React from "react";

const ActionButton = ({ children }) => {
  return (
    <>
      <div className="dropdown">
        <button
          type="button"
          className="btn btn-info light  sharp"
          data-toggle="dropdown"
        >
          <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <rect x="0" y="0" width="24" height="24" />
              <circle fill="#fff" cx="5" cy="12" r="2" />
              <circle fill="#fff" cx="12" cy="12" r="2" />
              <circle fill="#fff" cx="19" cy="12" r="2" />
            </g>
          </svg>
        </button>
        <div className="dropdown-menu">{children}</div>
      </div>
    </>
  );
};

export default ActionButton;
