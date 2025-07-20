import React, { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const EditBundleModal = ({ bundle, getBundles, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    regularPrice: "",
    discountPrice: "",
    mockups: ""
  });

  useEffect(() => {
    if (bundle) {
      setFormData({
        title: bundle.title || "",
        price: bundle.price || "",
        regularPrice: bundle.regularPrice || "",
        discountPrice: bundle.discountPrice || "",
        mockups: bundle.mockups || ""
      });
    }
  }, [bundle]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/bundle-update/${bundle.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );
      const data = await res.json();

      if (data.success) {
        showSuccessToast("Bundle updated successfully!");
        getBundles();
        onClose(); // ⛔ Close modal without Bootstrap
      } else {
        showErrorToast(data.message || "Failed to update bundle.");
      }
    } catch (err) {
      showErrorToast(err.message);
    }
  };

  if (!bundle) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h3>Edit Bundle</h3>
          <button onClick={onClose}>X</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {["title", "price", "regularPrice", "discountPrice", "mockups"].map((field) => (
              <div key={field} className="form-group mb-2">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === "title" ? "text" : "number"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn btn-primary w-100">
              Update Bundle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBundleModal;
