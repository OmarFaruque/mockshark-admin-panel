import React from "react";
import ProductList from "../components/product";

const Product = () => {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Product;
