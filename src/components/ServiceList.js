import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import ServiceEditModal from "./ServiceEditModal";
import ServiceDeleteModal from "./ServiceDeleteModal";
//import ProductPopularModal from "./ProductPopularModal";
import ServiceImageEditModal from "./ServiceImageEditModal";

const ServiceList = () => {
  const [service_image, setServiceImage] = useState("");
  const [service_name, setServiceName] = useState("");
  const [service_title, setServiceTitle] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [data1, setData1] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData1();
  }, []);

  function getData1() {
    axios
      .get(AppUrl.base_url + "serviceGet")
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

  async function serviceAdd() {
    setLoader(true);
    const formData = new FormData();

    formData.append("service_image", service_image);
    formData.append("service_name", service_name);
    formData.append("service_title", service_title);
    formData.append("service_description", service_description);

    let result = await fetch(AppUrl.base_url + "serviceAdd", {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setServiceName("");
      setServiceTitle("");
      setServiceDescription("");
      setServiceImage("");
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
      <div className="modal fade" id="serviceAddModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Testimonial Image</h5>
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
                    onChange={(e) => setServiceImage(e.target.files[0])}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={service_name}
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={service_title}
                    onChange={(e) => setServiceTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Review</label>
                  <input
                    type="text"
                    className="form-control"
                    value={service_description}
                    onChange={(e) => setServiceDescription(e.target.value)}
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
                        onClick={() => serviceAdd()}
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
            <h4 class="card-title">Testimonials</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
            <a
              href="true"
              className="btn btn-secondary btn-rounded"
              data-toggle="modal"
              data-target="#serviceAddModal"
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
                    <th>Name</th>
                    <th>Title</th>
                    <th>Description</th>

                    <th>Created at</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((item, index) => (
                    <tr key={item.service_id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>

                      <td>
                        <img
                          className="gallery_list_image"
                          src={AppUrl.image_url_backend + item.service_image}
                          alt={item.service_title}
                          data-toggle="modal"
                          data-target={
                            "#serviceImageEditModal" + item.service_id
                          }
                        />
                      </td>
                      <td>{item.service_name}</td>
                      <td>{item.service_title}</td>
                      <td>{item.service_description}</td>

                      <td>{item.service_date}</td>

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
                              data-target={
                                "#serviceEditModal" + item.service_id
                              }
                            >
                              Edit
                            </a>

                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#serviceDeleteModal" + item.service_id
                              }
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                      <ServiceEditModal
                        service_id={item.service_id}
                        service_name={item.service_name}
                        service_title={item.service_title}
                        service_description={item.service_description}
                        get_data={getData1}
                      />
                      <ServiceDeleteModal
                        service_id={item.service_id}
                        // product_id={item.product_id}
                        get_data={getData1}
                      />

                      <ServiceImageEditModal
                        service_id={item.service_id}
                        service_image={item.service_image}
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

export default ServiceList;
