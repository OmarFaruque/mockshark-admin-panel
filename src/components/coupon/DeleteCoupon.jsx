import React, { useEffect, useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const deleteCoupon = async (
  item,
  id,
  setLoader,
  getCoupons,
  modalCloseButton
) => {
  setLoader(true);

  const jsonData = await fetchData(`/api/v1/coupons/${id}`, "DELETE");

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
  getCoupons();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const DeleteCoupon = ({ item, itemId, getCoupons }) => {
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(item.id);
  const modalCloseButton = useRef();

  useEffect(() => {
    setId(itemId);
  }, [itemId]);

  return (
    <>
      <Modal
        modalId={"deleteCoupon" + id}
        modalHeader={"Delete Coupon"}
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
                  deleteCoupon(
                    item,
                    id,
                    setLoader,
                    getCoupons,
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

export default DeleteCoupon;
