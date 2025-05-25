import React, { useCallback, useEffect, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import "../css/category-list.css";
// import CreateProduct from "./CreateProduct";
import { useParams } from "react-router-dom";
import ActionButton from "../global/ActionButton";
import ActionButtonMenu from "../global/ActionButtonMenu";
import Button from "../global/Button";
import CardHeader from "../global/CardHeader";
import IndianaDragScroller from "../global/IndianaDragScroller";
import Searchbar from "../global/Searchbar";
import CreateAttribute from "./CreateAttribute";
import DeleteAttribute from "./DeleteAttribute";
import EditAttribute from "./EditAttribute";

const AttributeList = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [categories, setCategories] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedQuery, setSelectedQuery] = useState("variant");
  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState("");

  const loadMoreProduct = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const getProducts = useCallback(() => {
    setLoader(true);

    fetchData(
      `/api/v1/products-attributes/${id}?${selectedQuery}=${
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
    const getProductsDebounce = setTimeout(() => {
      getProducts();
    }, 500);
    console.log(selectedQuery);
    console.log(searchTerm);
    return () => clearTimeout(getProductsDebounce);
  }, [selectedQuery, searchTerm, page, limit]);

  //get all categories
  //   const getCategories = useCallback(() => {
  //     setLoader(true);

  //     fetchData(`/api/v1/categories`, "GET")
  //       .then((result) => {
  //         if (result.success) {
  //           setCategories(result.data);
  //         } else {
  //           showErrorToast(result.message);
  //         }
  //       })
  //       .catch((error) => {
  //         showErrorToast(error);
  //       })
  //       .finally(() => {
  //         setLoader(false);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     getCategories();

  //     return () => setCategories([]);
  //   }, []);

  //get all brands
  //   const getBrands = useCallback(() => {
  //     setLoader(true);

  //     fetchData(`/api/v1/brands`, "GET")
  //       .then((result) => {
  //         if (result.success) {
  //           setBrands(result.data);
  //         } else {
  //           showErrorToast(result.message);
  //         }
  //       })
  //       .catch((error) => {
  //         showErrorToast(error);
  //       })
  //       .finally(() => {
  //         setLoader(false);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     getBrands();

  //     return () => setBrands([]);
  //   }, []);

  //get all campaigns
  //   const getCampaigns = useCallback(() => {
  //     setLoader(true);

  //     fetchData(`/api/v1/campaigns`, "GET")
  //       .then((result) => {
  //         if (result.success) {
  //           setCampaigns(result.data);
  //         } else {
  //           showErrorToast(result.message);
  //         }
  //       })
  //       .catch((error) => {
  //         showErrorToast(error);
  //       })
  //       .finally(() => {
  //         setLoader(false);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     getCampaigns();

  //     return () => setCampaigns([]);
  //   }, []);

  //get all suppliers
  //   const getSuppliers = useCallback(() => {
  //     setLoader(true);

  //     fetchData(`/api/v1/suppliers`, "GET")
  //       .then((result) => {
  //         if (result.success) {
  //           setSuppliers(result.data);
  //         } else {
  //           showErrorToast(result.message);
  //         }
  //       })
  //       .catch((error) => {
  //         showErrorToast(error);
  //       })
  //       .finally(() => {
  //         setLoader(false);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     getSuppliers();

  //     return () => setSuppliers([]);
  //   }, []);

  return (
    <>
      {/* add modal */}
      <CreateAttribute
        getAttributes={getProducts}
        productId={id}
        // categories={categories}
        // campaigns={campaigns}
        // suppliers={suppliers}
        // brands={brands}
      />

      {/* table */}
      <div className="col-lg-12">
        <div className="card">
          <CardHeader
            title={"Attributes"}
            modalId={"#createAttribute"}
            buttonText={"+"}
            btnClass={"btnAdd"}
            totalCount={data ? data.length : 0}
          >
            <Searchbar
              queries={["variant"]}
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
                      <th>Variant</th>
                      <th>Cost Price</th>
                      <th>Retail Price</th>
                      <th>Discount Percent</th>
                      <th>Discount Price</th>
                      <th>Discounted Retail Price</th>
                      <th>Stock Amount</th>
                      {/* <th></th>
                      <th></th>
                      <th></th> */}
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
                          <td>{item?.size}</td>
                          <td>{item?.costPrice}</td>
                          <td>{item?.retailPrice}</td>
                          {/* <td>{item.name}</td> */}
                          <td>{item?.discountPercent}</td>
                          <td>{item?.discountPrice?.toFixed(2)}</td>
                          <td>{item?.discountedRetailPrice}</td>
                          <td>{item?.stockAmount}</td>

                          <td>
                            <ActionButton>
                              {/* <ActionButtonMenu
                                menuName={"See Details"}
                                menuLink={"/dashboard"}
                              /> */}
                              <ActionButtonMenu
                                menuName={"Edit"}
                                menuTarget={"#editAttribute" + item.id}
                              />
                              {/* <ActionButtonMenu
                                menuName={"Attributes"}
                                // menuTarget={"/edit-attribute" + item.id}
                                menuLink={"/attributes/" + item.id}
                              /> */}
                              <ActionButtonMenu
                                menuName={"Delete"}
                                menuTarget={"#deleteAttribute" + item.id}
                              />
                              {/* <ActionButtonMenu
                                menuName={"Send Email"}
                                menuTarget={"#sendEmailProduct" + item.id}
                              /> */}
                            </ActionButton>
                          </td>
                          <EditAttribute
                            item={item}
                            getProducts={getProducts}
                            attributeId={item?.id}
                            // categories={categories}
                            // suppliers={suppliers}
                            // brands={brands}
                          />
                          <DeleteAttribute
                            item={item}
                            getProducts={getProducts}
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
                      <th>Variant</th>
                      <th>Cost Price</th>
                      <th>Retail Price</th>
                      <th>Discount Percent</th>
                      <th>Discount Price</th>
                      <th>Discounted Retail Price</th>
                      <th>Stock Amount</th>
                      {/* <th></th>
                      <th></th>
                      <th></th> */}
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
                      buttonOnClick={() => loadMoreProduct()}
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

export default AttributeList;
