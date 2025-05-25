import React, { useState, useEffect, useCallback } from "react";
import "../css/category-list.css";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
// import CreateProduct from "./CreateProduct";
import ActionButton from "../global/ActionButton";
import ActionButtonMenu from "../global/ActionButtonMenu";
// import EditProduct from "./EditProduct";
// import DeleteProduct from "./DeleteProduct";
import CardHeader from "../global/CardHeader";
import Button from "../global/Button";
import Searchbar from "../global/Searchbar";
import IndianaDragScroller from "../global/IndianaDragScroller";
import EditOrder from "./editOrder";
import SeeDetails from "./seeDetails";

const OrderList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [selectedQuery, setSelectedQuery] = useState("customer_name");
  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState("");

  const loadMoreOrder = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const getOrders = useCallback(() => {
    setLoader(true);

    fetchData(
      `/api/v1/orders?${selectedQuery}=${
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
    const getOrdersDebounce = setTimeout(() => {
      getOrders();
    }, 500);

    return () => clearTimeout(getOrdersDebounce);
  }, [selectedQuery, searchTerm, page, limit]);

  return (
    <>
      <div className="col-lg-12">
        <div className="card">
          <CardHeader
            title={"Orders"}
            hasButton={false}
            totalCount={data ? data.length : 0}
          >
            <Searchbar
              queries={[
                "customer_name",
                "customer_phone",
                "customer_address",
                "customer_city",
                "customer_postal_code",
                "invoice_number",
                "payment_method",
                "status",
              ]}
              selectedQuery={selectedQuery}
              setSelectedQuery={setSelectedQuery}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </CardHeader>

          <div className="card-body">
            <div className="table-responsive">
              <IndianaDragScroller>
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
                      <th className="width80">#</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Postal Code</th>
                      <th>Invoice Number</th>
                      <th>Payment Method</th>
                      <th>Status</th>
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
                          <td>{item.customerName}</td>
                          <td>{item.customerPhone}</td>
                          <td>{item.customerAddress}</td>
                          <td>{item.customerCity}</td>
                          <td>{item.customerPostalCode}</td>
                          <td>{item.invoiceNumber}</td>
                          <td>{item.paymentMethod}</td>

                          <td
                            style={{
                              color: `${
                                item.status === "PENDING"
                                  ? "orange"
                                  : item.status === "INPROGRESS"
                                  ? "blue"
                                  : item.status === "DELIVERED"
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          >
                            {item.status}
                          </td>

                          <td>
                            <ActionButton>
                              <ActionButtonMenu
                                menuName={"See Details"}
                                menuTarget={"#seeDetails" + item.id}
                              />
                              <ActionButtonMenu
                                menuName={"Edit Status"}
                                menuTarget={"#editStatus" + item.id}
                              />
                            </ActionButton>
                          </td>
                          <EditOrder item={item} getOrders={getOrders} />
                          <SeeDetails item={item} getOrders={getOrders} />
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
                      <th>Phone</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Postal Code</th>
                      <th>Invoice Number</th>
                      <th>Payment Method</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </table>
              </IndianaDragScroller>
              <div className="col-md-12 text-center">
                {data?.length === limit * page && (
                  <>
                    <Button
                      buttonText={"Load more"}
                      fontSize={"11px"}
                      buttonOnClick={() => loadMoreOrder()}
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

export default OrderList;
