import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const createCoupon = async (
  name,
  code,
  orderPriceLimit,
  discountAmount,
  //   slug,
  //   image,
  isActive,
  getCoupons,
  setLoader,
  modalCloseButton
) => {
  setLoader(true);

  //   console.log("here");
  //   if (totalImages?.length < 1) {
  //     showErrorToast("Please select an image");
  //     return;
  //   }

  //   let totalImages = [];
  //   let imagesLen = images.length;

  //   for (let j = 0; j < imagesLen; j++) {
  //     totalImages.push({ image: images[j].name.split(".")[0] });
  //   }

  //   const formData = new FormData();

  //   formData.append("name", name);
  //   formData.append("code", code);
  //   formData.append("orderPriceLimit", orderPriceLimit);
  //   formData.append("discountAmount", discountAmount);
  //   formData.append("subtitle", subtitle);
  //   if (image) {
  //     formData.append("image", image);
  //   }
  //   formData.append("isActive", isActive);

  const jsonData = await fetchData("/api/v1/coupons", "POST", {
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

// let images = [];

const CreateCoupon = ({ getCoupons }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [orderPriceLimit, setOrderPriceLimit] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  //   const [subtitle, setSubtitle] = useState("");
  const [isActive, setIsActive] = useState("true");
  //   const [tempImages, setTempImages] = useState([]);
  //   const [image, setImage] = useState("");
  //   const [tempImageUrl, setTempImageUrl] = useState("");

  const modalCloseButton = useRef();

  //   const removeImage = (image, ind) => {
  //     tempImages.splice(ind, 1);

  //     images.splice(ind, 1);

  //     setTempImages([...tempImages]);
  //   };

  //   const handleImages = (e) => {
  //     const lenghtOfFiles = e.target.files.length;

  //     if (lenghtOfFiles > 3) {
  //       showErrorToast("You cannot upload more than 3 images");

  //       return false;
  //     }

  //     let temporaryImages = [];

  //     for (let i = 0; i < lenghtOfFiles; i++) {
  //       setTempImages([...tempImages, URL.createObjectURL(e.target.files[i])]);
  //       temporaryImages.push(URL.createObjectURL(e.target.files[i]));

  //       images.push(e.target.files[i]);
  //     }

  //     setTempImages([...temporaryImages, ...tempImages]);
  //   };

  return (
    <>
      <Modal
        modalId={"createCoupon"}
        modalHeader={"Create Coupon"}
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
            name="isActive"
            id="isActive"
            className="form-control"
            onChange={(e) => setIsActive(e.target.value)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>

            {/* {categories &&
              categories.map((category, index) => (
                <>
                  <option value={category?.id} key={category?.id + index}>
                    {category?.name}
                  </option>
                </>
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
                  createCoupon(
                    name,
                    code,
                    orderPriceLimit,
                    discountAmount,
                    // subtitle,
                    // image,
                    isActive,
                    getCoupons,
                    setLoader,
                    modalCloseButton
                  )
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

export default CreateCoupon;
