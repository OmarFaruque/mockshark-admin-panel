import React from "react";
import NewsletterList from "../components/newsletter";

const Newsletter = () => {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <NewsletterList />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
