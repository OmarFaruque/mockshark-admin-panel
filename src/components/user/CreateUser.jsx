import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const createUser = async (
  name,
  email,
  phone,
  address,
  billingAddress,
  country,
  city,
  roleId,
  initialPaymentAmount,
  initialPaymentDue,
  installmentTime,
  setLoader,
  modalCloseButton,
  getUsers
) => {
  setLoader(true);

  const jsonData = await fetchData("/api/v1/auth/register", "POST", {
    name,
    email,
    phone,
    address,
    billingAddress,
    country,
    city,
    roleId,
    initialPaymentAmount: parseFloat(initialPaymentAmount),
    initialPaymentDue: parseFloat(initialPaymentDue),
    installmentTime: parseFloat(installmentTime),
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
  getUsers();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const CreateUser = ({ getUsers, roles }) => {
  const [loader, setLoader] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [initialPaymentAmount, setInitialPaymentAmount] = useState("");
  const [initialPaymentDue, setInitialPaymentDue] = useState("");
  const [installmentTime, setInstallmentTime] = useState("");

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"createUser"}
        modalHeader={"Create User"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Role</label>
          <select
            name="role"
            id="role"
            className="form-control"
            onChange={(e) => setRoleId(e.target.value)}
          >
            <option value="">Select a role</option>

            {roles &&
              roles.map((role, index) => (
                <>
                  <option value={role?.id} key={role?.id + index}>
                    {role?.name}
                  </option>
                </>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label className="text-black font-w500">User Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label className="text-black font-w500">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-black font-w500">Billing Address</label>
          <input
            type="text"
            className="form-control"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-black font-w500">Country</label>
          <input
            type="text"
            className="form-control"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-black font-w500">City</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-black font-w500">Initial Payment Amount</label>
          <input
            type="text"
            className="form-control"
            value={initialPaymentAmount}
            onChange={(e) => setInitialPaymentAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-black font-w500">Initial Payment Due</label>
          <input
            type="text"
            className="form-control"
            value={initialPaymentDue}
            onChange={(e) => setInitialPaymentDue(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-black font-w500">Installment Time</label>
          <input
            type="text"
            className="form-control"
            value={installmentTime}
            onChange={(e) => setInstallmentTime(e.target.value)}
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
                  createUser(
                    name,
                    email,
                    phone,
                    address,
                    billingAddress,
                    country,
                    city,
                    roleId,
                    initialPaymentAmount,
                    initialPaymentDue,
                    installmentTime,
                    setLoader,
                    modalCloseButton,
                    getUsers
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

export default CreateUser;
