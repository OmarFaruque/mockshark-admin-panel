import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const deleteSubcategory = async (
  item,
  setLoader,
  getSubcategories,
  modalCloseButton
) => {
  setLoader(true);

  const jsonData = await fetchData(
    `/api/v1/subcategories/${item.id}`,
    "DELETE"
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

const DeleteSubcategory = ({ item, getSubcategories }) => {
  const [loader, setLoader] = useState(false);
  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"deleteSubcategory" + item.id}
        modalHeader={"Delete Subcategory"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Want to delete this?</label>
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
                  deleteSubcategory(
                    item,
                    setLoader,
                    getSubcategories,
                    modalCloseButton
                  )
                }
                buttonText={"Delete"}
                buttonColor={"btn-danger"}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default DeleteSubcategory;
