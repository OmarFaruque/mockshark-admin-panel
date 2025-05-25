import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const editUser = async (
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
  item,
  setLoader,
  getUsers,
  modalCloseButton
) => {
  setLoader(true);

  const jsonData = await fetchData(`/api/v1/auth/users/${item.id}`, "PUT", {
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

const EditUser = ({ item, getUsers, roles }) => {
  const [loader, setLoader] = useState(false);
  const [roleId, setRoleId] = useState(item.roleId);
  const [name, setName] = useState(item.name);
  const [email, setEmail] = useState(item.email);
  const [phone, setPhone] = useState(item.phone);
  const [address, setAddress] = useState(item.address);
  const [billingAddress, setBillingAddress] = useState(item.billingAddress);
  const [country, setCountry] = useState(item.country);
  const [city, setCity] = useState(item.city);
  const [initialPaymentAmount, setInitialPaymentAmount] = useState(
    item.initialPaymentAmount
  );
  const [initialPaymentDue, setInitialPaymentDue] = useState(
    item.initialPaymentDue
  );
  const [installmentTime, setInstallmentTime] = useState(item.installmentTime);

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"editUser" + item.id}
        modalHeader={"Edit User"}
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
                  <option
                    value={role?.id}
                    key={role?.id + index}
                    selected={roleId === role?.id}
                  >
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
                  editUser(
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
                    item,
                    setLoader,
                    getUsers,
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

export default EditUser;
