import React, { useEffect, useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const editCoupon = async (
  name,
  code,
  orderPriceLimit,
  discountAmount,
  //   subtitle,
  //   image,
  isActive,
  item,
  setLoader,
  getCoupons,
  modalCloseButton
) => {
  setLoader(true);

  //   const formData = new FormData();

  //   formData.append("name", name);
  //   formData.append("code", code);
  //   formData.append("orderPriceLimit", orderPriceLimit);
  //   formData.append("discountAmount", discountAmount);
  //   //   formData.append("subtitle", subtitle);
  //   formData.append("isActive", isActive);

  //   if (image !== item.image) {
  //     formData.append("image", image);
  //   }

  const jsonData = await fetchData(`/api/v1/coupons/${item.id}`, "PUT", {
    name,
    code,
    orderPriceLimit: Number(orderPriceLimit),
    discountAmount: Number(discountAmount),
    isActive,
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
  getCoupons();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const EditCoupon = ({ item, itemId, getCoupons }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(item.name);
  const [code, setCode] = useState(item.code);
  const [orderPriceLimit, setOrderPriceLimit] = useState(item.orderPriceLimit);
  const [discountAmount, setDiscountAmount] = useState(item.discountAmount);
  //   const [subtitle, setSubtitle] = useState(item.subtitle);
  const [isActive, setIsActive] = useState(item.isActive);
  //   const [image, setImage] = useState(item.image);
  //   const [tempImageUrl, setTempImageUrl] = useState(item.image);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setName(item.name);
    setCode(item.code);
    setOrderPriceLimit(item.orderPriceLimit);
    setDiscountAmount(item.discountAmount);
    // setSubtitle(item.subtitle);
    setIsActive(item.isActive);
    // setImage(item.image);
  }, [itemId]);

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"editCoupon" + item.id}
        modalHeader={"Edit Coupon"}
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
          <label className="text-black font-w500">Code</label>
          <input
            type="text"
            className="form-control"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Order Price Limit</label>
          <input
            type="number"
            className="form-control"
            value={orderPriceLimit}
            onChange={(e) => setOrderPriceLimit(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Discount Amount</label>
          <input
            type="number"
            className="form-control"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
          />
        </div>

        {/* <div className="form-group">
          <label className="text-black font-w500">Subtitle</label>
          <input
            type="text"
            className="form-control"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div> */}

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

        {/* <div className="form-group">
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
        </div> */}

        {loader === true ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className="form-group">
              <Button
                buttonOnClick={() =>
                  editCoupon(
                    name,
                    code,
                    orderPriceLimit,
                    discountAmount,
                    // subtitle,
                    // image,
                    isActive,
                    item,
                    setLoader,
                    getCoupons,
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

export default EditCoupon;
