import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import GalleryEditModal from "./GalleryEditModal";
import GalleryDeleteModal from "./GalleryDeleteModal";
//import ProductPopularModal from "./ProductPopularModal";
import GalleryImageEditModal from "./GalleryImageEditModal";

const GalleryList = () => {
  const [gallery_image, setGalleryImage] = useState("");
  const [gallery_caption, setGalleryCaption] = useState("");
  const [data1, setData1] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData1();
  }, []);

  function getData1() {
    axios
      .get(AppUrl.base_url + "galleryGet")
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

  async function galleryAdd() {
    setLoader(true);
    const formData = new FormData();

    formData.append("gallery_image", gallery_image);
    formData.append("gallery_caption", gallery_caption);

    let result = await fetch(AppUrl.base_url + "galleryAdd", {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setGalleryCaption("");
      setGalleryImage("");
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
      <div className="modal fade" id="galleryAddModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Gallery Image</h5>
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
                    onChange={(e) => setGalleryImage(e.target.files[0])}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Caption</label>
                  <input
                    type="text"
                    className="form-control"
                    value={gallery_caption}
                    onChange={(e) => setGalleryCaption(e.target.value)}
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
                        onClick={() => galleryAdd()}
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
            <h4 class="card-title">Gallery</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
            <a
              href="true"
              className="btn btn-secondary btn-rounded"
              data-toggle="modal"
              data-target="#galleryAddModal"
            >
              +Add Image
            </a>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    <th class="width20">#</th>
                    <th>Image</th>
                    <th>Caption</th>

                    <th>Created at</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((item, index) => (
                    <tr key={item.product_id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>

                      <td>
                        <img
                          className="gallery_list_image"
                          src={AppUrl.image_url_backend + item.gallery_image}
                          alt={item.product_name}
                          data-toggle="modal"
                          data-target={
                            "#galleryImageEditModal" + item.gallery_id
                          }
                        />
                      </td>
                      <td>{item.gallery_caption}</td>

                      <td>{item.gallery_date}</td>

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
                                "#galleryEditModal" + item.gallery_id
                              }
                            >
                              Edit
                            </a>

                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#galleryDeleteModal" + item.gallery_id
                              }
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                      <GalleryEditModal
                        gallery_id={item.gallery_id}
                        gallery_caption={item.gallery_caption}
                        get_data={getData1}
                      />
                      <GalleryDeleteModal
                        gallery_id={item.gallery_id}
                        product_id={item.product_id}
                        get_data={getData1}
                      />

                      <GalleryImageEditModal
                        gallery_id={item.gallery_id}
                        gallery_image={item.gallery_image}
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

export default GalleryList;
