import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const ReviewEditModal = ({
  review_id,
  review_name,
  review_title,
  review_message,
  get_data,
}) => {
  const [review_name_edit, setReviewNameEdit] = useState(review_name);
  const [review_title_edit, setReviewTitleEdit] = useState(review_title);
  const [review_message_edit, setReviewMessageEdit] = useState(review_message);
  const [loader, setLoader] = useState(false);

  async function reviewUpdate(id) {
    setLoader(true);
    const formData = new FormData();
    formData.append("review_name", review_name_edit);
    formData.append("review_title", review_title_edit);
    formData.append("review_message", review_message_edit);

    let result = await fetch(AppUrl.base_url + "reviewUpdate/" + id, {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setLoader(false);
    } else {
      toast.error(result.error);
      setLoader(false);
    }

    get_data();

    let blur_bg = document.getElementById("reviewEditModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"reviewEditModal" + review_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Review</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Customer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={review_name_edit}
                    onChange={(e) => setReviewNameEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Customer Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={review_title_edit}
                    onChange={(e) => setReviewTitleEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    Customer Reviews
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={review_message_edit}
                    onChange={(e) => setReviewMessageEdit(e.target.value)}
                    rows="7"
                  />
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
                {loader === true ? (
                  <>
                    <div class="spinner-border"></div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => reviewUpdate(review_id)}
                      >
                        Update
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewEditModal;
