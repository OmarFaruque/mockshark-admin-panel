import React from "react";
import CampaignList from "../components/campaign";

const Campaign = () => {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <CampaignList />
        </div>
      </div>
    </div>
  );
};

export default Campaign;
