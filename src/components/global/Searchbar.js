import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Searchbar = ({
  queries,
  selectedQuery,
  setSelectedQuery,
  searchTerm,
  setSearchTerm,
}) => {
  const confirmQuery = useCallback(
    (query) => {
      setSelectedQuery(query);
    },
    [setSelectedQuery]
  );

  const search = useCallback(
    (e) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm.length]
  );

  return (
    <>
      <div className="input-group search-area d-xl-inline-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Search by"
          value={searchTerm}
          onChange={(e) => search(e)}
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <div style={{ cursor: "pointer" }}>
              <div className="dropdown mt-sm-0 mt-0">
                <button
                  type="button"
                  className="btn btn-primary btn-rounded dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontSize: "10px" }}
                >
                  {selectedQuery}
                </button>

                <div className="dropdown-menu dropdown-menu-right">
                  {queries.map((query) => {
                    return (
                      <>
                        <div
                          className="dropdown-item"
                          key={query}
                          onClick={() => confirmQuery(query)}
                        >
                          {query}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              {/* <i class="flaticon-381-search-2"></i> */}
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
