import React, { useState } from "react";
import NavHeader from "../../components/NavHeader";
//import Chatbox from "./components/Chatbox";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
//import AddOrderSidebar from "./components/AddOrderSidebar";

import Footer from "../../components/Footer";
const Layout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(true);
  function closeSidebar() {
    setOpenMenu(true);
    document.querySelector(".hamburger").click();
    setOpenMenu(true);
  }
  return (
    <>
      <div
        className={
          openMenu === true
            ? "blur_bg blur_bg_inactive"
            : "blur_bg blur_bg_active"
        }
        onClick={() => closeSidebar()}
      ></div>
      <div id="main-wrapper">
        <NavHeader data={openMenu} set_data={setOpenMenu} />

        <Header />
        <Sidebar data={openMenu} set_data={setOpenMenu} />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
