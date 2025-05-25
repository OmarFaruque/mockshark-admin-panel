import React, { useEffect, useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const editBanner = async (
  title,
  subtitle,
  url,
  image,
  isActive,
  item,
  setLoader,
  getBanners,
  modalCloseButton
) => {
  setLoader(true);

  const formData = new FormData();

  formData.append("title", title);
  formData.append("subtitle", subtitle);
  formData.append("url", url);
  formData.append("isActive", isActive);

  if (image !== item.image) {
    formData.append("image", image);
  }

  const jsonData = await fetchData(
    `/api/v1/banners/${item.id}`,
    "PUT",
    formData,
    true
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
  getBanners();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const EditBanner = ({ item, itemId, getBanners }) => {
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [subtitle, setSubtitle] = useState(item.subtitle);
  const [url, setUrl] = useState(item.url);
  const [isActive, setIsActive] = useState(item.isActive);
  const [image, setImage] = useState(item.image);
  const [tempImageUrl, setTempImageUrl] = useState(item.image);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTitle(item.title);
    setSubtitle(item.subtitle);
    setUrl(item.url);
    setIsActive(item.isActive);
    setImage(item.image);
  }, [itemId]);

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"editBanner" + item.id}
        modalHeader={"Edit Banner"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Subtitle</label>
          <input
            type="text"
            className="form-control"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Url</label>
          <input
            type="text"
            className="form-control"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

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
                  editBanner(
                    title,
                    subtitle,
                    url,
                    image,
                    isActive,
                    item,
                    setLoader,
                    getBanners,
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

export default EditBanner;
