import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const HeroSectionImageEditModal = ({
  hero_section_id,
  hero_section_image,
  get_data,
}) => {
  const [hero_section_image_edit, setHeroSectionImageEdit] = useState("");

  const [loader, setLoader] = useState(false);

  //update image1
  async function heroSectionImageEdit(name) {
    //console.log(name);
    setLoader(true);
    const formData = new FormData();
    formData.append("hero_section_image", hero_section_image_edit);

    let result = await fetch(
      AppUrl.base_url + "heroSectionImageUpdate/" + name,
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
        "heroSectionImageEditModal" + hero_section_id
      );
      blur_bg.click();
    } else {
      toast.error(result.error);
      setLoader(false);
    }
  }
  return (
    <>
      <div
        className="modal fade"
        id={"heroSectionImageEditModal" + hero_section_id}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Hero Section Image</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setHeroSectionImageEdit(e.target.files[0])}
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
                        onClick={() => heroSectionImageEdit(hero_section_image)}
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

export default HeroSectionImageEditModal;
