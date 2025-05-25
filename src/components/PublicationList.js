import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import PublicationEditModal from "./PublicationEditModal";
import PublicationDeleteModal from "./PublicationDeleteModal";
//import ProductPopularModal from "./ProductPopularModal";
import PublicationImageEditModal from "./PublicationImageEditModal";
// import BlogImage2EditModal from "./BlogImage2EditModal";
// import BlogImage3EditModal from "./BlogImage3EditModal";

const PublicationList = () => {
  const [publication_image, setPublicationImage] = useState("");

  const [publication_title, setPublicationTitle] = useState("");
  const [publication_description, setPublicationDescription] = useState("");

  const [publication_tag, setPublicationTag] = useState("");
  const [publication_date, setPublicationDate] = useState("");
  const [publication_link, setPublicationLink] = useState("");

  const [data1, setData1] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData1();
  }, []);

  function getData1() {
    axios
      .get(AppUrl.base_url + "publicationGet")
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

  async function publicationAdd() {
    setLoader(true);
    const formData = new FormData();

    formData.append("image", publication_image);

    formData.append("title", publication_title);
    formData.append("description", publication_description);

    formData.append("tag", publication_tag);
    formData.append("date", publication_date);
    formData.append("link", publication_link);

    let result = await fetch(AppUrl.base_url + "publicationAdd", {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setPublicationTitle("");
      setPublicationDescription("");

      setPublicationTag("");
      setPublicationDate("");
      setPublicationLink("");

      setPublicationImage("");

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
      <div className="modal fade" id="publicationAddModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Publication</h5>
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
                    onChange={(e) => setPublicationImage(e.target.files[0])}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={publication_title}
                    onChange={(e) => setPublicationTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={publication_description}
                    onChange={(e) => setPublicationDescription(e.target.value)}
                    rows="5"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    value={publication_tag}
                    onChange={(e) => setPublicationTag(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={publication_date}
                    onChange={(e) => setPublicationDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Link</label>
                  <input
                    type="text"
                    className="form-control"
                    value={publication_link}
                    onChange={(e) => setPublicationLink(e.target.value)}
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
                        onClick={() => publicationAdd()}
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
            <h4 class="card-title">Publications</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
            <a
              href="true"
              className="btn btn-secondary btn-rounded"
              data-toggle="modal"
              data-target="#publicationAddModal"
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
                    <tr key={item.publication_id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>

                      <td>
                        <img
                          className="gallery_list_image"
                          src={
                            AppUrl.image_url_backend + item.publication_image
                          }
                          alt={item.publication_title}
                          data-toggle="modal"
                          data-target={
                            "#publicationImageEditModal" + item.publication_id
                          }
                        />
                      </td>

                      <td>{item.publication_title}</td>
                      <td>{item.publication_description}</td>

                      <td>{item.publication_tag}</td>
                      <td>{item.publication_date}</td>
                      <td>{item.publication_link}</td>

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
                                "#publicationEditModal" + item.publication_id
                              }
                            >
                              Edit
                            </a>

                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#publicationDeleteModal" + item.publication_id
                              }
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                      <PublicationEditModal
                        publication_id={item.publication_id}
                        publication_title={item.publication_title}
                        publication_description={item.publication_description}
                        publication_tag={item.publication_tag}
                        publication_date={item.publication_date}
                        publication_link={item.publication_link}
                        get_data={getData1}
                      />
                      <PublicationDeleteModal
                        publication_id={item.publication_id}
                        // product_id={item.product_id}
                        get_data={getData1}
                      />

                      <PublicationImageEditModal
                        publication_id={item.publication_id}
                        publication_image={item.publication_image}
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

export default PublicationList;
