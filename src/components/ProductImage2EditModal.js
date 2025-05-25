import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const ProductImage2EditModal = ({
  product_id,
  product_image,
  product_image2,
  get_data,
}) => {
  const [product_image_edit, setProductImageEdit] = useState("");
  const [product_image2_edit, setProductImage2Edit] = useState("");

  const [loader, setLoader] = useState(false);

  //update image1
  async function productImage2Edit(name) {
    if (product_image2 === "n/a") {
      name = product_image;
    }
    console.log(name);
    setLoader(true);
    const formData = new FormData();
    formData.append("product_image2", product_image2_edit);

    let result = await fetch(AppUrl.base_url + "productImage2Update/" + name, {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setLoader(false);
      get_data();
      let blur_bg = document.getElementById(
        "productImage2EditModal" + product_id
      );
      blur_bg.click();
    } else {
      toast.error(result.error);
      setLoader(false);
    }
  }
  return (
    <>
      <div className="modal fade" id={"productImage2EditModal" + product_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Product Image</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Product Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setProductImage2Edit(e.target.files[0])}
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
                        onClick={() => productImage2Edit(product_image2)}
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

export default ProductImage2EditModal;
