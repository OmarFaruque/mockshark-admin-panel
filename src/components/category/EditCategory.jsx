import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const editCategory = async (
  name,
  image,
  isActive,
  item,
  setLoader,
  getCategories,
  modalCloseButton
) => {
  setLoader(true);

  const formData = new FormData();

  formData.append("name", name);
  //   formData.append("subtitle", subtitle);
  formData.append("isActive", isActive);

  if (image !== item.image) {
    formData.append("image", image);
  }

  const jsonData = await fetchData(
    `/api/v1/categories/${item.id}`,
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
  getCategories();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const EditCategory = ({ item, getCategories }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(item.name);
  const [isActive, setIsActive] = useState(item.isActive);
  const [image, setImage] = useState(item.image);
  const [tempImageUrl, setTempImageUrl] = useState(item.image);

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"editCategory" + item.id}
        modalHeader={"Edit Category"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Category Name</label>
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
                  editCategory(
                    name,
                    image,
                    isActive,
                    item,
                    setLoader,
                    getCategories,
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

export default EditCategory;
