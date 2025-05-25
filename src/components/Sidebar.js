import React from "react";
import { Link, useLocation } from "react-router-dom";
import MenuData from "../data/MenuData.json";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="deznav">
        <div className="deznav-scroll">
          <ul className="metismenu" id="menu">
            {MenuData.map((menu, index) => {
              return (
                <li
                  key={index}
                  className={pathname === menu.link ? "ai-icon mm-active" : ""}
                >
                  <Link to={menu.link} aria-expanded="false">
                    <i className={menu.icon}></i>
                    <span className="nav-text">{menu.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="copyright">
            <p>
              <strong>Voltech Admin Dashboard</strong> ©{" "}
              {new Date().getFullYear()} All Rights Reserved
            </p>
            {/* <p>
              Made with <span className="heart"></span> by 
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
