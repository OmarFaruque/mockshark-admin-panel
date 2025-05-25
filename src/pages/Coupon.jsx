import React from "react";
import CouponList from "../components/coupon";

const Coupon = () => {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <CouponList />
        </div>
      </div>
    </div>
  );
};

export default Coupon;
