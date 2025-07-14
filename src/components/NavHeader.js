import React from "react";
import "./css/navheader.css";
//import { Link } from "react-router-dom";

const NavHeader = () => {
  return (
    <>
      <div className="nav-header">
        <a
          href="/dashboard"
          className="brand-logo"
          style={{ justifyContent: "center" }}
        >
          <img
            className="logo-abbr"
            src="images/avatar.png"
            alt="logo"
            // style={{ maxWidth: "120px" }}
          />
          {/* <img className="logo-compact" src="images/logo-text.png" alt="logo" /> */}
          {/* <img className="brand-title" src="images/logo-text.png" alt="logo" /> */}
          {/* <p className="brand-title">OMS</p> */}
          <h4 className="ml-2 brand-title">Mockshark</h4>
        </a>

        <div className="nav-control">
          <div className="hamburger">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavHeader;
