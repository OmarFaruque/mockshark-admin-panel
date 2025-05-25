import React, { useCallback, useEffect, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import "../css/category-list.css";
// import CreateProduct from "./CreateProduct";
import Button from "../global/Button";
import CardHeader from "../global/CardHeader";
import IndianaDragScroller from "../global/IndianaDragScroller";
// import CreateProduct from "./CreateProduct";
// import DeleteProduct from "./DeleteProduct";
// import EditProduct from "./EditProduct";

const PreorderList = () => {
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

  const loadMorePreorder = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const getPreorders = useCallback(() => {
    setLoader(true);

    fetchData(
      `/api/v1/preorders?${selectedQuery}=${
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
      getPreorders();
    }, 500);
    console.log(selectedQuery);
    console.log(searchTerm);
    return () => clearTimeout(getProductsDebounce);
  }, [selectedQuery, searchTerm, page, limit]);

  return (
    <>
      {/* add modal */}
      {/* <CreateProduct
        getProducts={getProducts}
        categories={categories}
        campaigns={campaigns}
        suppliers={suppliers}
        brands={brands}
      /> */}

      {/* table */}
      <div className="col-lg-12">
        <div className="card">
          <CardHeader
            title={"Preorders"}
            modalId={"#createPreorder"}
            buttonText={"+"}
            btnClass={"btnAdd"}
            totalCount={data ? data.length : 0}
            hasButton={false}
          >
            {/* <Searchbar
              queries={["name", "product_code", "barcode"]}
              selectedQuery={selectedQuery}
              setSelectedQuery={setSelectedQuery}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            /> */}
          </CardHeader>

          <div className="card-body">
            <div className="table-responsive">
              <IndianaDragScroller>
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
                      <th className="width80">#</th>
                      <th>Product Name</th>
                      <th>Username</th>
                      <th>Date</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {data ? (
                      data?.map((item, index) => (
                        <tr key={item.id + index}>
                          <td>
                            <strong>{index + 1}</strong>
                          </td>
                          <td>{item?.product?.name}</td>
                          <td>{item?.user?.name}</td>
                          <td>{item?.createdAt}</td>

                          {/* <td>
                            <ActionButton>
                              <ActionButtonMenu
                                menuName={"See Details"}
                                menuLink={"/dashboard"}
                              />
                              <ActionButtonMenu
                                menuName={"Edit"}
                                menuTarget={"#editProduct" + item.id}
                              />
                              <ActionButtonMenu
                                menuName={"Delete"}
                                menuTarget={"#deleteProduct" + item.id}
                              />
                            </ActionButton>
                          </td> */}
                          {/* <EditProduct
                            item={item}
                            getProducts={getProducts}
                            categories={categories}
                            suppliers={suppliers}
                            brands={brands}
                          />
                          <DeleteProduct
                            item={item}
                            getProducts={getProducts}
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
                      <th>Product Name</th>
                      <th>Username</th>
                      <th>Date</th>
                      {/* <th>Action</th> */}
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
                      buttonOnClick={() => loadMorePreorder()}
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

export default PreorderList;
