import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const ServiceEditModal = ({
  service_id,
  service_name,
  service_title,
  service_description,
  get_data,
}) => {
  const [service_name_edit, setServiceNameEdit] = useState(service_name);
  const [service_title_edit, setServiceTitleEdit] = useState(service_title);
  const [service_description_edit, setServiceDescriptionEdit] =
    useState(service_description);

  const [loader, setLoader] = useState(false);

  async function serviceUpdate(id) {
    setLoader(true);
    const formData = new FormData();
    formData.append("service_name", service_name_edit);
    formData.append("service_title", service_title_edit);
    formData.append("service_description", service_description_edit);

    let result = await fetch(AppUrl.base_url + "serviceUpdate/" + id, {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setLoader(false);
    } else {
      toast.error(result.error);
      setLoader(false);
    }

    get_data();

    let blur_bg = document.getElementById("serviceEditModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"serviceEditModal" + service_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Data</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={service_name_edit}
                    onChange={(e) => setServiceNameEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={service_title_edit}
                    onChange={(e) => setServiceTitleEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Review</label>
                  <input
                    type="text"
                    className="form-control"
                    value={service_description_edit}
                    onChange={(e) => setServiceDescriptionEdit(e.target.value)}
                  />
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
                        onClick={() => serviceUpdate(service_id)}
                      >
                        Update
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceEditModal;
