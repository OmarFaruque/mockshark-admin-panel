import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import LocationEditModal from "./LocationEditModal";
import LocationDeleteModal from "./LocationDeleteModal";
//import ProductPopularModal from "./ProductPopularModal";
import LocationImageEditModal from "./LocationImageEditModal";
// import BlogImage2EditModal from "./BlogImage2EditModal";
// import BlogImage3EditModal from "./BlogImage3EditModal";

const LocationList = () => {
  const [location_image, setLocationImage] = useState("");

  const [location_title, setLocationTitle] = useState("");
  const [location_description, setLocationDescription] = useState("");

  const [location_tag, setLocationTag] = useState("");

  const [data1, setData1] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData1();
  }, []);

  function getData1() {
    axios
      .get(AppUrl.base_url + "locationGet")
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

  async function locationAdd() {
    setLoader(true);
    const formData = new FormData();

    formData.append("image", location_image);

    formData.append("title", location_title);
    formData.append("description", location_description);

    formData.append("tag", location_tag);

    let result = await fetch(AppUrl.base_url + "locationAdd", {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setLocationTitle("");
      setLocationDescription("");

      setLocationTag("");

      setLocationImage("");

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
      <div className="modal fade" id="locationAddModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Location</h5>
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
                    onChange={(e) => setLocationImage(e.target.files[0])}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={location_title}
                    onChange={(e) => setLocationTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={location_description}
                    onChange={(e) => setLocationDescription(e.target.value)}
                    rows="5"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    value={location_tag}
                    onChange={(e) => setLocationTag(e.target.value)}
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
                        onClick={() => locationAdd()}
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
            <h4 class="card-title">Locations</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
            <a
              href="true"
              className="btn btn-secondary btn-rounded"
              data-toggle="modal"
              data-target="#locationAddModal"
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

                    {/* <th>Created at</th> */}

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
                          src={AppUrl.image_url_backend + item.location_image}
                          alt={item.location_title}
                          data-toggle="modal"
                          data-target={
                            "#locationImageEditModal" + item.location_id
                          }
                        />
                      </td>

                      <td>{item.location_title}</td>
                      <td>{item.location_description}</td>

                      <td>{item.location_tag}</td>

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
                              data-target={
                                "#locationEditModal" + item.location_id
                              }
                            >
                              Edit
                            </a>

                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#locationDeleteModal" + item.location_id
                              }
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                      <LocationEditModal
                        location_id={item.location_id}
                        location_title={item.location_title}
                        location_description={item.location_description}
                        location_tag={item.location_tag}
                        get_data={getData1}
                      />
                      <LocationDeleteModal
                        location_id={item.location_id}
                        // product_id={item.product_id}
                        get_data={getData1}
                      />

                      <LocationImageEditModal
                        location_id={item.location_id}
                        location_image={item.location_image}
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

export default LocationList;
