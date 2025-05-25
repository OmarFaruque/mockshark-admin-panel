import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const BlogEditModal = ({
  blogsection_id,
  blogsection_title,
  blogsection_description1,
  blogsection_description2,
  blogsection_tag,
  blogsection_category,
  blogsection_time,
  blogsection_meta_title,
  blogsection_meta_description,
  get_data,
}) => {
  const [blogsection_title_edit, setBlogSectionTitleEdit] =
    useState(blogsection_title);
  const [blogsection_description1_edit, setBlogSectionDescription1Edit] =
    useState(blogsection_description1);
  const [blogsection_description2_edit, setBlogSectionDescription2Edit] =
    useState(blogsection_description2);
  const [blogsection_tag_edit, setBlogSectionTagEdit] =
    useState(blogsection_tag);
  const [blogsection_category_edit, setBlogSectionCategoryEdit] =
    useState(blogsection_category);
  const [blogsection_time_edit, setBlogSectionTimeEdit] =
    useState(blogsection_time);
  const [blogsection_meta_title_edit, setBlogSectionMetaTitleEdit] = useState(
    blogsection_meta_title
  );
  const [blogsection_meta_description_edit, setBlogSectionMetaDescriptionEdit] =
    useState(blogsection_meta_description);

  const [loader, setLoader] = useState(false);

  async function blogUpdate(id) {
    setLoader(true);
    const formData = new FormData();
    formData.append("title_up", blogsection_title_edit);
    formData.append("description1_up", blogsection_description1_edit);
    formData.append("description2_up", blogsection_description2_edit);
    formData.append("tag_up", blogsection_tag_edit);
    formData.append("category_up", blogsection_category_edit);
    formData.append("time_up", blogsection_time_edit);
    formData.append("meta_title_up", blogsection_meta_title_edit);
    formData.append("meta_description_up", blogsection_meta_description_edit);

    let result = await fetch(AppUrl.base_url + "blogsectionUpdate/" + id, {
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

    let blur_bg = document.getElementById("blogEditModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"blogEditModal" + blogsection_id}>
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
                    value={blogsection_title_edit}
                    onChange={(e) => setBlogSectionTitleEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description 1</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={blogsection_description1_edit}
                    onChange={(e) =>
                      setBlogSectionDescription1Edit(e.target.value)
                    }
                    rows="7"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description 2</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={blogsection_description2_edit}
                    onChange={(e) =>
                      setBlogSectionDescription2Edit(e.target.value)
                    }
                    rows="7"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogsection_tag_edit}
                    onChange={(e) => setBlogSectionTagEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogsection_category_edit}
                    onChange={(e) => setBlogSectionCategoryEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Time</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogsection_time_edit}
                    onChange={(e) => setBlogSectionTimeEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Meta Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogsection_meta_title_edit}
                    onChange={(e) =>
                      setBlogSectionMetaTitleEdit(e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    Meta Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogsection_meta_description_edit}
                    onChange={(e) =>
                      setBlogSectionMetaDescriptionEdit(e.target.value)
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
                        onClick={() => blogUpdate(blogsection_id)}
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
                        data-target={"#blogImage1EditModal" + blogsection_id}
                      >
                        Update Image1
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ marginLeft: "10px" }}
                        data-toggle="modal"
                        data-target={"#blogImage2EditModal" + blogsection_id}
                      >
                        Update Image2
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ marginLeft: "10px" }}
                        data-toggle="modal"
                        data-target={"#blogImage3EditModal" + blogsection_id}
                      >
                        Update Image3
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

export default BlogEditModal;
