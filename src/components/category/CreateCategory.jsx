import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const createCategory = async (
  name,
  image,
  isActive,
  setLoader,
  modalCloseButton,
  getCategories
) => {
  setLoader(true);

  const formData = new FormData();

  formData.append("name", name);
  //   formData.append("subtitle", subtitle);
  if (image) {
    formData.append("image", image);
  }
  formData.append("isActive", isActive);

  const jsonData = await fetchData(
    "/api/v1/categories",
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
  getCategories();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const CreateCategory = ({ getCategories }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState("true");
  const [tempImages, setTempImages] = useState([]);
  const [image, setImage] = useState("");
  const [tempImageUrl, setTempImageUrl] = useState("");

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"createCategory"}
        modalHeader={"Create Category"}
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
                  createCategory(
                    name,
                    image,
                    isActive,
                    setLoader,
                    modalCloseButton,
                    getCategories
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

export default CreateCategory;
