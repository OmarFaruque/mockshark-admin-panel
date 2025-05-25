import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const statusList = [
  { id: 1, name: "PENDING" }, //orange
  { id: 2, name: "SHIPPED" }, //blue
  { id: 3, name: "DELIVERED" }, // green
  { id: 4, name: "CANCELED" }, // red
  { id: 5, name: "RETURNED" }, // red
];

const editOrder = async (
  status,
  item,
  setLoader,
  getOrders,
  modalCloseButton
) => {
  setLoader(true);

  const jsonData = await fetchData(`/api/v1/orders/${item.id}`, "PUT", {
    status,
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
  getOrders();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const EditOrder = ({ item, getOrders }) => {
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState(item.status);

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"editStatus" + item.id}
        modalHeader={"Edit Status"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Order Status</label>
          <select
            name="role"
            id="role"
            className="form-control"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={status}>{status}</option>

            {statusList.map((status, index) => (
              <>
                <option
                  value={status?.name}
                  key={status?.id + index}
                  selected={status === status?.id}
                >
                  {status?.name}
                </option>
              </>
            ))}
          </select>
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
                  editOrder(
                    status,
                    item,
                    setLoader,
                    getOrders,
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

export default EditOrder;
