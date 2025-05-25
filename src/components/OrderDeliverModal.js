import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";

const OrderDeliverModal = ({ order_id, get_data }) => {
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);

  //delivered order
  async function orderDelivered(id) {
    setLoader1(true);
    let result = await fetch(AppUrl.base_url + "orderDeliver/" + id, {
      method: "POST",
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setLoader1(false);
    } else {
      toast.error(result.error);
      setLoader1(false);
    }

    get_data();

    let blur_bg = document.getElementById("orderDeliverModal" + id);
    blur_bg.click();
  }

  //cancel order
  async function orderCancelled(id) {
    setLoader2(true);
    let result = await fetch(AppUrl.base_url + "orderCancel/" + id, {
      method: "POST",
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setLoader2(false);
    } else {
      toast.error(result.error);
      setLoader2(false);
    }

    get_data();

    let blur_bg = document.getElementById("orderDeliverModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <ToastContainer />
      <div className="modal fade" id={"orderDeliverModal" + order_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Order Status</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">
                    Want to make this order delivered or cancelled?
                  </label>
                </div>

                {/* <div className="form-group">
                  <label className="text-black font-w500">Category Icon</label>
                  <select
                    name="cat_icon"
                    id="cat_icon"
                    className="form-control"
                  >
                    <option value="">Select an icon</option>
                    <option value="glass">
                      <i className="fas fa-glass"></i>
                    </option>
                  </select>
                </div> */}

                <div className="form-group">
                  {loader1 ? (
                    <>
                      <div class="spinner-border"></div>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => orderDelivered(order_id)}
                      >
                        Delivered
                      </button>
                    </>
                  )}

                  {loader2 ? (
                    <>
                      <div class="spinner-border"></div>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn btn-primary btn_unpopular"
                        onClick={() => orderCancelled(order_id)}
                      >
                        Canceled
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDeliverModal;
