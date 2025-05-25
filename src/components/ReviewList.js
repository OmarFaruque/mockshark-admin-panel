import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import ReviewEditModal from "./ReviewEditModal";
import ReviewDeleteModal from "./ReviewDeleteModal";

const ReviewList = () => {
  const [review_name, setReviewName] = useState("");
  const [review_title, setReviewTitle] = useState("");
  const [review_message, setReviewMessage] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get(AppUrl.base_url + "reviewGet")
      .then(function (response) {
        if (response) {
          setData(response.data);
          setLoader(false);
          //console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function reviewAdd() {
    const formData = new FormData();
    formData.append("review_name", review_name);
    formData.append("review_title", review_title);
    formData.append("review_message", review_message);

    let result = await fetch(AppUrl.base_url + "reviewAdd", {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    setLoader(true);

    if (result.success) {
      toast.success(result.success);
      setReviewName("");
      setReviewTitle("");
      setReviewMessage("");
    } else {
      toast.error(result.error);
    }

    getData();
  }
  return (
    <>
      <ToastContainer />
      {/* add modal */}
      <div className="modal fade" id="reviewAddModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Review</h5>
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
                    value={review_name}
                    onChange={(e) => setReviewName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Customer Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={review_title}
                    onChange={(e) => setReviewTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    Customer Reviews
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={review_message}
                    onChange={(e) => setReviewMessage(e.target.value)}
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
                        onClick={() => reviewAdd()}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Reviews</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
            <a
              href="true"
              className="btn btn-secondary btn-rounded"
              data-toggle="modal"
              data-target="#reviewAddModal"
            >
              +Add Review
            </a>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    <th class="width20">#</th>
                    <th>Customer Name</th>
                    <th>Customer Title</th>
                    <th>Customer Review</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.review_id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>
                      <td>{item.review_name}</td>
                      <td>{item.review_title}</td>
                      <td>{item.review_message}</td>

                      <td>
                        <div class="dropdown">
                          <button
                            type="button"
                            class="btn btn-success light sharp"
                            data-toggle="dropdown"
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="5" cy="12" r="2" />
                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                <circle fill="#000000" cx="19" cy="12" r="2" />
                              </g>
                            </svg>
                          </button>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={"#reviewEditModal" + item.review_id}
                            >
                              Edit
                            </a>
                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#reviewDeleteModal" + item.review_id
                              }
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                      <ReviewEditModal
                        review_id={item.review_id}
                        review_name={item.review_name}
                        review_title={item.review_title}
                        review_message={item.review_message}
                        get_data={getData}
                      />
                      <ReviewDeleteModal
                        review_id={item.review_id}
                        get_data={getData}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewList;
