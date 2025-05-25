import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
//import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
//import OrderViewModal from "./OrderViewModal";
//import OrderDeliverModal from "./OrderDeliverModal";
//import CategoryDeleteModal from "./CategoryDeleteModal";

const ReservationList = () => {
  //   const [cat_name, setCatName] = useState("");
  //   const [cat_icon, setCatIcon] = useState("");
  const [data, setData] = useState([]);
  //const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get(AppUrl.base_url + "reservationGet")
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

  return (
    <>
      {/* <ToastContainer /> */}

      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Reservations</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    <th class="width80">#</th>
                    <th>Email</th>
                    <th>Person</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.order_id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>
                      <td>{item.reservation_email}</td>
                      <td>{item.reservation_person}</td>
                      <td>{item.reservation_date}</td>
                      <td>{item.reservation_time}</td>
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

export default ReservationList;
