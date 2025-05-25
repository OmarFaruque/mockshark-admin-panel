import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const sendEmail = async (uri, setLoader, getData, modalCloseButton) => {
  setLoader(true);

  const jsonData = await fetchData(`${uri}`, "GET");

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
  getData();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const SendEmail = ({ uri, getData, modalId, modalHeader }) => {
  const [loader, setLoader] = useState(false);
  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={modalId}
        modalHeader={modalHeader}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">
            Want to notify/send email to subscribers about this?
          </label>
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
                  sendEmail(uri, setLoader, getData, modalCloseButton)
                }
                buttonText={"Send Email"}
                buttonColor={"btn-danger"}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default SendEmail;
