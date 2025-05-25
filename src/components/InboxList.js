import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
//import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import InboxViewModal from "./InboxViewModal";
//import CategoryDeleteModal from "./CategoryDeleteModal";

const InboxList = () => {
  //   const [cat_name, setCatName] = useState("");
  //   const [cat_icon, setCatIcon] = useState("");
  const [data, setData] = useState([]);
  //const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get(AppUrl.base_url + "inboxGet")
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
            <h4 class="card-title">Inbox</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    <th class="width80">#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.inbox_id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>
                      <td>{item.inbox_name}</td>
                      <td>{item.inbox_email}</td>
                      <td>{item.inbox_subject}</td>
                      <td>{item.inbox_date}</td>

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
                              data-target={"#inboxViewModal" + item.inbox_id}
                            >
                              View Details
                            </a>
                          </div>
                        </div>
                      </td>
                      <InboxViewModal
                        inbox_id={item.inbox_id}
                        inbox_name={item.inbox_name}
                        inbox_email={item.inbox_email}
                        inbox_subject={item.inbox_subject}
                        inbox_message={item.inbox_message}
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

export default InboxList;
