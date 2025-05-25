import React, { useRef, useState } from "react";
import Modal from "../global/Modal";
import fetchData from "../../libs/api";
import Loader from "../global/Loader";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";

const editSupplier = async (
  name,
  address,
  phone,
  email,
  item,
  setLoader,
  getSuppliers,
  modalCloseButton
) => {
  setLoader(true);

  const jsonData = await fetchData(`/api/v1/suppliers/${item.id}`, "PUT", {
    name,
    address,
    phone,
    email,
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
  getSuppliers();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const EditSupplier = ({ item, getSuppliers }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(item.name);
  const [address, setAddress] = useState(item.address);
  const [phone, setPhone] = useState(item.phone);
  const [email, setEmail] = useState(item.email);

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"editSupplier" + item.id}
        modalHeader={"Edit Supplier"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Supplier Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-black font-w500">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-black font-w500">Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-black font-w500">Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
                  editSupplier(
                    name,
                    address,
                    phone,
                    email,
                    item,
                    setLoader,
                    getSuppliers,
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

export default EditSupplier;
