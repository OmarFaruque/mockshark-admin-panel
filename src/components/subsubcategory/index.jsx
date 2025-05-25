import React, { useCallback, useEffect, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import "../css/category-list.css";
import ActionButton from "../global/ActionButton";
import ActionButtonMenu from "../global/ActionButtonMenu";
import Button from "../global/Button";
import CardHeader from "../global/CardHeader";
import IndianaDragScroller from "../global/IndianaDragScroller";
import Searchbar from "../global/Searchbar";
import CreateSubsubcategory from "./CreateSubsubcategory";
import DeleteSubsubcategory from "./DeleteSubsubcategory";
import EditSubsubcategory from "./EditSubsubcategory";

const SubsubcategoryList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [selectedQuery, setSelectedQuery] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const loadMoreSubsubcategory = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const getSubsubcategories = useCallback(() => {
    setLoader(true);

    fetchData(
      `/api/v1/subsubcategories?name=${
        selectedQuery === "name" ? searchTerm : ""
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
    const getSubsubcategoriesDebounce = setTimeout(() => {
      getSubsubcategories();
    }, 500);

    return () => clearTimeout(getSubsubcategoriesDebounce);
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

  return (
    <>
      {/* add modal */}
      <CreateSubsubcategory
        getSubsubcategories={getSubsubcategories}
        categories={categories}
      />

      {/* table */}
      <div className="col-lg-12">
        <div className="card">
          <CardHeader
            title={"Subsubcategories"}
            modalId={"#createSubsubcategory"}
            buttonText={"+"}
            btnClass={"btnAdd"}
            totalCount={data ? data.length : 0}
          >
            <Searchbar
              queries={["name"]}
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
                      <th>Slug</th>
                      <th>Category</th>
                      <th>Subcategory</th>
                      <th>Image</th>
                      <th>Active?</th>
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
                          <td>{item.slug}</td>
                          <td>{item?.category?.name}</td>
                          <td>{item?.subcategory?.name}</td>
                          <td>
                            {item?.image && (
                              <img
                                src={item?.image}
                                alt="subsubcategory image"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "contain",
                                }}
                              />
                            )}
                          </td>
                          <td>{item.isActive ? "Active" : "Inactive"}</td>

                          <td>
                            <ActionButton>
                              <ActionButtonMenu
                                menuName={"Edit"}
                                menuTarget={"#editSubsubcategory" + item.id}
                              />
                              <ActionButtonMenu
                                menuName={"Delete"}
                                menuTarget={"#deleteSubsubcategory" + item.id}
                              />
                            </ActionButton>
                          </td>
                          <EditSubsubcategory
                            item={item}
                            getSubsubcategories={getSubsubcategories}
                            categories={categories}
                          />
                          <DeleteSubsubcategory
                            item={item}
                            getSubsubcategories={getSubsubcategories}
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
                      <th>Slug</th>
                      <th>Category</th>
                      <th>Subcategory</th>
                      <th>Image</th>
                      <th>Active?</th>
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
                      buttonOnClick={() => loadMoreSubsubcategory()}
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

export default SubsubcategoryList;
