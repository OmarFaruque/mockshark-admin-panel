import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import AboutEditModal from "./AboutEditModal";
import AboutImageEditModal from "./AboutImageEditModal";
import AboutBigImageEditModal from "./AboutBigImageEditModal";
import AboutSmallImage1EditModal from "./AboutSmallImage1EditModal";
import AboutSmallImage2EditModal from "./AboutSmallImage2EditModal";

const About = () => {
  //   const [about_phone, setAboutPhone] = useState("");
  //   const [about_email, setAboutEmail] = useState("");
  //   const [about_location, setAboutLocation] = useState("");
  //   const [about_description, setAboutDescription] = useState("");
  //   const [about_list, setAboutList] = useState("");
  //   const [about_menu, setAboutMenu] = useState("");
  //   const [about_stuff, setAboutStuff] = useState("");
  //   const [about_customer, setAboutCustomer] = useState("");
  //   const [about_fb, setAboutFb] = useState("");
  //   const [about_insta, setAboutInsta] = useState("");
  //   const [about_twitter, setAboutTwitter] = useState("");
  //   const [about_pinterest, setAboutPinterest] = useState("");
  const [data, setData] = useState([]);
  //const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios
      .get(AppUrl.base_url + "aboutGet")
      .then(function (response) {
        if (response) {
          setData(response.data);
          //setLoader(false);
          //console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //   async function catAdd() {
  //     const formData = new FormData();
  //     formData.append("about_phone", about_phone);
  //     formData.append("about_email", about_email);
  //     formData.append("about_location", about_location);
  //     formData.append("about_description", about_description);
  //     formData.append("about_list", about_list);
  //     formData.append("about_menu", about_menu);
  //     formData.append("about_stuff", about_stuff);
  //     formData.append("about_customer", about_customer);
  //     formData.append("about_fb", about_fb);
  //     formData.append("about_insta", about_insta);
  //     formData.append("about_twitter", about_twitter);
  //     formData.append("about_pinterest", about_pinterest);

  //     let result = await fetch(AppUrl.base_url + "categoryAdd", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     result = await result.json();

  //     setLoader(true);

  //     if (result.success) {
  //       toast.success(result.success);
  //       setCatName("");
  //     } else {
  //       toast.error(result.error);
  //     }

  //     getData();
  //   }
  return (
    <>
      <ToastContainer />

      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">About Us</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-responsive-md">
                <thead>
                  <tr>
                    <th>About</th>
                    <th>Order Email</th>
                    <th>About Image</th>
                    {/* <th>Why Special</th> */}
                    <th>Big Image</th>
                    <th>Small Image1</th>
                    <th>Small Image2</th>
                    {/* <th>Toutube Video Id</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Location 1</th>
                    <th>Location 2</th>
                    <th>Location 3</th> */}
                    <th>Opening Hours</th>
                    {/* <th>Menu</th>
                    <th>Staff</th>
                    <th>Customer</th> */}
                    {/* <th>Fb</th>
                    <th>Instagram</th>
                    <th>Twitter</th>
                    <th>Pinterest</th> */}
                    <th>Delivery Charge</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.about_id}>
                      <td>{item.about_description}</td>
                      <td>{item.about_email_other}</td>
                      <td>
                        <img
                          className="gallery_list_image"
                          src={AppUrl.image_url_backend + item.about_image}
                          alt={item.about_description}
                          data-toggle="modal"
                          data-target={"#aboutImageEditModal" + item.about_id}
                        />
                      </td>
                      {/* <td>{item.about_list}</td> */}
                      <td>
                        <img
                          className="gallery_list_image"
                          src={AppUrl.image_url_backend + item.big_image}
                          alt={item.about_description}
                          data-toggle="modal"
                          data-target={
                            "#aboutBigImageEditModal" + item.about_id
                          }
                        />
                      </td>
                      <td>
                        <img
                          className="gallery_list_image"
                          src={AppUrl.image_url_backend + item.small_image1}
                          alt={item.about_description}
                          data-toggle="modal"
                          data-target={
                            "#aboutSmallImage1EditModal" + item.about_id
                          }
                        />
                      </td>
                      <td>
                        <img
                          className="gallery_list_image"
                          src={AppUrl.image_url_backend + item.small_image2}
                          alt={item.about_description}
                          data-toggle="modal"
                          data-target={
                            "#aboutSmallImage2EditModal" + item.about_id
                          }
                        />
                      </td>
                      {/* <td>{item.youtube_video_id}</td>
                      <td>{item.about_phone}</td>
                      <td>{item.about_email}</td>
                      <td>{item.about_location1}</td>
                      <td>{item.about_location2}</td>
                      <td>{item.about_location}</td> */}
                      <td>{item.about_open_hour}</td>
                      {/* <td>{item.about_menu}</td>
                      <td>{item.about_stuff}</td>
                      <td>{item.about_customer}</td> */}
                      {/* <td>{item.about_fb}</td>
                      <td>{item.about_insta}</td>
                      <td>{item.about_twitter}</td>
                      <td>{item.about_pinterest}</td> */}
                      <td>{item.about_delivery_charge}</td>

                      <td>
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn btn-success light sharp"
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
                          <div className="dropdown-menu">
                            <a
                              className="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={"#aboutEditModal" + item.about_id}
                            >
                              Edit
                            </a>
                            {/* <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={"#categoryDeleteModal" + item.cat_id}
                            >
                              Delete
                            </a> */}
                          </div>
                        </div>
                      </td>
                      <AboutEditModal
                        about_id={item.about_id}
                        about_email_other={item.about_email_other}
                        about_description={item.about_description}
                        about_list={item.about_list}
                        about_phone={item.about_phone}
                        about_email={item.about_email}
                        about_location1={item.about_location1}
                        about_location2={item.about_location2}
                        about_location={item.about_location}
                        about_open_hour={item.about_open_hour}
                        youtube_video_id={item.youtube_video_id}
                        // about_menu={item.about_menu}
                        // about_stuff={item.about_stuff}
                        // about_customer={item.about_customer}
                        about_fb={item.about_fb}
                        about_insta={item.about_insta}
                        about_twitter={item.about_twitter}
                        about_pinterest={item.about_pinterest}
                        about_youtube={item.about_youtube}
                        about_delivery_charge={item.about_delivery_charge}
                        about_hero_text={item.about_hero_text}
                        about_menu_text={item.about_menu_text}
                        about_gallery_text={item.about_gallery_text}
                        about_location_text={item.about_location_text}
                        about_contact_text={item.about_contact_text}
                        about_faq_text={item.about_faq_text}
                        get_data={getData}
                      />

                      <AboutImageEditModal
                        about_id={item.about_id}
                        about_image={item.about_image}
                        get_data={getData}
                      />

                      <AboutBigImageEditModal
                        about_id={item.about_id}
                        big_image={item.big_image}
                        get_data={getData}
                      />

                      <AboutSmallImage1EditModal
                        about_id={item.about_id}
                        small_image1={item.small_image1}
                        get_data={getData}
                      />

                      <AboutSmallImage2EditModal
                        about_id={item.about_id}
                        small_image2={item.small_image2}
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

export default About;
