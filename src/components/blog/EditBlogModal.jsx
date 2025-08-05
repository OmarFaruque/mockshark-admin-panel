import React, { useState, useEffect } from 'react';
import Modal from '../global/Modal';
import { showErrorToast, showSuccessToast } from '../../utils/toast';

const EditBlogModal = ({ blog, getBlogs, onClose }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    content: '',
  });

  useEffect(() => {
    if (blog) {
      setForm({
        title: blog.title || '',
        author: blog.author || '',
        category: blog.category || '',
        content: blog.content || '',
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `https://your-backend-url.com/api/v1/blog/${blog.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      const result = await res.json();

      if (result.success) {
        showSuccessToast('Blog updated successfully!');
        getBlogs();
        onClose();
      } else {
        showErrorToast(result.message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <Modal id="editBlog" title="Edit Blog" show={true} onClose={onClose}>
      <div className="form-group">
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Author</label>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button className="btn btn-success mt-3" onClick={handleUpdate}>
        Update
      </button>
    </Modal>
  );
};

export default EditBlogModal;
