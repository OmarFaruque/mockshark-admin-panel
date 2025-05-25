import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const PublicationEditModal = ({
  publication_id,
  publication_title,
  publication_description,

  publication_tag,
  publication_date,
  publication_link,

  get_data,
}) => {
  const [publication_title_edit, setPublicationTitleEdit] =
    useState(publication_title);
  const [publication_description_edit, setPublicationDescriptionEdit] =
    useState(publication_description);

  const [publication_tag_edit, setPublicationTagEdit] =
    useState(publication_tag);
  const [publication_date_edit, setPublicationDateEdit] =
    useState(publication_date);
  const [publication_link_edit, setPublicationLinkEdit] =
    useState(publication_link);

  const [loader, setLoader] = useState(false);

  async function publicationUpdate(id) {
    setLoader(true);
    const formData = new FormData();
    formData.append("title_up", publication_title_edit);
    formData.append("description_up", publication_description_edit);

    formData.append("tag_up", publication_tag_edit);
    formData.append("date_up", publication_date_edit);
    formData.append("link_up", publication_link_edit);

    let result = await fetch(AppUrl.base_url + "publicationUpdate/" + id, {
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

    let blur_bg = document.getElementById("publicationEditModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"publicationEditModal" + publication_id}>
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
                    value={publication_title_edit}
                    onChange={(e) => setPublicationTitleEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={publication_description_edit}
                    onChange={(e) =>
                      setPublicationDescriptionEdit(e.target.value)
                    }
                    rows="5"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    value={publication_tag_edit}
                    onChange={(e) => setPublicationTagEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={publication_date_edit}
                    onChange={(e) => setPublicationDateEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Link</label>
                  <input
                    type="text"
                    className="form-control"
                    value={publication_link_edit}
                    onChange={(e) => setPublicationLinkEdit(e.target.value)}
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
                        onClick={() => publicationUpdate(publication_id)}
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
                        data-target={
                          "#publicationImageEditModal" + publication_id
                        }
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

export default PublicationEditModal;
