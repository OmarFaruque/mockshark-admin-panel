import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const createSubcategory = async (
  name,
  categoryId,
  image,
  isActive,
  setLoader,
  modalCloseButton,
  getSubcategories
) => {
  setLoader(true);

  const formData = new FormData();

  formData.append("name", name);
  formData.append("categoryId", categoryId);
  //   formData.append("subtitle", subtitle);
  if (image) {
    formData.append("image", image);
  }
  formData.append("isActive", isActive);

  const jsonData = await fetchData(
    "/api/v1/subcategories",
    "POST",
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
  getSubcategories();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const CreateSubcategory = ({ getSubcategories, categories }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isActive, setIsActive] = useState("true");
  const [tempImages, setTempImages] = useState([]);
  const [image, setImage] = useState("");
  const [tempImageUrl, setTempImageUrl] = useState("");

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"createSubcategory"}
        modalHeader={"Create Subcategory"}
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
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {/* <option value="true">Yes</option>
            <option value="false">No</option> */}

            <option value="">Select a category</option>
            {categories &&
              categories.map((category, index) => (
                <>
                  <option value={category?.id} key={category?.id + index}>
                    {category?.name}
                  </option>
                </>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Active?</label>
          <select
            name="isActive"
            id="isActive"
            className="form-control"
            onChange={(e) => setIsActive(e.target.value)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>

            {/* {categories &&
              categories.map((category, index) => (
                <>
                  <option value={category?.id} key={category?.id + index}>
                    {category?.name}
                  </option>
                </>
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
                  createSubcategory(
                    name,
                    categoryId,
                    image,
                    isActive,
                    setLoader,
                    modalCloseButton,
                    getSubcategories
                  )
                }
                buttonText={"Submit"}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default CreateSubcategory;
