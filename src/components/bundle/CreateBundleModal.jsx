import React, { useState } from 'react';
import { showErrorToast, showSuccessToast } from '../../utils/toast';

const CreateBundleModal = ({ getBundles }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    regularPrice: '',
    discountPrice: '',
    mockups: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://mockshark-backend.vercel.app/api/v1/bundle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          price: parseFloat(formData.price),
          regularPrice: parseFloat(formData.regularPrice),
          discountPrice: parseFloat(formData.discountPrice),
          mockups: parseInt(formData.mockups),
        }),
      });

      const data = await res.json();

      if (data.success) {
        showSuccessToast('Bundle created successfully!');
        getBundles(); // Refresh list
        document.getElementById('closeCreateBundleModal').click(); // Close modal
        setFormData({
          title: '',
          price: '',
          regularPrice: '',
          discountPrice: '',
          mockups: ''
        });
      } else {
        showErrorToast(data.message || 'Something went wrong!');
      }
    } catch (err) {
      showErrorToast(err.message);
    }
  };

  return (
    <>
      {/* Modal */}
      <div className="modal fade" id="createBundle" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <div className="modal-header">
              <h5 className="modal-title">Create Bundle</h5>
              <button
                id="closeCreateBundleModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body space-y-3">
                <div>
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Regular Price</label>
                  <input
                    type="number"
                    name="regularPrice"
                    className="form-control"
                    value={formData.regularPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Discount Price</label>
                  <input
                    type="number"
                    name="discountPrice"
                    className="form-control"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Mockups</label>
                  <input
                    type="number"
                    name="mockups"
                    className="form-control"
                    value={formData.mockups}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary w-100">
                  Create Bundle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBundleModal;
