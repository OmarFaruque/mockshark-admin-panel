import React, { useState, useEffect } from "react";
import "./css/category-list.css";
//import AddOrderSidebar from "./AddOrderSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "./classes/AppUrl";
import axios from "axios";
import ProductEditModal from "./ProductEditModal";
import ProductDeleteModal from "./ProductDeleteModal";
import ProductPopularModal from "./ProductPopularModal";
import ProductFeaturedModal from "./ProductFeaturedModal";
import ProductImageEditModal from "./ProductImageEditModal";
import ProductImage1EditModal from "./ProductImage1EditModal";
import ProductImage2EditModal from "./ProductImage2EditModal";
import ProductImage3EditModal from "./ProductImage3EditModal";

const ProductList = () => {
  const [product_name, setProductName] = useState("");
  const [product_detail, setProductDetail] = useState("");
  const [product_shipping_detail, setProductShippingDetail] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_unit, setProductUnit] = useState("");
  const [product_cat_id, setProductCatId] = useState("");
  const [product_color, setProductColor] = useState("");
  const [product_h1, setProductH1] = useState("");
  const [product_meta_title, setProductMetaTitle] = useState("");
  const [product_meta_description, setProductMetaDescription] = useState("");
  const [product_image, setProductImage] = useState("");
  const [product_image1, setProductImage1] = useState("");
  const [product_image2, setProductImage2] = useState("");
  const [product_image3, setProductImage3] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [loader, setLoader] = useState(false);

  const [files, setFiles] = useState([]);
  const [image, setImage] = useState([]);

  const selectImage = (e) => {
    let img = [...image];
    let file = [...files];
    if (e.target.files.length > 0) {
      for (var i = 0; i < e.target.files.length; i++) {
        img.push(URL.createObjectURL(e.target.files[i]));
        file.push(e.target.files[i]);
        setImage(img);
        setFiles(file);
      }

      setProductImage(file[0]);

      if (file.length > 1) {
        setProductImage1(file[1]);
      }
      if (file.length > 2) {
        setProductImage2(file[2]);
      }
      if (file.length > 3) {
        setProductImage3(file[3]);
      }
      //setImage(image);
      // setFiles(files.push(e.target.files[0]));
      // console.log(pic_name);
      // console.log(files);
    }
  };

  const removeImg = (e, index) => {
    e.preventDefault();
    const remove_image = image.splice(index, 1);
    const remove_files = files.splice(index, 1);
    setImage(image.filter((item) => item !== remove_image[0]));
    setFiles(files.filter((item) => item !== remove_files[0]));
  };

  useEffect(() => {
    getData();
    getData1();
  }, []);

  function getData() {
    axios
      .get(AppUrl.base_url + "categoryGet")
      .then(function (response) {
        if (response) {
          setData(response.data);

          //console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getData1() {
    axios
      .get(AppUrl.base_url + "productGet")
      .then(function (response) {
        if (response) {
          setData1(response.data);
          setLoader(false);
          //console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function productAdd() {
    setLoader(true);
    const formData = new FormData();
    formData.append("product_name", product_name);
    formData.append("product_detail", product_detail);
    formData.append("product_shipping_detail", product_shipping_detail);
    formData.append("product_price", product_price);
    formData.append("product_unit", product_unit);
    formData.append("product_cat_id", product_cat_id);
    formData.append("product_color", product_color);
    formData.append("product_h1", product_h1);
    formData.append("product_meta_title", product_meta_title);
    formData.append("product_meta_description", product_meta_description);
    formData.append("product_image", product_image);
    formData.append("product_image1", product_image1);
    formData.append("product_image2", product_image2);
    formData.append("product_image3", product_image3);

    let result = await fetch(AppUrl.base_url + "productAdd", {
      method: "POST",
      body: formData,
    });

    result = await result.json();

    if (result.success) {
      toast.success(result.success);
      setProductName("");
      setProductDetail("");
      setProductPrice("");
      setProductH1("");
      setProductMetaDescription("");
      setProductMetaTitle("");
      //   setProductCatId("");
      setProductImage("");
      setProductImage1("");
      setProductImage2("");
      setProductImage3("");
      setImage([]);
      setFiles([]);
      setLoader(false);
    } else {
      toast.error(result.error);
      setLoader(false);
    }

    getData1();
  }
  return (
    <>
      <ToastContainer />
      {/* add modal */}
      <div className="modal fade" id="productAddModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={product_name}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Product Detail</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={product_detail}
                    onChange={(e) => setProductDetail(e.target.value)}
                    rows={5}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    Product Price (only number)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={product_price}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    Product Unit (i.e: kg/pc/ltr/ml etc)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={product_unit}
                    onChange={(e) => setProductUnit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    Shipping Detail
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={product_shipping_detail}
                    onChange={(e) => setProductShippingDetail(e.target.value)}
                    rows={5}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Product Image</label>
                  {image.length < 4 && (
                    <>
                      <input
                        type="file"
                        className="form-control"
                        //onChange={(e) => setProductImage(e.target.files[0])}
                        onChange={(e) => selectImage(e)}
                        multiple
                      />
                    </>
                  )}

                  <div
                    className="product_images_preview"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    {image.map((img, index) => {
                      return (
                        <>
                          <img
                            src={img}
                            alt="product image"
                            style={{
                              width: "100%",
                              height: "250px",
                              objectFit: "cover",
                              marginRight: "5px",
                              marginBottom: "5px",
                            }}
                          />

                          <button
                            type="button"
                            onClick={(e) => removeImg(e, index)}
                            style={{
                              color: "white",
                              background: "red",
                              // position: "absolute",
                              // top: "0",
                              // left: "0",
                            }}
                          >
                            Remove
                          </button>
                        </>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Category</label>
                  <select
                    name="cat_icon"
                    id="cat_icon"
                    className="form-control"
                    onChange={(e) => setProductCatId(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {data.map((item) => (
                      <option value={item.cat_id} key={item.cat_id}>
                        {item.cat_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Color</label>
                  <select
                    name="color"
                    id="color"
                    className="form-control"
                    onChange={(e) => setProductColor(e.target.value)}
                  >
                    <option value="">Select a color</option>

                    <option value="orange">Orange</option>
                    <option value="dark-pink">Pink</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="brown">Brown</option>
                    <option value="black">Dark Brown</option>
                    <option value="light-pink">Light Pink</option>
                    <option value="date">Light Brown</option>
                    <option value="yuzu">Greenish Yellow</option>
                    <option value="lotus">Light Red</option>
                    <option value="vanilla">Yellow</option>
                    <option value="caramel">Caramel Brown</option>
                    <option value="coconut">Grayish offwhite</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">H1 Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={product_h1}
                    onChange={(e) => setProductH1(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Meta Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={product_meta_title}
                    onChange={(e) => setProductMetaTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">
                    Meta Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={product_meta_description}
                    onChange={(e) => setProductMetaDescription(e.target.value)}
                  />
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
                        onClick={() => productAdd()}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Products</h4>
            {/* <i className="fa fa-codiepie add_new_icon"></i> */}
            <a
              href="true"
              className="btn btn-secondary btn-rounded"
              data-toggle="modal"
              data-target="#productAddModal"
            >
              +Add Product
            </a>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    {/* <th class="width20">#</th> */}
                    <th>Image</th>
                    <th>Image2</th>
                    <th>Image3</th>
                    <th>Image4</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Hero</th>
                    <th>Cake&Sweets</th>
                    {/* <th>Detail</th> */}

                    <th>Category</th>
                    <th>Created</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((item, index) => (
                    <tr key={item.product_id}>
                      {/* <td>
                        <strong>{index + 1}</strong>
                      </td> */}
                      <td>
                        <img
                          className="product_list_image"
                          src={AppUrl.image_url_backend + item.product_image}
                          alt={item.product_name}
                          data-toggle="modal"
                          data-target={
                            "#productImageEditModal" + item.product_id
                          }
                        />
                      </td>
                      <td>
                        <img
                          className="product_list_image"
                          src={
                            item.product_image1 === "n/a"
                              ? "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                              : AppUrl.image_url_backend + item.product_image1
                          }
                          alt={item.product_name}
                          data-toggle="modal"
                          data-target={
                            "#productImage1EditModal" + item.product_id
                          }
                        />
                      </td>
                      <td>
                        <img
                          className="product_list_image"
                          src={
                            item.product_image2 === "n/a"
                              ? "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                              : AppUrl.image_url_backend + item.product_image2
                          }
                          alt={item.product_name}
                          data-toggle="modal"
                          data-target={
                            "#productImage2EditModal" + item.product_id
                          }
                        />
                      </td>
                      <td>
                        <img
                          className="product_list_image"
                          src={
                            item.product_image3 === "n/a"
                              ? "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                              : AppUrl.image_url_backend + item.product_image3
                          }
                          alt={item.product_name}
                          data-toggle="modal"
                          data-target={
                            "#productImage3EditModal" + item.product_id
                          }
                        />
                      </td>
                      <td>{item.product_name}</td>
                      <td>{item.product_price} TK</td>
                      <td>
                        {item.product_popular === "1" ? (
                          <span class="badge light badge-success">Yes</span>
                        ) : (
                          <span class="badge light badge-danger">No</span>
                        )}
                      </td>
                      <td>
                        {item.product_featured === "1" ? (
                          <span class="badge light badge-success">Yes</span>
                        ) : (
                          <span class="badge light badge-danger">No</span>
                        )}
                      </td>
                      {/* <td>{item.product_detail}</td> */}

                      <td>{item.cat_name}</td>
                      <td>{item.product_date}</td>

                      <td>
                        <div class="dropdown">
                          <button
                            type="button"
                            class="btn btn-success light sharp"
                            data-toggle="dropdown"
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="5" cy="12" r="2" />
                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                <circle fill="#000000" cx="19" cy="12" r="2" />
                              </g>
                            </svg>
                          </button>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#productEditModal" + item.product_id
                              }
                            >
                              Edit
                            </a>
                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#productPopularModal" + item.product_id
                              }
                            >
                              Add to Hero Section
                            </a>
                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#productFeaturedModal" + item.product_id
                              }
                            >
                              Add to Cake & Sweets
                            </a>
                            <a
                              class="dropdown-item"
                              href="true"
                              data-toggle="modal"
                              data-target={
                                "#productDeleteModal" + item.product_id
                              }
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                      <ProductEditModal
                        product_id={item.product_id}
                        product_name={item.product_name}
                        product_detail={item.product_detail}
                        product_shipping_detail={item.product_shipping_detail}
                        product_price={item.product_price}
                        product_unit={item.product_unit}
                        product_cat_id={item.product_cat_id}
                        product_color={item.product_color}
                        product_h1={item.product_h1}
                        product_meta_title={item.product_meta_title}
                        product_meta_description={item.product_meta_description}
                        get_data={getData1}
                        get_data_cat_list={data}
                      />
                      <ProductDeleteModal
                        product_id={item.product_id}
                        get_data={getData1}
                      />
                      <ProductPopularModal
                        product_id={item.product_id}
                        get_data={getData1}
                      />
                      <ProductFeaturedModal
                        product_id={item.product_id}
                        get_data={getData1}
                      />
                      <ProductImageEditModal
                        product_id={item.product_id}
                        product_image={item.product_image}
                        get_data={getData1}
                      />
                      <ProductImage1EditModal
                        product_id={item.product_id}
                        product_image={item.product_image}
                        product_image1={item.product_image1}
                        get_data={getData1}
                      />
                      <ProductImage2EditModal
                        product_id={item.product_id}
                        product_image={item.product_image}
                        product_image2={item.product_image2}
                        get_data={getData1}
                      />
                      <ProductImage3EditModal
                        product_id={item.product_id}
                        product_image={item.product_image}
                        product_image3={item.product_image3}
                        get_data={getData1}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
