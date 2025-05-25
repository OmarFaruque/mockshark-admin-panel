import React from "react";
import OrderList from "../components/order";

const Order = () => {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <OrderList />
        </div>
      </div>
    </div>
  );
};

export default Order;
