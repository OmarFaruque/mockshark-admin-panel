import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";

const ProductFeaturedModal = ({ product_id, get_data }) => {
  //featured product
  async function productFeatured(id) {
    let result = await fetch(AppUrl.base_url + "productFeatured/" + id, {
      method: "POST",
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
    } else {
      toast.error(result.error);
    }

    get_data();

    let blur_bg = document.getElementById("productFeaturedModal" + id);
    blur_bg.click();
  }

  //unfeatured product
  async function productUnFeatured(id) {
    let result = await fetch(AppUrl.base_url + "productUnFeatured/" + id, {
      method: "POST",
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
    } else {
      toast.error(result.error);
    }

    get_data();

    let blur_bg = document.getElementById("productFeaturedModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"productFeaturedModal" + product_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Make Cake & Sweets</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">
                    Want to add this product to cake & sweets?
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
                    onClick={() => productFeatured(product_id)}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn_unpopular"
                    onClick={() => productUnFeatured(product_id)}
                  >
                    Remove
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

export default ProductFeaturedModal;
