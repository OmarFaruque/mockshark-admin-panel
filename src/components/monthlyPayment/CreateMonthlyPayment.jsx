import React, { useRef, useState } from "react";
import Modal from "../global/Modal";
import fetchData from "../../libs/api";
import Loader from "../global/Loader";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";

const createMonthlyPayment = async (
  userId,
  date,
  amount,
  due,
  getMonthlyPayments,
  setLoader,
  modalCloseButton
) => {
  setLoader(true);

  const jsonData = await fetchData("/api/v1/payments/monthly", "POST", {
    userId,
    date: new Date(date).toISOString(),
    amount: parseFloat(amount),
    due: parseFloat(due),
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
  getMonthlyPayments();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const CreateMonthlyPayment = ({ users, getMonthlyPayments }) => {
  const [loader, setLoader] = useState(false);

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [due, setDue] = useState("");
  const [userId, setUserId] = useState("");

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"createMonthlyPayments"}
        modalHeader={"Create Monthly Payment"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Users</label>
          <select
            name="user"
            id="user"
            className="form-control"
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select a user</option>
            {users &&
              users.map((user, index) => (
                <>
                  <option
                    value={user?.id}
                    key={user?.id + index}
                    selected={userId === user?.id}
                  >
                    {user?.name}
                  </option>
                </>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label className="text-black font-w500">Date</label>
          <input
            type="date"
            className="form-control"
            value={date.substring(0, 10)}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-black font-w500">Amount</label>
          <input
            type="text"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-black font-w500">Due</label>
          <input
            type="text"
            className="form-control"
            value={due}
            onChange={(e) => setDue(e.target.value)}
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
                  createMonthlyPayment(
                    userId,
                    date,
                    amount,
                    due,
                    getMonthlyPayments,
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

export default CreateMonthlyPayment;
