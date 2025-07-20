
import React, { useEffect, useState, useCallback } from 'react';
import fetchData from '../../libs/api';
import Button from '../global/Button';
import CardHeader from '../global/CardHeader';
import IndianaDragScroller from '../global/IndianaDragScroller';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import CreateBundleModal from './CreateBundleModal';
import EditBundleModal from './EditBundleModal';
import Modal from '../global/Modal';

const CreateBundle = () => {
  const [bundles, setBundles] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const getBundles = useCallback(() => {
    setLoading(true);

    fetchData(`/api/v1/bundles?page=${page}&limit=${limit}`, 'GET')
      .then((result) => {
        if (result.success) {
          setBundles((prev) =>
            page === 1 ? result.data : [...prev, ...result.data]
          );
        } else {
          showErrorToast(result.message);
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, limit]);

  useEffect(() => {
    getBundles();
  }, [page]);


const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this bundle?')) {
    try {
      const res = await fetch(`https://mockshark-backend.vercel.app/api/v1/bundle/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (result.success) {
        showSuccessToast('Bundle deleted successfully!');
        getBundles(); // ✅ Refresh list
      } else {
        showErrorToast(result.message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }
};
// const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// const [selectedBundle, setSelectedBundle] = useState(null);

// const openEditModal = (bundle) => {
//   setSelectedBundle(bundle);
//   setIsEditModalOpen(true);
// };

// const closeEditModal = () => {
//   setSelectedBundle(null);
//   setIsEditModalOpen(false);
// };
const [selectedBundle, setSelectedBundle] = useState(null);

const openEditModal = (bundle) => {
  setSelectedBundle(bundle);
};

const closeEditModal = () => {
  setSelectedBundle(null);
};


  return (
    
    <>
    <CreateBundleModal getBundles={getBundles} />
{selectedBundle && (
  <EditBundleModal
    bundle={selectedBundle}
    getBundles={getBundles}
    onClose={closeEditModal}
  />
)}


      {/* Header */}
      <div className="col-lg-12 ">
        <div className="card">
          <CardHeader
  title="Bundles"
  modalId="#createBundle"
  buttonText="+"
  btnClass="btnAdd"
  totalCount={bundles.length}
/>


          <div className="card-body">
            <div className="table-responsive ">
              <IndianaDragScroller>
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Regular Price</th>
                      <th>Discount</th>
                      <th>Mockups</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bundles?.length > 0 ? (
                      bundles.map((bundle, index) => (
                        <tr key={bundle.id}>
                          <td>{index + 1}</td>
                          <td>{bundle.title}</td>
                          <td>${bundle.price.toFixed(2)}</td>
                          <td>${bundle.regularPrice.toFixed(2)}</td>
                          <td>${bundle.discountPrice.toFixed(2)}</td>
                          <td>{bundle.mockups}</td>
                          <td>{new Date(bundle.createdAt).toLocaleDateString()}</td>
                          <td>
<span
  className="badge cursor-pointer"
  style={{
    backgroundColor: '#007bff',      // Bootstrap primary
    color: 'white',
    padding: '0.3em 0.75em',
    fontWeight: '600',
    fontSize: '0.85rem',
    borderRadius: '0.35rem',
    marginRight: '0.5rem',
    transition: 'background-color 0.3s, transform 0.2s'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#0056b3'; // darker on hover
    e.currentTarget.style.transform = 'scale(1.05)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = '#007bff'; 
    e.currentTarget.style.transform = 'scale(1)';
  }}
  onClick={() => openEditModal(bundle)}
>
  Edit
</span>





                            {/* Action buttons can be added here later */}
      <span
  className="badge cursor-pointer"
  style={{
    backgroundColor: '#dc3545',      // Bootstrap danger
    color: 'white',
    padding: '0.3em 0.75em',
    fontWeight: '600',
    fontSize: '0.85rem',
    borderRadius: '0.35rem',
    transition: 'background-color 0.3s, transform 0.2s'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#a71d2a'; // darker red on hover
    e.currentTarget.style.transform = 'scale(1.05)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = '#dc3545'; 
    e.currentTarget.style.transform = 'scale(1)';
  }}
  onClick={() => handleDelete(bundle.id)}
>
  Delete
</span>


                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-muted">
                          No bundles found
                        </td>
                      </tr>
                    )}
                  </tbody>

                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Regular Price</th>
                      <th>Discount</th>
                      <th>Mockups</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </table>
              </IndianaDragScroller>

              {/* Load more */}
              {bundles.length >= page * limit && (
                <div className="col-md-12 text-center mt-4">
                  <Button
                    buttonText={loading ? 'Loading...' : 'Load more'}
                    fontSize="12px"
                    buttonOnClick={loadMore}
                    disabled={loading}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBundle;
