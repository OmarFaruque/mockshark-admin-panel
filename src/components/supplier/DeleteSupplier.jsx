import React, { useRef, useState } from "react";
import Modal from "../global/Modal";
import fetchData from "../../libs/api";
import Loader from "../global/Loader";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";

const deleteSupplier = async (
  item,
  setLoader,
  getSuppliers,
  modalCloseButton
) => {
  setLoader(true);

  const jsonData = await fetchData(`/api/v1/suppliers/${item.id}`, "DELETE");

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
  getSuppliers();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const DeleteSupplier = ({ item, getSuppliers }) => {
  const [loader, setLoader] = useState(false);
  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"deleteSupplier" + item.id}
        modalHeader={"Delete Supplier"}
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
                  deleteSupplier(
                    item,
                    setLoader,
                    getSuppliers,
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

export default DeleteSupplier;
