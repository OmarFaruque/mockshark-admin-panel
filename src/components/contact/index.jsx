import React, { useCallback, useEffect, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import "../css/category-list.css";
import Button from "../global/Button";
import CardHeader from "../global/CardHeader";
// import DeleteData from "../global/DeleteData";
import IndianaDragScroller from "../global/IndianaDragScroller";
import Searchbar from "../global/Searchbar";
// import CreateCoupon from "./CreateCoupon";
// import EditCoupon from "./EditCoupon";

const ContactList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [selectedQuery, setSelectedQuery] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState("");

  const loadMoreCoupon = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const getCoupons = useCallback(() => {
    setLoader(true);

    fetchData(
      `/api/v1/contacts?${selectedQuery}=${
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
    const getCouponsDebounce = setTimeout(() => {
      getCoupons();
    }, 500);

    return () => clearTimeout(getCouponsDebounce);
  }, [selectedQuery, searchTerm, page, limit]);

  return (
    <>
      {/* add modal */}
      {/* <CreateCoupon getCoupons={getCoupons} /> */}

      {/* table */}
      <div className="col-lg-12">
        <div className="card">
          <CardHeader
            title={"Contact Messages"}
            // modalId={"#createNewsletter"}
            // buttonText={""}
            // btnClass={"btnAdd"}
            hasButton={false}
            totalCount={data ? data.length : 0}
          >
            <Searchbar
              queries={["name", "email"]}
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
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                      {/* <th>Code</th>
                      <th>Order Price Limit</th>
                      <th>Discount Amount</th>
                      <th>Active</th>
                      <th>Action</th> */}
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
                          <td>{item.email}</td>
                          <td>{item.subject}</td>
                          <td>{item.message}</td>
                          <td>{item.createdAt?.slice(0, 10)}</td>
                          {/* <td>{item.code}</td>
                          <td>{item.orderPriceLimit}</td>
                          <td>{item.discountAmount}</td> */}
                          {/* <td>
                            {item?.image && (
                              <img
                                src={item?.image}
                                alt="banner image"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "contain",
                                }}
                              />
                            )}
                          </td> */}
                          {/* <td>{item.isActive ? "Active" : "Inactive"}</td> */}

                          {/* <td>
                            <ActionButton>
                              <ActionButtonMenu
                                menuName={"Edit"}
                                menuTarget={"#editCoupon" + item.id}
                              />
                              <ActionButtonMenu
                                menuName={"Delete"}
                                menuTarget={"#deleteCoupon" + item.id}
                              />
                            </ActionButton>
                          </td> */}
                          {/* <EditCoupon item={item} getCoupons={getCoupons} /> */}
                          {/* <DeleteData
                            uri={`/api/v1/coupons/${item.id}`}
                            item={item}
                            getData={getCoupons}
                            modalId={`deleteCoupon${item.id}`}
                            modalHeader={"Delete Coupon"}
                          /> */}
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
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                      {/* <th>Code</th>
                      <th>Order Price Limit</th>
                      <th>Discount Amount</th>
                      <th>Active</th>
                      <th>Action</th> */}
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
                      buttonOnClick={() => loadMoreCoupon()}
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

export default ContactList;
