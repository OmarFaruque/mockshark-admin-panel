import React from "react";
import ContactList from "../components/contact";

const Contact = () => {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <ContactList />
        </div>
      </div>
    </div>
  );
};

export default Contact;
