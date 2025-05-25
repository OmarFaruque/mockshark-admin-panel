import React, { useRef, useState } from "react";
import Modal from "../global/Modal";
import fetchData from "../../libs/api";
import Loader from "../global/Loader";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";

const deleteUser = async (item, setLoader, getUsers, modalCloseButton) => {
  setLoader(true);

  const jsonData = await fetchData(`/api/v1/auth/users/${item.id}`, "DELETE");

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
  getUsers();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const DeleteUser = ({ item, getUsers }) => {
  const [loader, setLoader] = useState(false);
  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"deleteUser" + item.id}
        modalHeader={"Delete User"}
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
                  deleteUser(item, setLoader, getUsers, modalCloseButton)
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

export default DeleteUser;
