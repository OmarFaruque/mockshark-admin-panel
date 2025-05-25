import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const createBrand = async (
  name,
  //   slug,
  image,
  isActive,
  getBrands,
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

  const formData = new FormData();

  formData.append("name", name);
  //   formData.append("subtitle", subtitle);
  if (image) {
    formData.append("image", image);
  }
  formData.append("isActive", isActive);

  const jsonData = await fetchData("/api/v1/brands", "POST", formData, true);

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
  getBrands();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

// let images = [];

const CreateBrand = ({ getBrands }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  //   const [subtitle, setSubtitle] = useState("");
  const [isActive, setIsActive] = useState("true");
  const [tempImages, setTempImages] = useState([]);
  const [image, setImage] = useState("");
  const [tempImageUrl, setTempImageUrl] = useState("");

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
        modalId={"createBrand"}
        modalHeader={"Create Brand"}
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

        <div className="form-group">
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
                  createBrand(
                    name,
                    // subtitle,
                    image,
                    isActive,
                    getBrands,
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

export default CreateBrand;
