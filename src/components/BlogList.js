import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import BlogEditModal from "./BlogEditModal";
import BlogDeleteModal from "./BlogDeleteModal";
//import ProductPopularModal from "./ProductPopularModal";
import BlogImage1EditModal from "./BlogImage1EditModal";
import BlogImage2EditModal from "./BlogImage2EditModal";
import BlogImage3EditModal from "./BlogImage3EditModal";

const BLogList = () => {
  const [blogsection_image1, setBlogSectionImage1] = useState("");
  const [blogsection_image2, setBlogSectionImage2] = useState("");
  const [blogsection_image3, setBlogSectionImage3] = useState("");
  const [blogsection_title, setBlogSectionTitle] = useState("");
  const [blogsection_description1, setBlogSectionDescription1] = useState("");
  const [blogsection_description2, setBlogSectionDescription2] = useState("");
  const [blogsection_tag, setBlogSectionTag] = useState("");
  const [blogsection_category, setBlogSectionCategory] = useState("");
  const [blogsection_time, setBlogSectionTime] = useState("");
  const [blogsection_meta_title, setBlogSectionMetaTitle] = useState("");
  const [blogsection_meta_description, setBlogSectionMetaDescription] =
    useState("");

  const [data1, setData1] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData1();
  }, []);

  function getData1() {
    axios
      .get(AppUrl.base_url + "blogsectionGet")
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

  async function blogAdd() {
    setLoader(true);
    const formData = new FormData();

    formData.append("image1", blogsection_image1);
    formData.append("image2", blogsection_image2);
    formData.append("image3", blogsection_image3);
    formData.append("title", blogsection_title);
    formData.append("description1", blogsection_description1);
    formData.append("description2", blogsection_description2);
    formData.append("tag", blogsection_tag);
    formData.append("category", blogsection_category);
    formData.append("time", blogsection_time);
    formData.append("meta_title", blogsection_meta_title);
    formData.append("meta_description", blogsection_meta_description);

    let result = await fetch(AppUrl.base_url + "blogsectionAdd", {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setBlogSectionTitle("");
      setBlogSectionDescription1("");
      setBlogSectionDescription2("");
      setBlogSectionTag("");
      setBlogSectionCategory("");
      setBlogSectionTime("");
      setBlogSectionMetaTitle("");
      setBlogSectionMetaDescription("");
      setBlogSectionImage1("");
      setBlogSectionImage2("");
      setBlogSectionImage3("");
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
      <div className="modal fade" id="blogAddModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Blog</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Image1</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setBlogSectionImage1(e.target.files[0])}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Image2</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setBlogSectionImage2(e.target.files[0])}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Image3</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setBlogSectionImage3(e.target.files[0])}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogsection_title}
                    onChange={(e) => setBlogSectionTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description 1</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={blogsection_description1}
                    onChange={(e) => setBlogSectionDescription1(e.target.value)}
                    rows="7"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description 2</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={blogsection_description2}
                    onChange={(e) => setBlogSectionDescription2(e.target.value)}
                    rows="7"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogsection_tag}
                    onChange={(e) => setBlogSectionTag(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogsection_category}
                    onChange={(e) => setBlogSectionCategory(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Time</label>
                  <input
                    type="number"
                    className="form-control"
                    value={blogsection_time}
                    onChange={(e) => setBlogSectionTime(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Meta Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogsection_meta_title}
                    onChange={(e) => setBlogSectionMetaTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    Meta Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogsection_meta_description}
                    onChange={(e) =>
                      setBlogSectionMetaDescription(e.target.value)
                    }
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
                        onClick={() => blogAdd()}
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
            <h4 class="card-title">Blogs</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
            <a
              href="true"
              className="btn btn-secondary btn-rounded"
              data-toggle="modal"
              data-target="#blogAddModal"
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
                    <th>Image1</th>
                    <th>Image2</th>
                    <th>Image3</th>
                    <th>Title</th>
                    <th>Description1</th>
                    <th>Description2</th>
                    <th>Tag</th>
                    <th>Category</th>
                    <th>Time</th>
                    <th>Meta Title</th>
                    <th>Meta Description</th>

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
                          src={
                            AppUrl.image_url_backend + item.blogsection_image1
                          }
                          alt={item.blogsection_title}
                          data-toggle="modal"
                          data-target={
                            "#blogImage1EditModal" + item.blogsection_id
                          }
                        />
                      </td>
                      <td>
                        <img
                          className="gallery_list_image"
                          src={
                            AppUrl.image_url_backend + item.blogsection_image2
                          }
                          alt={item.blogsection_title}
                          data-toggle="modal"
                          data-target={
                            "#blogImage2EditModal" + item.blogsection_id
                          }
                        />
                      </td>
                      <td>
                        <img
                          className="gallery_list_image"
                          src={
                            AppUrl.image_url_backend + item.blogsection_image3
                          }
                          alt={item.blogsection_title}
                          data-toggle="modal"
                          data-target={
                            "#blogImage3EditModal" + item.blogsection_id
                          }
                        />
                      </td>
                      <td>{item.blogsection_title}</td>
                      <td>{item.blogsection_description1.substring(0, 100)}</td>
                      <td>{item.blogsection_description2.substring(0, 100)}</td>
                      <td>{item.blogsection_tag}</td>
                      <td>{item.blogsection_category}</td>
                      <td>{item.blogsection_time}</td>
                      <td>{item.blogsection_meta_title}</td>
                      <td>{item.blogsection_meta_description}</td>

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
                                "#blogEditModal" + item.blogsection_id
                              }
                            >
                              Edit
                            </a>

                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#blogDeleteModal" + item.blogsection_id
                              }
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                      <BlogEditModal
                        blogsection_id={item.blogsection_id}
                        blogsection_title={item.blogsection_title}
                        blogsection_description1={item.blogsection_description1}
                        blogsection_description2={item.blogsection_description2}
                        blogsection_tag={item.blogsection_tag}
                        blogsection_category={item.blogsection_category}
                        blogsection_time={item.blogsection_time}
                        blogsection_meta_title={item.blogsection_meta_title}
                        blogsection_meta_description={
                          item.blogsection_meta_description
                        }
                        get_data={getData1}
                      />
                      <BlogDeleteModal
                        blogsection_id={item.blogsection_id}
                        // product_id={item.product_id}
                        get_data={getData1}
                      />

                      <BlogImage1EditModal
                        blogsection_id={item.blogsection_id}
                        blogsection_image1={item.blogsection_image1}
                        get_data={getData1}
                      />
                      <BlogImage2EditModal
                        blogsection_id={item.blogsection_id}
                        blogsection_image2={item.blogsection_image2}
                        get_data={getData1}
                      />
                      <BlogImage3EditModal
                        blogsection_id={item.blogsection_id}
                        blogsection_image3={item.blogsection_image3}
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

export default BLogList;
