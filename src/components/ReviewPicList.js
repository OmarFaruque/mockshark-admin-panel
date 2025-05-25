import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
//import GalleryEditModal from "./GalleryEditModal";
//import GalleryDeleteModal from "./GalleryDeleteModal";
//import ProductPopularModal from "./ProductPopularModal";
import ReviewPicImageEditModal from "./ReviewPicImageEditModal";

const ReviewPicList = () => {
  //   const [review_pic_image, setReviewPicImage] = useState("");
  const [data1, setData1] = useState([]);
  //const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData1();
  }, []);

  function getData1() {
    axios
      .get(AppUrl.base_url + "reviewPicGet")
      .then(function (response) {
        if (response) {
          setData1(response.data);
          //setLoader(false);
          //console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      {/* <ToastContainer /> */}

      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Review Image</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    <th>Image</th>

                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data1.map((item) => (
                    <tr key={item.review_pic_id}>
                      <td>
                        <img
                          className="gallery_list_image"
                          src={AppUrl.image_url_backend + item.review_pic_image}
                          alt={item.product_name}
                          data-toggle="modal"
                          data-target={
                            "#reviewPicImageEditModal" + item.review_pic_id
                          }
                        />
                      </td>

                      <ReviewPicImageEditModal
                        review_pic_id={item.review_pic_id}
                        review_pic_image={item.review_pic_image}
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

export default ReviewPicList;
