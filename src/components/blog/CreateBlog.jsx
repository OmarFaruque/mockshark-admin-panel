import React, { useState, useEffect } from "react";
import IndianaDragScroller from "../global/IndianaDragScroller";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const API_BASE = "https://mockshark-backend.vercel.app/api/v1";

const CreateBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    imagePreview: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/blogs`);
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle text input
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

  // Create blog
  const handleCreate = async () => {
    if (!form.title || !form.description || !form.image) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("image", form.image);

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/create-blog`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        showSuccessToast("Blog created successfully!");
        fetchBlogs();
        resetForm();
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setIsEditing(true);
    setEditId(blog.id);
    setForm({
      title: blog.title,
      description: blog.description,
      image: null,
      imagePreview: blog.image,
    });
    setShowForm(true);
  };

  // Update blog
  const handleUpdate = async () => {
    if (!form.title || !form.description) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image) {
      formData.append("image", form.image); // new image if uploaded
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/blogs/${editId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        showSuccessToast("Blog updated successfully!");
        fetchBlogs();
        resetForm();
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete blog
  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const res = await fetch(`${API_BASE}/blogs/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          showSuccessToast("Blog deleted successfully!");
          fetchBlogs();
        } else {
          showErrorToast(data.message);
        }
      } catch (error) {
        showErrorToast(error.message);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({ title: "", description: "", image: null, imagePreview: "" });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        {/* Header */}
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5>Blogs ({blogs.length})</h5>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            + Add Blog
          </button>
        </div>

        {/* Form Popup */}
        {showForm && (
          <div
            style={{
              background: "#f8f9fa",
              padding: "20px",
              borderRadius: "8px",
              margin: "15px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            }}
          >
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

            <div className="form-group mt-2">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter description"
              />
            </div>

            <div className="form-group mt-2">
              <label>Image</label>
              <input type="file" onChange={handleImageChange} className="form-control" />
              {form.imagePreview && (
                <img
                  src={form.imagePreview}
                  alt="preview"
                  style={{
                    width: "100px",
                    height: "70px",
                    objectFit: "cover",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                />
              )}
            </div>

            <div className="mt-3">
              {isEditing ? (
                <button
                  className="btn btn-success me-2"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              ) : (
                <button
                  className="btn btn-primary me-2"
                  onClick={handleCreate}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              )}
              <button className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Blog Table */}
        <div className="card-body">
          <div className="table-responsive">
            <IndianaDragScroller>
              <table className="table table-responsive-md">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                      <tr key={blog.id}>
                        <td>{index + 1}</td>
                        <td>{blog.title}</td>
                        <td>{blog.description}</td>
                        <td>
                          {blog.image && (
                            <img
                              src={blog.image}
                              alt="blog"
                              style={{
                                width: "80px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                            />
                          )}
                        </td>
                        <td>
                          <span
                            className="badge cursor-pointer"
                            style={{
                              backgroundColor: "#007bff",
                              color: "white",
                              padding: "0.3em 0.75em",
                              fontWeight: "600",
                              fontSize: "0.85rem",
                              borderRadius: "0.35rem",
                              marginRight: "0.5rem",
                            }}
                            onClick={() => handleEdit(blog)}
                          >
                            Edit
                          </span>
                          <span
                            className="badge cursor-pointer"
                            style={{
                              backgroundColor: "#dc3545",
                              color: "white",
                              padding: "0.3em 0.75em",
                              fontWeight: "600",
                              fontSize: "0.85rem",
                              borderRadius: "0.35rem",
                            }}
                            onClick={() => deleteBlog(blog.id)}
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No blogs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </IndianaDragScroller>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
