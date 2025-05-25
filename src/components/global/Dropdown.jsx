import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const Dropdown = ({ selectedMonth, setSelectedMonth, setSelectedQuery }) => {
  const onSelectMonth = useCallback(
    (label, value) => {
      setSelectedQuery(value);
      setSelectedMonth(label);
    },
    [setSelectedQuery]
  );

  return (
    <>
      <div className=" d-xl-inline-flex">
        <div style={{ cursor: "pointer" }}>
          <div className="dropdown mt-sm-0 mt-0">
            <button
              type="button"
              className="btn btn-primary btn-rounded dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
              style={{ fontSize: "10px" }}
            >
              {selectedMonth}
            </button>

            <div className="dropdown-menu dropdown-menu-right">
              {months.map((month) => {
                return (
                  <>
                    <div
                      className="dropdown-item"
                      key={month.label}
                      onClick={() => onSelectMonth(month.label, month.value)}
                    >
                      {month.label}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          {/* <i class="flaticon-381-search-2"></i> */}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
