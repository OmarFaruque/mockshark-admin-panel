import React, { useState, useEffect, useCallback } from "react";
import "../css/category-list.css";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import CreateSupplier from "./CreateSupplier";
import ActionButton from "../global/ActionButton";
import ActionButtonMenu from "../global/ActionButtonMenu";
import EditSupplier from "./EditSupplier";
import DeleteSupplier from "./DeleteSupplier";
import CardHeader from "../global/CardHeader";
import Button from "../global/Button";
import Searchbar from "../global/Searchbar";

const SupplierList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [selectedQuery, setSelectedQuery] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState("");

  const loadMoreSupplier = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const getSuppliers = useCallback(() => {
    setLoader(true);

    fetchData(
      `/api/v1/suppliers?${selectedQuery}=${
        selectedQuery ? searchTerm : ""
      }&page=${searchTerm.length > 2 ? "" : page}&limit=${
        searchTerm.length > 2 ? "" : limit
      }`,
      "GET"
    )
      .then((result) => {
        if (result.success) {
          if (searchTerm.length > 2) {
            if (page > 1) {
              setPage(1);
              setData([]);
            }
            setData(result.data);
          } else if (page > 1) {
            setData([...data, ...result.data]);
          } else {
            setData(result.data);
          }
          setMessage(result.message);
        } else {
          showSuccessToast(result.message);
          setMessage(result.message);
        }
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [selectedQuery, searchTerm, page, limit]);

  useEffect(() => {
    const getSupplierDebounce = setTimeout(() => {
      getSuppliers();
    }, 500);

    return () => clearTimeout(getSupplierDebounce);
  }, [selectedQuery, searchTerm, page, limit]);

  return (
    <>
      {/* add modal */}
      <CreateSupplier getSuppliers={getSuppliers} />

      {/* table */}
      <div className="col-lg-12">
        <div className="card">
          <CardHeader
            title={"Supplier"}
            modalId={"#createSupplier"}
            buttonText={"+"}
            btnClass={"btnAdd"}
            totalCount={data ? data.length : 0}
          >
            <Searchbar
              queries={["name", "address", "phone", "email"]}
              selectedQuery={selectedQuery}
              setSelectedQuery={setSelectedQuery}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </CardHeader>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-responsive-md">
                <thead>
                  <tr>
                    <th className="width80">#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data ? (
                    data?.map((item, index) => (
                      <tr key={item.id + index}>
                        <td>
                          <strong>{index + 1}</strong>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>

                        <td>
                          <ActionButton>
                            <ActionButtonMenu
                              menuName={"Edit"}
                              menuTarget={"#editSupplier" + item.id}
                            />
                            <ActionButtonMenu
                              menuName={"Delete"}
                              menuTarget={"#deleteSupplier" + item.id}
                            />
                          </ActionButton>
                        </td>
                        <EditSupplier item={item} getSuppliers={getSuppliers} />
                        <DeleteSupplier
                          item={item}
                          getSuppliers={getSuppliers}
                        />
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr className="col-md-12 text-center">
                        <td></td>
                        <td>{message}</td>
                        <td></td>
                      </tr>
                    </>
                  )}
                </tbody>

                <tfoot>
                  <tr>
                    <th className="width80">#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
              <div className="col-md-12 text-center">
                {data?.length === limit * page && (
                  <>
                    <Button
                      buttonText={"Load more"}
                      fontSize={"11px"}
                      buttonOnClick={() => loadMoreSupplier()}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierList;
