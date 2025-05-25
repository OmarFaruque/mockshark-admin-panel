import React from "react";
import CategoryList from "../components/category";

const Category = () => {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <CategoryList />
        </div>
      </div>
    </div>
  );
};

export default Category;
