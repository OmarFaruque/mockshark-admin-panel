import React from "react";

const Slab = ({ title, amount }) => {
  return (
    <>
      <div
        className="col-xl-3 col-xxl-3 col-sm-4"
        // style={{ marginBottom: "50px" }}
      >
        <div
          className="card grd-card"
          style={{
            backgroundColor: "#f9f9f9",
            backgroundImage: "linear-gradient(315deg, #f9f9f9 0%, #02a388 74%)",
          }}
        >
          <div className="card-body slab-body">
            <div className="media align-items-center">
              <div className="media-body mr-2">
                <h2 className="text-black font-w600">{amount}</h2>
                <span className="text-gray">{title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slab;
