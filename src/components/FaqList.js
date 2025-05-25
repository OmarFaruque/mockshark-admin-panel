import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import FaqEditModal from "./FaqEditModal";
import FaqDeleteModal from "./FaqDeleteModal";

const FaqList = () => {
  const [faq_title, setFaqTitle] = useState("");
  const [faq_description, setFaqDescription] = useState("");

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get(AppUrl.base_url + "faqGet")
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

  async function faqAdd() {
    const formData = new FormData();
    formData.append("faq_title", faq_title);
    formData.append("faq_description", faq_description);

    //formData.append("cat_icon", cat_icon);

    let result = await fetch(AppUrl.base_url + "faqAdd", {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    setLoader(true);

    if (result.success) {
      toast.success(result.success);
      setFaqTitle("");
      setFaqDescription("");
    } else {
      toast.error(result.error);
    }

    getData();
  }
  return (
    <>
      <ToastContainer />
      {/* add modal */}
      <div className="modal fade" id="faqAddModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Faq</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Faq Question</label>
                  <input
                    type="text"
                    className="form-control"
                    value={faq_title}
                    onChange={(e) => setFaqTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Faq Answer</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={faq_description}
                    onChange={(e) => setFaqDescription(e.target.value)}
                    rows={"6"}
                  ></textarea>
                </div>

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
                        onClick={() => faqAdd()}
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
            <h4 class="card-title">Faq</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
            <a
              href="true"
              className="btn btn-secondary btn-rounded"
              data-toggle="modal"
              data-target="#faqAddModal"
            >
              +Add Faq
            </a>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    <th class="width80">#</th>
                    <th>Question</th>
                    <th>Answer</th>
                    {/* <th>Icon</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.faq_id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>
                      <td>{item.faq_title.substr(0, 100)}</td>
                      <td>{item.faq_description.substr(0, 100)}</td>
                      {/* <td>
                        <i className={item.cat_icon}></i>
                      </td> */}

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
                              data-target={"#faqEditModal" + item.faq_id}
                            >
                              Edit
                            </a>
                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={"#faqDeleteModal" + item.faq_id}
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                      <FaqEditModal
                        faq_id={item.faq_id}
                        faq_title={item.faq_title}
                        faq_description={item.faq_description}
                        get_data={getData}
                      />
                      <FaqDeleteModal faq_id={item.faq_id} get_data={getData} />
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

export default FaqList;
