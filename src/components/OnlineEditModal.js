import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const OnlineEditModal = ({
  online_id,
  online_title,
  online_description,

  online_tag,
  online_date,
  online_link,

  get_data,
}) => {
  const [online_title_edit, setOnlineTitleEdit] = useState(online_title);
  const [online_description_edit, setOnlineDescriptionEdit] =
    useState(online_description);

  const [online_tag_edit, setOnlineTagEdit] = useState(online_tag);
  const [online_date_edit, setOnlineDateEdit] = useState(online_date);
  const [online_link_edit, setOnlineLinkEdit] = useState(online_link);

  const [loader, setLoader] = useState(false);

  async function onlineUpdate(id) {
    setLoader(true);
    const formData = new FormData();
    formData.append("title_up", online_title_edit);
    formData.append("description_up", online_description_edit);

    formData.append("tag_up", online_tag_edit);
    formData.append("date_up", online_date_edit);
    formData.append("link_up", online_link_edit);

    let result = await fetch(AppUrl.base_url + "onlineUpdate/" + id, {
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

    let blur_bg = document.getElementById("onlineEditModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"onlineEditModal" + online_id}>
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
                    value={online_title_edit}
                    onChange={(e) => setOnlineTitleEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={online_description_edit}
                    onChange={(e) => setOnlineDescriptionEdit(e.target.value)}
                    rows="5"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    value={online_tag_edit}
                    onChange={(e) => setOnlineTagEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={online_date_edit}
                    onChange={(e) => setOnlineDateEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Link</label>
                  <input
                    type="text"
                    className="form-control"
                    value={online_link_edit}
                    onChange={(e) => setOnlineLinkEdit(e.target.value)}
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
                        onClick={() => onlineUpdate(online_id)}
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
                        data-target={"#onlineImageEditModal" + online_id}
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

export default OnlineEditModal;
