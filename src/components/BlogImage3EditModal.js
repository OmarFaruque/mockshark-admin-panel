import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const BlogImage3EditModal = ({
  blogsection_id,
  blogsection_image3,
  get_data,
}) => {
  const [blogsection_image3_edit, setBlogSectionImage3Edit] = useState("");

  const [loader, setLoader] = useState(false);

  //update image1
  async function blogImage3Edit(name) {
    //console.log(name);
    setLoader(true);
    const formData = new FormData();
    formData.append("image3_up", blogsection_image3_edit);

    let result = await fetch(
      AppUrl.base_url + "blogsectionUpdateImage3/" + name,
      {
        method: "POST",
        body: formData,
      }
    );

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setLoader(false);
      get_data();
      let blur_bg = document.getElementById(
        "blogImage3EditModal" + blogsection_id
      );
      blur_bg.click();
    } else {
      toast.error(result.error);
      setLoader(false);
    }
  }
  return (
    <>
      <div className="modal fade" id={"blogImage3EditModal" + blogsection_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Blog Image3</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Image3</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setBlogSectionImage3Edit(e.target.files[0])
                    }
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
                        onClick={() => blogImage3Edit(blogsection_image3)}
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

export default BlogImage3EditModal;
