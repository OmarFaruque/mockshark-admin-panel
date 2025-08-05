import React, { useState } from 'react';
import Modal from '../global/Modal';

const CreateBlogModal = ({ addBlog }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  // Handle form submit
  const handleSubmit = () => {
    if (!form.title || !form.description) {
      alert('Please fill all fields');
      return;
    }
    const newBlog = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      image: form.imagePreview,
    };
    addBlog(newBlog);
    setForm({ title: '', description: '', image: null, imagePreview: '' });
    document.getElementById('closeModalBtn').click(); // Close modal
  };

  return (
    <Modal id="createNewBlog" title="Blogs">
      <div className="form-group">
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter blog title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter description"
        />
      </div>

      <div className="form-group">
        <label>Image</label>
        <input type="file" onChange={handleImageChange} className="form-control" />
        {form.imagePreview && (
          <img
            src={form.imagePreview}
            alt="preview"
            style={{
              width: '100px',
              height: '70px',
              objectFit: 'cover',
              marginTop: '10px',
              borderRadius: '5px',
            }}
          />
        )}
      </div>

      <button
        id="closeModalBtn"
        type="button"
        className="d-none"
        data-dismiss="modal"
      ></button>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Create
      </button>
    </Modal>
  );
};

export default CreateBlogModal;
