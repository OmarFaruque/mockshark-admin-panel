import React, { useCallback, useEffect, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import "../css/category-list.css";
// import CreateProduct from "./CreateProduct";
import ActionButton from "../global/ActionButton";
import ActionButtonMenu from "../global/ActionButtonMenu";
import Button from "../global/Button";
import CardHeader from "../global/CardHeader";
import IndianaDragScroller from "../global/IndianaDragScroller";
import Searchbar from "../global/Searchbar";
import SendEmail from "../global/SendEmail";
import CreateProduct from "./CreateProduct";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [categories, setCategories] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedQuery, setSelectedQuery] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState("");

  const loadMoreProduct = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const getProducts = useCallback(() => {
    setLoader(true);

    fetchData(
      `/api/v1/products?${selectedQuery}=${
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
  const getCategories = useCallback(() => {
    setLoader(true);

    fetchData(`/api/v1/categories`, "GET")
      .then((result) => {
        if (result.success) {
          setCategories(result.data);
        } else {
          showErrorToast(result.message);
        }
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    getCategories();

    return () => setCategories([]);
  }, []);

  //get all brands
  const getBrands = useCallback(() => {
    setLoader(true);

    fetchData(`/api/v1/brands`, "GET")
      .then((result) => {
        if (result.success) {
          setBrands(result.data);
        } else {
          showErrorToast(result.message);
        }
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    getBrands();

    return () => setBrands([]);
  }, []);

  //get all campaigns
  const getCampaigns = useCallback(() => {
    setLoader(true);

    fetchData(`/api/v1/campaigns`, "GET")
      .then((result) => {
        if (result.success) {
          setCampaigns(result.data);
        } else {
          showErrorToast(result.message);
        }
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    getCampaigns();

    return () => setCampaigns([]);
  }, []);

  //get all suppliers
  const getSuppliers = useCallback(() => {
    setLoader(true);

    fetchData(`/api/v1/suppliers`, "GET")
      .then((result) => {
        if (result.success) {
          setSuppliers(result.data);
        } else {
          showErrorToast(result.message);
        }
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    getSuppliers();

    return () => setSuppliers([]);
  }, []);

  return (
    <>
      {/* add modal */}
      <CreateProduct
        getProducts={getProducts}
        categories={categories}
        campaigns={campaigns}
        suppliers={suppliers}
        brands={brands}
      />

      {/* table */}
      <div className="col-lg-12">
        <div className="card">
          <CardHeader
            title={"Products"}
            modalId={"#createProduct"}
            buttonText={"+"}
            btnClass={"btnAdd"}
            totalCount={data ? data.length : 0}
          >
            <Searchbar
              queries={["name", "product_code", "barcode"]}
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
                      <th>Code</th>
                      <th>Barcode</th>
                      <th>User</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Subcategory</th>
                      <th>Sub2category</th>
                      <th>Supplier</th>
                      <th>Variants</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>Images</th>
                      {/* <th></th>
                      <th></th>
                      <th></th> */}
                      <th>Active?</th>
                      <th>Featured?</th>
                      <th>Trending?</th>
                      <th>View Count</th>
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
                          <td>{item?.name}</td>
                          <td>{item?.productCode}</td>
                          <td>{item?.barcode}</td>
                          {/* <td>{item.name}</td> */}
                          <td>{item?.user.name}</td>
                          <td>{item?.brand?.name}</td>
                          <td>{item?.category.name}</td>
                          <td>{item?.subcategory?.name}</td>
                          <td>{item?.subsubcategory?.name}</td>
                          <td>{item?.supplier?.name}</td>
                          <td style={{ fontSize: "11px" }} colSpan={5}>
                            {item?.productAttributes?.map((attr) => {
                              return (
                                <li
                                  style={{ listStyle: "inside" }}
                                  key={attr?.id}
                                >
                                  {attr?.size +
                                    ", Cost Price: " +
                                    attr?.costPrice +
                                    ", Retail Price: " +
                                    attr?.retailPrice +
                                    ", Discount Percent: " +
                                    attr?.discountPercent +
                                    ", Discounted Retail Price: " +
                                    attr?.discountedRetailPrice +
                                    ", Stock Amount: " +
                                    attr?.stockAmount}
                                </li>
                              );
                            })}
                          </td>
                          <td
                            style={{
                              fontSize: "11px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                            colSpan={4}
                          >
                            {item?.images?.map((image) => {
                              return (
                                <img
                                  src={image?.image}
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "contain",
                                  }}
                                />
                              );
                            })}
                          </td>
                          <td>{item.isActive ? "Active" : "Inactive"}</td>
                          <td>{item.isFeatured ? "Yes" : "No"}</td>
                          <td>{item.isTrending ? "Yes" : "No"}</td>
                          <td>{item.viewCount}</td>

                          <td>
                            <ActionButton>
                              {/* <ActionButtonMenu
                                menuName={"See Details"}
                                menuLink={"/dashboard"}
                              /> */}
                              <ActionButtonMenu
                                menuName={"Edit"}
                                menuTarget={"#editProduct" + item.id}
                              />
                              <ActionButtonMenu
                                menuName={"Attributes"}
                                // menuTarget={"/edit-attribute" + item.id}
                                menuLink={"/attributes/" + item.id}
                              />
                              <ActionButtonMenu
                                menuName={"Images"}
                                // menuTarget={"/edit-attribute" + item.id}
                                menuLink={"/products/images/" + item.id}
                              />
                              <ActionButtonMenu
                                menuName={"Delete"}
                                menuTarget={"#deleteProduct" + item.id}
                              />
                              <ActionButtonMenu
                                menuName={"Send Email"}
                                menuTarget={"#sendEmailProduct" + item.id}
                              />
                            </ActionButton>
                          </td>
                          <EditProduct
                            item={item}
                            getProducts={getProducts}
                            categories={categories}
                            suppliers={suppliers}
                            brands={brands}
                          />
                          <DeleteProduct
                            item={item}
                            getProducts={getProducts}
                          />
                          <SendEmail
                            uri={`/api/v1/products-email/${item.id}`}
                            item={item}
                            getData={getProducts}
                            modalId={`sendEmailProduct${item.id}`}
                            modalHeader={"Send mail to subscribers"}
                            // getProducts={getProducts}
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
                      <th>Code</th>
                      <th>Barcode</th>
                      <th>User</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Subcategory</th>
                      <th>Sub2category</th>
                      <th>Supplier</th>
                      <th>Variants</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>Images</th>
                      {/* <th></th>
                      <th></th>
                      <th></th> */}
                      <th>Active?</th>
                      <th>Featured?</th>
                      <th>Trending?</th>
                      <th>View Count</th>
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

export default ProductList;
