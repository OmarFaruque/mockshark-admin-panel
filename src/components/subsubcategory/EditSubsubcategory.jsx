import React, { useEffect, useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const editSubsubcategory = async (
  name,
  categoryId,
  subcategoryId,
  image,
  isActive,
  item,
  setLoader,
  getSubsubcategories,
  modalCloseButton
) => {
  setLoader(true);

  const formData = new FormData();

  formData.append("name", name);
  formData.append("categoryId", categoryId);
  formData.append("subcategoryId", subcategoryId);
  //   formData.append("subtitle", subtitle);
  formData.append("isActive", isActive);

  if (image !== item.image) {
    formData.append("image", image);
  }

  const jsonData = await fetchData(
    `/api/v1/subsubcategories/${item.id}`,
    "PUT",
    formData,
    true
  );

  const message = jsonData.message;
  const success = jsonData.success;

  if (!success) {
    setLoader(false);
    showErrorToast(message);
    // eslint-disable-next-line no-throw-literal
    throw {
      message,
    };
  }

  setLoader(false);
  showSuccessToast(message);

  //fetch data
  getSubsubcategories();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const EditSubsubcategory = ({ item, getSubsubcategories, categories }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(item.name);
  const [categoryId, setCategoryId] = useState(item.categoryId);
  const [subcategoryId, setSubcategoryId] = useState(item.subcategoryId);
  const [subcategories, setSubcategories] = useState([]);
  const [isActive, setIsActive] = useState(item.isActive);
  const [image, setImage] = useState(item.image);
  const [tempImageUrl, setTempImageUrl] = useState(item.image);

  const modalCloseButton = useRef();

  const getSubcategoriesByCategory = (catId) => {
    setLoader(true);

    fetchData(`/api/v1/subcategoriesByCategory/${catId}`, "GET")
      .then((result) => {
        if (result.success) {
          setSubcategories(result.data);
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
  };

  useEffect(() => {
    if (item.categoryId) {
      getSubcategoriesByCategory(item?.categoryId);
    }
    return () => setSubcategories([]);
  }, []);

  return (
    <>
      <Modal
        modalId={"editSubsubcategory" + item.id}
        modalHeader={"Edit Subsubcategory"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Category</label>
          <select
            name="categoryId"
            id="categoryId"
            className="form-control"
            onChange={(e) => {
              setCategoryId(e.target.value);
              getSubcategoriesByCategory(e.target.value);
            }}
          >
            {/* <option value="true">Yes</option>
            <option value="false">No</option> */}

            {categories &&
              categories.map((category, index) => (
                <>
                  <option
                    value={category?.id}
                    key={category?.id + index}
                    selected={category?.id === categoryId}
                  >
                    {category?.name}
                  </option>
                </>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Subcategory</label>
          <select
            name="subcategoryId"
            id="subcategoryId"
            className="form-control"
            onChange={(e) => setSubcategoryId(e.target.value)}
          >
            {/* <option value="true">Yes</option>
            <option value="false">No</option> */}

            <option value="">Select subcategory</option>
            {subcategories &&
              subcategories.map((subcategory, index) => (
                <>
                  <option
                    value={subcategory?.id}
                    key={subcategory?.id + index}
                    selected={subcategory?.id === subcategoryId}
                  >
                    {subcategory?.name}
                  </option>
                </>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Active?</label>
          <select
            className="form-control default-select"
            onChange={(e) => setIsActive(e.target.value)}
          >
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
            {/* {[
                            { id: 1, value: true, label: 'Yes' },
                            { id: 2, value: false, label: 'No' },
                        ].map((itm, index) => (
                            <option
                                key={itm.id}
                                value={itm.value}
                                selected={itm.value === item.isCuratedCustomService ? true : false}
                            >
                                {itm.label}
                            </option>
                        ))} */}
          </select>
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setTempImageUrl(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {tempImageUrl && (
            <>
              <img
                src={tempImageUrl}
                alt="image"
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "contain",
                }}
              />
            </>
          )}
        </div>

        {loader === true ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className="form-group">
              <Button
                buttonOnClick={() =>
                  editSubsubcategory(
                    name,
                    categoryId,
                    subcategoryId,
                    image,
                    isActive,
                    item,
                    setLoader,
                    getSubsubcategories,
                    modalCloseButton
                  )
                }
                buttonText={"Update"}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default EditSubsubcategory;
