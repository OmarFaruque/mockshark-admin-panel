import React from "react";
import MonthlyPaymentList from "../components/monthlyPayment";

const Module = () => {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <MonthlyPaymentList />
        </div>
      </div>
    </div>
  );
};

export default Module;
