import React from "react";
import { Link } from "react-router-dom";

const ActionButtonMenu = ({ menuName, menuTarget, menuLink }) => {
  return (
    <>
      {menuLink ? (
        <>
          <Link className="dropdown-item" to={menuLink}>
            {menuName}
          </Link>
        </>
      ) : (
        <a
          className="dropdown-item"
          href="true"
          data-toggle="modal"
          data-target={menuTarget}
        >
          {menuName}
        </a>
      )}
    </>
  );
};

export default ActionButtonMenu;
