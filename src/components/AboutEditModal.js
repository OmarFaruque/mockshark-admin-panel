import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
//import axios from "axios";

const AboutEditModal = ({
  about_id,
  about_description,
  about_list,
  about_phone,
  about_email,
  about_email_other,
  about_location1,
  about_location2,
  about_location,
  about_open_hour,
  // about_menu,
  // about_stuff,
  // about_customer,
  about_fb,
  about_insta,
  about_twitter,
  about_pinterest,
  about_youtube,
  about_delivery_charge,
  youtube_video_id,
  about_hero_text,
  about_menu_text,
  about_gallery_text,
  about_location_text,
  about_contact_text,
  about_faq_text,
  get_data,
}) => {
  const [about_phone_edit, setAboutPhoneEdit] = useState(about_phone);
  const [about_email_edit, setAboutEmailEdit] = useState(about_email);
  const [about_email_other_edit, setAboutEmailOtherEdit] =
    useState(about_email_other);
  const [about_location1_edit, setAboutLocation1Edit] =
    useState(about_location1);
  const [about_location2_edit, setAboutLocation2Edit] =
    useState(about_location2);
  const [about_location_edit, setAboutLocationEdit] = useState(about_location);
  const [about_description_edit, setAboutDescriptionEdit] =
    useState(about_description);
  const [about_list_edit, setAboutListEdit] = useState(about_list);
  // const [about_menu_edit, setAboutMenuEdit] = useState(about_menu);
  // const [about_stuff_edit, setAboutStuffEdit] = useState(about_stuff);
  // const [about_customer_edit, setAboutCustomerEdit] = useState(about_customer);
  const [youtube_video_id_edit, setYoutubeVideoIdEdit] =
    useState(youtube_video_id);
  const [about_fb_edit, setAboutFbEdit] = useState(about_fb);
  const [about_insta_edit, setAboutInstaEdit] = useState(about_insta);
  const [about_twitter_edit, setAboutTwitterEdit] = useState(about_twitter);
  const [about_pinterest_edit, setAboutPinterestEdit] =
    useState(about_pinterest);
  const [about_youtube_edit, setAboutYoutubeEdit] = useState(about_youtube);
  const [about_open_hour_edit, setAboutOpenHourEdit] =
    useState(about_open_hour);
  const [about_delivery_charge_edit, setAboutDeliveryChargeEdit] = useState(
    about_delivery_charge
  );
  const [about_hero_text_edit, setAboutHeroTextEdit] =
    useState(about_hero_text);
  const [about_menu_text_edit, setAboutMenuTextEdit] =
    useState(about_menu_text);
  const [about_gallery_text_edit, setAboutGalleryTextEdit] =
    useState(about_gallery_text);
  const [about_location_text_edit, setAboutLocationTextEdit] =
    useState(about_location_text);
  const [about_contact_text_edit, setAboutContactTextEdit] =
    useState(about_contact_text);
  const [about_faq_text_edit, setAboutFaqTextEdit] = useState(about_faq_text);

  const [loader, setLoader] = useState(false);

  async function aboutUpdate(id) {
    setLoader(true);
    const formData = new FormData();
    formData.append("about_phone", about_phone_edit);
    formData.append("about_email", about_email_edit);
    formData.append("about_email_other", about_email_other_edit);
    formData.append("about_location1", about_location1_edit);
    formData.append("about_location2", about_location2_edit);
    formData.append("about_location", about_location_edit);
    formData.append("about_description", about_description_edit);
    formData.append("about_list", about_list_edit);
    formData.append("youtube_video_id", youtube_video_id_edit);
    // formData.append("about_menu", about_menu_edit);
    // formData.append("about_stuff", about_stuff_edit);
    // formData.append("about_customer", about_customer_edit);
    formData.append("about_fb", about_fb_edit);
    formData.append("about_insta", about_insta_edit);
    formData.append("about_twitter", about_twitter_edit);
    formData.append("about_pinterest", about_pinterest_edit);
    formData.append("about_youtube", about_youtube_edit);
    formData.append("about_open_hour", about_open_hour_edit);
    formData.append("about_delivery_charge", about_delivery_charge_edit);
    formData.append("about_hero_text", about_hero_text_edit);
    formData.append("about_menu_text", about_menu_text_edit);
    formData.append("about_gallery_text", about_gallery_text_edit);
    formData.append("about_location_text", about_location_text_edit);
    formData.append("about_contact_text", about_contact_text_edit);
    formData.append("about_faq_text", about_faq_text_edit);

    let result = await fetch(AppUrl.base_url + "aboutUpdate/" + id, {
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

    let blur_bg = document.getElementById("aboutEditModal" + id);
    blur_bg.click();
  }
  return (
    <>
      <div className="modal fade" id={"aboutEditModal" + about_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">
                    Delivery Charge
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_delivery_charge_edit}
                    onChange={(e) => setAboutDeliveryChargeEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Order Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_email_other_edit}
                    onChange={(e) => setAboutEmailOtherEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    // value={about_description_edit}
                    onChange={(e) => setAboutDescriptionEdit(e.target.value)}
                    rows="5"
                  >
                    {about_description_edit}
                  </textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    What makes us special?
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={about_list_edit}
                    onChange={(e) => setAboutListEdit(e.target.value)}
                    rows="7"
                  >
                    {about_list_edit}
                  </textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    Youtube Video Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={youtube_video_id_edit}
                    onChange={(e) => setYoutubeVideoIdEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_phone_edit}
                    onChange={(e) => setAboutPhoneEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_email_edit}
                    onChange={(e) => setAboutEmailEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Location 1</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_location1_edit}
                    onChange={(e) => setAboutLocation1Edit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Location 2</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_location2_edit}
                    onChange={(e) => setAboutLocation2Edit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Location 3</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_location_edit}
                    onChange={(e) => setAboutLocationEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Opening Hour</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_open_hour_edit}
                    onChange={(e) => setAboutOpenHourEdit(e.target.value)}
                  />
                </div>

                {/* <div className="form-group">
                  <label className="text-black font-w500">Menu</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_menu_edit}
                    onChange={(e) => setAboutMenuEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Staff</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_stuff_edit}
                    onChange={(e) => setAboutStuffEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Customer</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_customer_edit}
                    onChange={(e) => setAboutCustomerEdit(e.target.value)}
                  />
                </div> */}

                <div className="form-group">
                  <label className="text-black font-w500">FB</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_fb_edit}
                    onChange={(e) => setAboutFbEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Instagram</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_insta_edit}
                    onChange={(e) => setAboutInstaEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Twitter</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_twitter_edit}
                    onChange={(e) => setAboutTwitterEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Pinterest</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_pinterest_edit}
                    onChange={(e) => setAboutPinterestEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Youtube</label>
                  <input
                    type="text"
                    className="form-control"
                    value={about_youtube_edit}
                    onChange={(e) => setAboutYoutubeEdit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Hero Text</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={about_hero_text_edit}
                    onChange={(e) => setAboutHeroTextEdit(e.target.value)}
                    rows={5}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Menu Text</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={about_menu_text_edit}
                    onChange={(e) => setAboutMenuTextEdit(e.target.value)}
                    rows={5}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Gallery Text</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={about_gallery_text_edit}
                    onChange={(e) => setAboutGalleryTextEdit(e.target.value)}
                    rows={5}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Location Text</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={about_location_text_edit}
                    onChange={(e) => setAboutLocationTextEdit(e.target.value)}
                    rows={5}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    Contact Us Text
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={about_contact_text_edit}
                    onChange={(e) => setAboutContactTextEdit(e.target.value)}
                    rows={5}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">FAQ Text</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={about_faq_text_edit}
                    onChange={(e) => setAboutFaqTextEdit(e.target.value)}
                    rows={5}
                  ></textarea>
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
                        onClick={() => aboutUpdate(about_id)}
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

export default AboutEditModal;
