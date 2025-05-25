import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const HeroSectionEditModal = ({
  hero_section_id,
  hero_section_title,
  hero_section_description,
  get_data,
}) => {
  const [hero_section_title_edit, setHeroSectionTitleEdit] =
    useState(hero_section_title);
  const [hero_section_description_edit, setHeroSectionDescriptionEdit] =
    useState(hero_section_description);

  const [loader, setLoader] = useState(false);

  async function heroSectionUpdate(id) {
    setLoader(true);
    const formData = new FormData();
    formData.append("hero_section_title", hero_section_title_edit);
    formData.append("hero_section_description", hero_section_description_edit);

    let result = await fetch(AppUrl.base_url + "heroSectionUpdate/" + id, {
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

    let blur_bg = document.getElementById("heroSectionEditModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"heroSectionEditModal" + hero_section_id}>
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
                    value={hero_section_title_edit}
                    onChange={(e) => setHeroSectionTitleEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={hero_section_description_edit}
                    onChange={(e) =>
                      setHeroSectionDescriptionEdit(e.target.value)
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
                        onClick={() => heroSectionUpdate(hero_section_id)}
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

export default HeroSectionEditModal;
