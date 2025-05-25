import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const GalleryEditModal = ({ gallery_id, gallery_caption, get_data }) => {
  const [gallery_caption_edit, setGalleryCaptionEdit] =
    useState(gallery_caption);

  const [loader, setLoader] = useState(false);

  async function galleryUpdate(id) {
    setLoader(true);
    const formData = new FormData();
    formData.append("gallery_caption", gallery_caption_edit);

    let result = await fetch(AppUrl.base_url + "galleryUpdate/" + id, {
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

    let blur_bg = document.getElementById("galleryEditModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"galleryEditModal" + gallery_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Caption</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Caption</label>
                  <input
                    type="text"
                    className="form-control"
                    value={gallery_caption_edit}
                    onChange={(e) => setGalleryCaptionEdit(e.target.value)}
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
                        onClick={() => galleryUpdate(gallery_id)}
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

export default GalleryEditModal;
