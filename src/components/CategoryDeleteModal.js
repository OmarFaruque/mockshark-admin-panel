import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";

const CategoryDeleteModal = ({ cat_id, get_data }) => {
  //delete data
  async function catDelete(id) {
    let result = await fetch(AppUrl.base_url + "categoryDelete/" + id, {
      method: "POST",
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
    } else {
      toast.error(result.error);
    }

    get_data();

    let blur_bg = document.getElementById("categoryDeleteModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"categoryDeleteModal" + cat_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Category</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">
                    Want to delete this?
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
                    onClick={() => catDelete(cat_id)}
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

export default CategoryDeleteModal;
