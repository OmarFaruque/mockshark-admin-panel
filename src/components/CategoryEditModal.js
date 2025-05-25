import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const CategoryEditModal = ({
  cat_id,
  cat_name,
  get_data,
  cat_meta_title,
  cat_meta_description,
  cat_h1,
}) => {
  const [cat_name_edit, setCatNameEdit] = useState(cat_name);
  const [cat_meta_title_edit, setCatMetaTitleEdit] = useState(cat_meta_title);
  const [cat_meta_description_edit, setCatMetaDescriptionEdit] =
    useState(cat_meta_description);
  const [cat_h1_edit, setCatH1Edit] = useState(cat_h1);
  //const [cat_icon_edit, setCatIconEdit] = useState(cat_icon);
  const [loader, setLoader] = useState(false);

  async function catUpdate(id) {
    setLoader(true);
    const formData = new FormData();
    formData.append("cat_name", cat_name_edit);
    formData.append("cat_meta_title", cat_meta_title_edit);
    formData.append("cat_meta_description", cat_meta_description_edit);
    formData.append("cat_h1", cat_h1_edit);
    //formData.append("cat_icon", cat_icon_edit);

    let result = await fetch(AppUrl.base_url + "categoryUpdate/" + id, {
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

    let blur_bg = document.getElementById("categoryEditModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"categoryEditModal" + cat_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Category</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cat_name_edit}
                    onChange={(e) => setCatNameEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">H1 Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cat_h1_edit}
                    onChange={(e) => setCatH1Edit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Meta Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cat_meta_title_edit}
                    onChange={(e) => setCatMetaTitleEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    Meta Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={cat_meta_description_edit}
                    onChange={(e) => setCatMetaDescriptionEdit(e.target.value)}
                  />
                </div>

                {/* <div className="form-group">
                  <label for="glass_icon" className="text-black font-w500">
                    Category Icon
                  </label>
                  <div className="mt-2">
                    <input
                      type="radio"
                      id="glass_icon"
                      name="cat_icon"
                      value="fa fa-glass"
                      onChange={(e) => setCatIconEdit(e.target.value)}
                      checked={cat_icon_edit === "fa fa-glass"}
                    ></input>
                    <label
                      for="glass_icon"
                      className="text-black font-w500 ml-1"
                    >
                      <i className="fa fa-glass"></i>
                    </label>

                    <input
                      type="radio"
                      id="coffee_icon"
                      name="cat_icon"
                      value="fa fa-coffee"
                      className="ml-4"
                      onChange={(e) => setCatIconEdit(e.target.value)}
                      checked={cat_icon_edit === "fa fa-coffee"}
                    ></input>
                    <label
                      for="coffee_icon"
                      className="text-black font-w500 ml-1"
                    >
                      <i className="fa fa-coffee"></i>
                    </label>

                    <input
                      type="radio"
                      id="eercast_icon"
                      name="cat_icon"
                      value="fa fa-eercast"
                      className="ml-4"
                      onChange={(e) => setCatIconEdit(e.target.value)}
                      checked={cat_icon_edit === "fa fa-eercast"}
                    ></input>
                    <label
                      for="eercast_icon"
                      className="text-black font-w500 ml-1"
                    >
                      <i className="fa fa-eercast"></i>
                    </label>

                    <input
                      type="radio"
                      id="bullseye_icon"
                      name="cat_icon"
                      value="fa fa-bullseye"
                      className="ml-4"
                      onChange={(e) => setCatIconEdit(e.target.value)}
                      checked={cat_icon_edit === "fa fa-bullseye"}
                    ></input>
                    <label
                      for="bullseye_icon"
                      className="text-black font-w500 ml-1"
                    >
                      <i className="fa fa-bullseye"></i>
                    </label>

                    <input
                      type="radio"
                      id="spoon_icon"
                      name="cat_icon"
                      value="fa fa-spoon"
                      className="ml-4"
                      onChange={(e) => setCatIconEdit(e.target.value)}
                      checked={cat_icon_edit === "fa fa-spoon"}
                    ></input>
                    <label
                      for="spoon_icon"
                      className="text-black font-w500 ml-1"
                    >
                      <i className="fa fa-spoon"></i>
                    </label>

                    <input
                      type="radio"
                      id="cutlery_icon"
                      name="cat_icon"
                      value="fa fa-cutlery"
                      className="ml-4"
                      onChange={(e) => setCatIconEdit(e.target.value)}
                      checked={cat_icon_edit === "fa fa-cutlery"}
                    ></input>
                    <label
                      for="cutlery_icon"
                      className="text-black font-w500 ml-1"
                    >
                      <i className="fa fa-cutlery"></i>
                    </label>

                    <input
                      type="radio"
                      id="stack-exchange_icon"
                      name="cat_icon"
                      value="fa fa-stack-exchange"
                      className="ml-4"
                      onChange={(e) => setCatIconEdit(e.target.value)}
                      checked={cat_icon_edit === "fa fa-stack-exchange"}
                    ></input>
                    <label
                      for="stack-exchange_icon"
                      className="text-black font-w500 ml-1"
                    >
                      <i className="fa fa-stack-exchange"></i>
                    </label>

                    <input
                      type="radio"
                      id="codiepie_icon"
                      name="cat_icon"
                      value="fa fa-codiepie"
                      className="ml-4"
                      onChange={(e) => setCatIconEdit(e.target.value)}
                      checked={cat_icon_edit === "fa fa-codiepie"}
                    ></input>
                    <label
                      for="codiepie_icon"
                      className="text-black font-w500 ml-1"
                    >
                      <i className="fa fa-codiepie"></i>
                    </label>

                    <input
                      type="radio"
                      id="bitbucket_icon"
                      name="cat_icon"
                      value="fa fa-bitbucket"
                      className="ml-3"
                      onChange={(e) => setCatIconEdit(e.target.value)}
                      checked={cat_icon_edit === "fa fa-bitbucket"}
                    ></input>
                    <label
                      for="bitbucket_icon"
                      className="text-black font-w500 ml-1"
                    >
                      <i className="fa fa-bitbucket"></i>
                    </label>

                    <input
                      type="radio"
                      id="pie-chart_icon"
                      name="cat_icon"
                      value="fa fa-pie-chart"
                      className="ml-4"
                      onChange={(e) => setCatIconEdit(e.target.value)}
                      checked={cat_icon_edit === "fa fa-pie-chart"}
                    ></input>
                    <label
                      for="pie-chart_icon"
                      className="text-black font-w500 ml-1"
                    >
                      <i className="fa fa-pie-chart"></i>
                    </label>

                    <input
                      type="radio"
                      id="cubes_icon"
                      name="cat_icon"
                      value="fa fa-cubes"
                      className="ml-4"
                      onChange={(e) => setCatIconEdit(e.target.value)}
                      checked={cat_icon_edit === "fa fa-cubes"}
                    ></input>
                    <label
                      for="cubes_icon"
                      className="text-black font-w500 ml-1"
                    >
                      <i className="fa fa-cubes"></i>
                    </label>
                  </div>
                </div> */}

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
                        onClick={() => catUpdate(cat_id)}
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

export default CategoryEditModal;
