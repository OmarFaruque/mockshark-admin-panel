import React from "react";
import Button from "./Button";

const CardHeader = ({
  title,
  modalId,
  buttonText,
  totalCount,
  hasButton,
  children,
  btnClass,
}) => {
  return (
    <>
      <div className="card-header">
        <div className="card-header-left">
          <h4 className="card-title">
            {title}{" "}
            <span
              className="text-muted font-weight-normal"
              style={{ fontSize: "14px" }}
            >
              (Showing: {totalCount})
            </span>
          </h4>
          {(hasButton === undefined || hasButton) && (
            <>
              <Button
                modalId={modalId}
                buttonText={buttonText}
                btnClass={btnClass}
              />
            </>
          )}
        </div>

        {children}
      </div>
    </>
  );
};

export default CardHeader;
