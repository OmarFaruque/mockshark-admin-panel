import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const editAttribute = async (
  size,
  costPrice,
  retailPrice,
  discountPercent,
  stockAmount,
  item,
  setLoader,
  getProducts,
  attributeId,
  modalCloseButton
) => {
  setLoader(true);

  const jsonData = await fetchData(
    `/api/v1/products-attributes/${item.id}`,
    "PUT",
    {
      size,
      costPrice,
      retailPrice,
      discountPercent,
      stockAmount,
    }
  );

  //   console.log({ isTrending });
  //   console.log({ isActive });
  //   console.log({ isFeatured });

  const message = jsonData.message;
  const success = jsonData.success;

  if (!success) {
    setLoader(false);
    showErrorToast(message);
    // eslint-disable-next-line no-throw-literal
    throw {
      message,
    };
  }

  setLoader(false);
  showSuccessToast(message);

  //fetch data
  getProducts();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const EditAttribute = ({
  item,
  getProducts,
  attributeId,
  //   categories,
  //   suppliers,
  //   brands,
}) => {
  const [loader, setLoader] = useState(false);
  const [size, setSize] = useState(item.size);
  const [costPrice, setCostPrice] = useState(item.costPrice);
  const [retailPrice, setRetailPrice] = useState(item.retailPrice);
  const [discountPercent, setDiscountPercent] = useState(item.discountPercent);
  const [stockAmount, setStockAmount] = useState(item.stockAmount);

  const modalCloseButton = useRef();

  return (
    <>
      <Modal
        modalId={"editAttribute" + item.id}
        modalHeader={"Edit Attribute"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Variant</label>
          <input
            type="text"
            className="form-control"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />

          <label className="text-black font-w500">Cost Price</label>
          <input
            type="number"
            className="form-control"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />

          <label className="text-black font-w500">Retail Price</label>
          <input
            type="number"
            className="form-control"
            value={retailPrice}
            onChange={(e) => setRetailPrice(e.target.value)}
          />

          <label className="text-black font-w500">Discount Percent</label>
          <input
            type="number"
            className="form-control"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
          />

          <label className="text-black font-w500">Stock Amount</label>
          <input
            type="number"
            className="form-control"
            value={stockAmount}
            onChange={(e) => setStockAmount(e.target.value)}
          />

          {/* <div className="form-group">
            <label className="text-black font-w500">Brand</label>
            <select
              name="brand"
              id="brand"
              className="form-control"
              onChange={(e) => {
                setBrandId(e.target.value);
                // getSubcategoriesByCategory(e.target.value);
              }}
            >
              <option value="">Select a brand</option>

              {brands &&
                brands.map((brand, index) => (
                  <>
                    <option
                      value={brand?.id}
                      key={brand?.id + index}
                      selected={brandId === brand?.id}
                    >
                      {brand?.name}
                    </option>
                  </>
                ))}
            </select>
          </div> */}

          {/* <div className="form-group">
            <label className="text-black font-w500">Category</label>
            <select
              name="category"
              id="category"
              className="form-control"
              onChange={(e) => {
                setCategoryId(e.target.value);
                getSubcategoriesByCategory(e.target.value);
              }}
            >
              <option value="">Select a category</option>

              {categories &&
                categories.map((category, index) => (
                  <>
                    <option
                      value={category?.id}
                      key={category?.id + index}
                      selected={categoryId === category?.id}
                    >
                      {category?.name}
                    </option>
                  </>
                ))}
            </select>
          </div> */}

          {/* <div className="form-group">
            <label className="text-black font-w500">Subcategory</label>
            <select
              name="subcategory"
              id="subcategory"
              className="form-control"
              onChange={(e) => {
                setSubcategoryId(e.target.value);
                getSubsubcategoriesBySubcategory(e.target.value);
              }}
            >
              <option value="">Select a subcategory</option>

              {subcategories &&
                subcategories.map((subcategory, index) => (
                  <>
                    <option
                      value={subcategory?.id}
                      key={subcategory?.id + index}
                      selected={subcategoryId === subcategory?.id}
                    >
                      {subcategory?.name}
                    </option>
                  </>
                ))}
            </select>
          </div> */}

          {/* <div className="form-group">
            <label className="text-black font-w500">Sub-Subcategory</label>
            <select
              name="subsubcategory"
              id="subsubcategory"
              className="form-control"
              onChange={(e) => setSubsubcategoryId(e.target.value)}
            >
              <option value="">Select a Sub-subcategory</option>

              {subsubcategories &&
                subsubcategories.map((subsubcategory, index) => (
                  <>
                    <option
                      value={subsubcategory?.id}
                      key={subsubcategory?.id + index}
                      selected={subsubcategoryId === subsubcategory?.id}
                    >
                      {subsubcategory?.name}
                    </option>
                  </>
                ))}
            </select>
          </div> */}
        </div>

        {loader === true ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className="form-group">
              <Button
                buttonOnClick={() =>
                  editAttribute(
                    size,
                    costPrice,
                    retailPrice,
                    discountPercent,
                    stockAmount,
                    item,
                    setLoader,
                    getProducts,
                    attributeId,
                    modalCloseButton
                  )
                }
                buttonText={"Update"}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default EditAttribute;
