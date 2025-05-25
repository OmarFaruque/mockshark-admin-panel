import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const LocationEditModal = ({
  location_id,
  location_title,
  location_description,

  location_tag,

  get_data,
}) => {
  const [location_title_edit, setLocationTitleEdit] = useState(location_title);
  const [location_description_edit, setLocationDescriptionEdit] =
    useState(location_description);

  const [location_tag_edit, setLocationTagEdit] = useState(location_tag);

  const [loader, setLoader] = useState(false);

  async function locationUpdate(id) {
    setLoader(true);
    const formData = new FormData();
    formData.append("title_up", location_title_edit);
    formData.append("description_up", location_description_edit);

    formData.append("tag_up", location_tag_edit);

    let result = await fetch(AppUrl.base_url + "locationUpdate/" + id, {
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

    let blur_bg = document.getElementById("locationEditModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"locationEditModal" + location_id}>
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
                  <label className="text-black font-w500">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={location_title_edit}
                    onChange={(e) => setLocationTitleEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={location_description_edit}
                    onChange={(e) => setLocationDescriptionEdit(e.target.value)}
                    rows="5"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    value={location_tag_edit}
                    onChange={(e) => setLocationTagEdit(e.target.value)}
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
                        onClick={() => locationUpdate(location_id)}
                      >
                        Update
                      </button>
                    </div>

                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ marginLeft: "10px" }}
                        data-toggle="modal"
                        data-target={"#locationImageEditModal" + location_id}
                      >
                        Update Image
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

export default LocationEditModal;
