import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const deleteSubsubcategory = async (
  item,
  setLoader,
  getSubsubcategories,
  modalCloseButton
) => {
  setLoader(true);

  const jsonData = await fetchData(
    `/api/v1/subsubcategories/${item.id}`,
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
  getSubsubcategories();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const DeleteSubsubcategory = ({ item, getSubsubcategories }) => {
  const [loader, setLoader] = useState(false);
  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"deleteSubsubcategory" + item.id}
        modalHeader={"Delete Subsubcategory"}
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
                  deleteSubsubcategory(
                    item,
                    setLoader,
                    getSubsubcategories,
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

export default DeleteSubsubcategory;
