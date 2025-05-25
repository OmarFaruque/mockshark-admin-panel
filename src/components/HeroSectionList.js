import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import HeroSectionEditModal from "./HeroSectionEditModal";
import HeroSectionDeleteModal from "./HeroSectionDeleteModal";
//import ProductPopularModal from "./ProductPopularModal";
import HeroSectionImageEditModal from "./HeroSectionImageEditModal";

const HeroSectionList = () => {
  const [hero_section_image, setHeroSectionImage] = useState("");
  const [hero_section_title, setHeroSectionTitle] = useState("");
  const [hero_section_description, setHeroSectionDescription] = useState("");
  const [data1, setData1] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData1();
  }, []);

  function getData1() {
    axios
      .get(AppUrl.base_url + "heroSectionGet")
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

  async function heroSectionAdd() {
    setLoader(true);
    const formData = new FormData();

    formData.append("hero_section_image", hero_section_image);
    formData.append("hero_section_title", hero_section_title);
    formData.append("hero_section_description", hero_section_description);

    let result = await fetch(AppUrl.base_url + "heroSectionAdd", {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setHeroSectionTitle("");
      setHeroSectionDescription("");
      setHeroSectionImage("");
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
      <div className="modal fade" id="heroSectionAddModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Hero Section Image</h5>
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
                    onChange={(e) => setHeroSectionImage(e.target.files[0])}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={hero_section_title}
                    onChange={(e) => setHeroSectionTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={hero_section_description}
                    onChange={(e) => setHeroSectionDescription(e.target.value)}
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
                        onClick={() => heroSectionAdd()}
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
            <h4 class="card-title">Hero Section</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
            <a
              href="true"
              className="btn btn-secondary btn-rounded"
              data-toggle="modal"
              data-target="#heroSectionAddModal"
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

                    <th>Created at</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((item, index) => (
                    <tr key={item.hero_section_id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>

                      <td>
                        <img
                          className="gallery_list_image"
                          src={
                            AppUrl.image_url_backend + item.hero_section_image
                          }
                          alt={item.product_name}
                          data-toggle="modal"
                          data-target={
                            "#heroSectionImageEditModal" + item.hero_section_id
                          }
                        />
                      </td>
                      <td>{item.hero_section_title}</td>
                      <td>{item.hero_section_description}</td>

                      <td>{item.hero_section_date}</td>

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
                                "#heroSectionEditModal" + item.hero_section_id
                              }
                            >
                              Edit
                            </a>

                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#heroSectionDeleteModal" + item.hero_section_id
                              }
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                      <HeroSectionEditModal
                        hero_section_id={item.hero_section_id}
                        hero_section_title={item.hero_section_title}
                        hero_section_description={item.hero_section_description}
                        get_data={getData1}
                      />
                      <HeroSectionDeleteModal
                        hero_section_id={item.hero_section_id}
                        // product_id={item.product_id}
                        get_data={getData1}
                      />

                      <HeroSectionImageEditModal
                        hero_section_id={item.hero_section_id}
                        hero_section_image={item.hero_section_image}
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

export default HeroSectionList;
