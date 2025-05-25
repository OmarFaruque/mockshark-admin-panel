import React, { useRef, useState } from "react";
import Modal from "../global/Modal";
import fetchData from "../../libs/api";
import Loader from "../global/Loader";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";

const editMonthlyPayment = async (
  userId,
  date,
  amount,
  due,
  item,
  setLoader,
  getMonthlyPayments,
  modalCloseButton
) => {
  setLoader(true);

  const jsonData = await fetchData(
    `/api/v1/payments/${item.id}/monthly/`,
    "PUT",
    {
      userId,
      date: new Date(date).toISOString(),
      amount: parseFloat(amount),
      due: parseFloat(due),
    }
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
  getMonthlyPayments();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const EditMonthlyPayment = ({ item, getMonthlyPayments }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(item.name);
  const [date, setDate] = useState(item.date);
  const [amount, setAmount] = useState(item.amount);
  const [due, setDue] = useState(item.due);

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"editMonthlyPayment" + item.id}
        modalHeader={"Edit Monthly Payment"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Date</label>
          <input
            type="date"
            className="form-control"
            defaultValue={date.substring(0, 10)}
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
                  editMonthlyPayment(
                    item.user.id,
                    date,
                    amount,
                    due,
                    item,
                    setLoader,
                    getMonthlyPayments,
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

export default EditMonthlyPayment;
