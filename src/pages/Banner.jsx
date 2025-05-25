import React from "react";
import BannerList from "../components/banner";

const Banner = () => {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <BannerList />
        </div>
      </div>
    </div>
  );
};

export default Banner;
