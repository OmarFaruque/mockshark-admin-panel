import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import OnlineEditModal from "./OnlineEditModal";
import OnlineDeleteModal from "./OnlineDeleteModal";
//import ProductPopularModal from "./ProductPopularModal";
import OnlineImageEditModal from "./OnlineImageEditModal";
// import BlogImage2EditModal from "./BlogImage2EditModal";
// import BlogImage3EditModal from "./BlogImage3EditModal";

const OnlineList = () => {
  const [online_image, setOnlineImage] = useState("");

  const [online_title, setOnlineTitle] = useState("");
  const [online_description, setOnlineDescription] = useState("");

  const [online_tag, setOnlineTag] = useState("");
  const [online_date, setOnlineDate] = useState("");
  const [online_link, setOnlineLink] = useState("");

  const [data1, setData1] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData1();
  }, []);

  function getData1() {
    axios
      .get(AppUrl.base_url + "onlineGet")
      .then(function (response) {
        if (response) {
          setData1(response.data);
          setLoader(false);
          //console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function onlineAdd() {
    setLoader(true);
    const formData = new FormData();

    formData.append("image", online_image);

    formData.append("title", online_title);
    formData.append("description", online_description);

    formData.append("tag", online_tag);
    formData.append("date", online_date);
    formData.append("link", online_link);

    let result = await fetch(AppUrl.base_url + "onlineAdd", {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setOnlineTitle("");
      setOnlineDescription("");

      setOnlineTag("");
      setOnlineDate("");
      setOnlineLink("");

      setOnlineImage("");

      setLoader(false);
    } else {
      toast.error(result.error);
      setLoader(false);
    }

    getData1();
  }
  return (
    <>
      <ToastContainer />
      {/* add modal */}
      <div className="modal fade" id="onlineAddModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Order Online Partner</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setOnlineImage(e.target.files[0])}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={online_title}
                    onChange={(e) => setOnlineTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={online_description}
                    onChange={(e) => setOnlineDescription(e.target.value)}
                    rows="5"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    value={online_tag}
                    onChange={(e) => setOnlineTag(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={online_date}
                    onChange={(e) => setOnlineDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Link</label>
                  <input
                    type="text"
                    className="form-control"
                    value={online_link}
                    onChange={(e) => setOnlineLink(e.target.value)}
                  />
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
                        onClick={() => onlineAdd()}
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
            <h4 class="card-title">Online Order Partners</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
            <a
              href="true"
              className="btn btn-secondary btn-rounded"
              data-toggle="modal"
              data-target="#onlineAddModal"
            >
              +Add Data
            </a>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    <th class="width20">#</th>
                    <th>Image</th>

                    <th>Title</th>
                    <th>Description</th>

                    <th>Tag</th>
                    <th>Date</th>
                    <th>Link</th>

                    {/* <th>Created at</th> */}

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((item, index) => (
                    <tr key={item.online_id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>

                      <td>
                        <img
                          className="gallery_list_image"
                          src={AppUrl.image_url_backend + item.online_image}
                          alt={item.online_title}
                          data-toggle="modal"
                          data-target={"#onlineImageEditModal" + item.online_id}
                        />
                      </td>

                      <td>{item.online_title}</td>
                      <td>{item.online_description}</td>

                      <td>{item.online_tag}</td>
                      <td>{item.online_date}</td>
                      <td>{item.online_link}</td>

                      {/* <td>{item.service_date}</td> */}

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
                              data-target={"#onlineEditModal" + item.online_id}
                            >
                              Edit
                            </a>

                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#onlineDeleteModal" + item.online_id
                              }
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                      <OnlineEditModal
                        online_id={item.online_id}
                        online_title={item.online_title}
                        online_description={item.online_description}
                        online_tag={item.online_tag}
                        online_date={item.online_date}
                        online_link={item.online_link}
                        get_data={getData1}
                      />
                      <OnlineDeleteModal
                        online_id={item.online_id}
                        // product_id={item.product_id}
                        get_data={getData1}
                      />

                      <OnlineImageEditModal
                        online_id={item.online_id}
                        online_image={item.online_image}
                        get_data={getData1}
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

export default OnlineList;
