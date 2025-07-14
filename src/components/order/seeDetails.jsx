import React, { useRef } from "react";
import Modal from "../global/Modal";
import IndianaDragScroller from "../global/IndianaDragScroller";

const statusList = [
  { id: 1, name: "PENDING" }, //orange
  { id: 2, name: "INPROGRESS" }, //blue
  { id: 3, name: "DELIVERED" }, // green
  { id: 4, name: "CANCELED" }, // red
];

const SeeDetails = ({ item }) => {
  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"seeDetails" + item.id}
        modalHeader={"INVOICE #" + item.invoiceNumber}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <p className="text-black font-w500">Name: {item.billingFirstName}</p>
          <p>Phone: {item.billingPhone}</p>
          <p>Email: {item.billingEmail}</p>
          <p>Address: {item.address}</p>
          <p>Postal Code: {item.postalCode}</p>
          <p>Total Item: {item.totalItems}</p>
          <p>Order Date: {item.createdAt}</p>

          <p className="text-black font-w500">Order Items</p>
          <IndianaDragScroller>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Varrient</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  {/* <th>Discounted Price</th> */}
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {item.orderItems?.map((orderItem, index) => (
                  <tr>
                    <td>{orderItem.name}</td>
                    <td>{orderItem.size}</td>
                    <td>{orderItem.quantity}</td>
                    <td>{orderItem.costPrice}</td>
                    {/* <td>{orderItem.discountedRetailPrice}</td> */}
                    <td>{orderItem.totalCostPrice}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Subtotal:</th>
                  <th>{item.subtotalCost}</th>
                </tr>
              </tfoot>
            </table>
          </IndianaDragScroller>
        </div>
      </Modal>
    </>
  );
};

export default SeeDetails;
