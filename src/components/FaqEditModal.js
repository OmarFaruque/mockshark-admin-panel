import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const FaqEditModal = ({ faq_id, faq_title, faq_description, get_data }) => {
  const [faq_title_edit, setFaqTitleEdit] = useState(faq_title);
  const [faq_description_edit, setFaqDescriptionEdit] =
    useState(faq_description);

  const [loader, setLoader] = useState(false);

  async function faqUpdate(id) {
    setLoader(true);
    const formData = new FormData();
    formData.append("faq_title", faq_title_edit);
    formData.append("faq_description", faq_description_edit);

    let result = await fetch(AppUrl.base_url + "faqUpdate/" + id, {
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

    let blur_bg = document.getElementById("faqEditModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"faqEditModal" + faq_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Faq</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Faq Question</label>
                  <input
                    type="text"
                    className="form-control"
                    value={faq_title_edit}
                    onChange={(e) => setFaqTitleEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Faq Answer</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={faq_description_edit}
                    onChange={(e) => setFaqDescriptionEdit(e.target.value)}
                    rows={"6"}
                  ></textarea>
                </div>

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
                        onClick={() => faqUpdate(faq_id)}
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

export default FaqEditModal;
