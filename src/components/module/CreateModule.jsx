import React, { useRef, useState } from "react";
import Modal from "../global/Modal";
import fetchData from "../../libs/api";
import Loader from "../global/Loader";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";

const createModule = async (name, getModules, setLoader, modalCloseButton) => {
  setLoader(true);

  const jsonData = await fetchData("/api/v1/auth/modules", "POST", { name });

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

const CreateModule = ({ getModules }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"createModule"}
        modalHeader={"Create Module"}
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
                  createModule(name, getModules, setLoader, modalCloseButton)
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

export default CreateModule;
