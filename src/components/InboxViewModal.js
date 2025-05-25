import React from "react";
//import { toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
//import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const InboxViewModal = ({
  inbox_id,
  inbox_name,
  inbox_email,
  inbox_subject,
  inbox_message,
  get_data,
}) => {
  //const [loader, setLoader] = useState(false);

  return (
    <>
      <div className="modal fade" id={"inboxViewModal" + inbox_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Message from {inbox_name}</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w400">{inbox_name}</label>
                  <br />
                  <label className="text-black font-w200">{inbox_email}</label>
                </div>

                <div className="form-group">
                  <label className="text-black font-w350">Subject: </label>

                  <label className="text-black font-w200 ml-1">
                    {inbox_subject}
                  </label>
                </div>

                <div className="form-group">
                  <label className="text-black font-w350">Message: </label>
                  <br />
                  <label className="text-black font-w200 inbox_message">
                    {inbox_message}
                  </label>
                </div>

                {/* <div className="form-group">
                  <label className="text-black font-w500">Category Icon</label>
                  <select
                    name="cat_icon"
                    id="cat_icon"
                    className="form-control"
                  >
                    <option value="">Select an icon</option>
                    <option value="glass">
                      <i className="fas fa-glass"></i>
                    </option>
                  </select>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InboxViewModal;
