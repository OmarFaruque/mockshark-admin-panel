import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";

const HeroSectionDeleteModal = ({ hero_section_id, get_data }) => {
  //delete data
  async function heroSectionDelete(id) {
    let result = await fetch(AppUrl.base_url + "heroSectionDelete/" + id, {
      method: "POST",
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
    } else {
      toast.error(result.error);
    }

    get_data();

    let blur_bg = document.getElementById("heroSectionDeleteModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div
        className="modal fade"
        id={"heroSectionDeleteModal" + hero_section_id}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Data</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">
                    Want to delete this data?
                  </label>
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

                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => heroSectionDelete(hero_section_id)}
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSectionDeleteModal;
