import React, { useRef, useState } from "react";
import Modal from "../global/Modal";
import fetchData from "../../libs/api";
import Loader from "../global/Loader";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";

const editModule = async (
  name,
  item,
  setLoader,
  getModules,
  modalCloseButton
) => {
  setLoader(true);

  const jsonData = await fetchData(`/api/v1/auth/modules/${item.id}`, "PUT", {
    name,
  });

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
  getModules();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const EditModule = ({ item, getModules }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(item.name);

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"editModule" + item.id}
        modalHeader={"Edit Module"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Module Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
                  editModule(
                    name,
                    item,
                    setLoader,
                    getModules,
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

export default EditModule;
