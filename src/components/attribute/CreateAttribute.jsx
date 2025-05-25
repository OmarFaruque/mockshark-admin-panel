import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import "../css/product.css";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const createAttribute = async (
  size,
  costPrice,
  retailPrice,
  discountPercent,
  stockAmount,
  setLoader,
  modalCloseButton,
  getAttributes,
  productId
) => {
  setLoader(true);

  if (!size || !costPrice || !retailPrice || !discountPercent || !stockAmount) {
    showErrorToast("Please fill up all the fields");
    setLoader(false);
    return;
  }

  const payload = {
    productId,
    size,
    costPrice,
    retailPrice,
    discountPercent,
    stockAmount,
  };

  //   {
  //   name,
  //   categoryId,
  //   subcategoryId: subcategoryId ? subcategoryId : null,
  //   subsubcategoryId: subsubcategoryId ? subsubcategoryId : null,
  //   // campaignId,
  //   supplierId: supplierId ? supplierId : null,
  //   productCode,
  //   barcode,
  //   shortDescription,
  //   longDescription,
  //   productAttributes,
  //   images: totalImages,
  //   sku,
  //   isFeatured,
  //   isTrending,
  //   isActive,
  // }

  const jsonData = await fetchData(
    "/api/v1/products-attributes",
    "POST",
    payload
  );

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
  getAttributes();

  //close modal
  modalCloseButton.current.click();
  // setName("");

  // setCategoryId("");

  // setCampaignId("");

  // setSupplierId("");

  // setProductCode("");

  // setBarcode("");

  // setDescription("");

  // setAttributeRowsCount(0);

  // sizes = [];
  // costPrices = [];
  // retailPrices = [];
  // discounts = [];
  // stocks = [];
  // images = [];
  // productAttributes = [];

  return { success, message };
};

let sizes = [];
let costPrices = [];
let retailPrices = [];
let discounts = [];
let stocks = [];
let images = [];
let productAttributes = [];

const CreateAttribute = ({ getAttributes, productId }) => {
  const [loader, setLoader] = useState(false);
  const [size, setSize] = useState("");
  const [costPrice, setCostPrice] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [stockAmount, setStockAmount] = useState(0);
  //   const [longDescription, setLongDescription] = useState("");
  //   const [categoryId, setCategoryId] = useState("");
  //   const [brandId, setBrandId] = useState("");
  //   const [subcategoryId, setSubcategoryId] = useState("");
  //   const [subsubcategoryId, setSubsubcategoryId] = useState("");
  //   const [campaignId, setCampaignId] = useState("");
  //   const [supplierId, setSupplierId] = useState("");
  //   const [sku, setSku] = useState("");
  //   const [isActive, setIsActive] = useState("true");
  //   const [isFeatured, setIsFeatured] = useState("false");
  //   const [isTrending, setIsTrending] = useState("false");
  //   const [subcategories, setSubcategories] = useState("");
  //   const [subsubcategories, setSubsubcategories] = useState("");

  // const [sizes, setSizes] = useState([]);
  // const [costPrices, setCostPrices] = useState([]);
  // const [retailPrices, setRetailPrices] = useState([]);
  // const [discounts, setDiscounts] = useState([]);
  // const [stocks, setStocks] = useState([]);

  // const [productAttributes, setProductAttributes] = useState([]);

  const [attributeRowsCount, setAttributeRowsCount] = useState(1);

  const [tempImages, setTempImages] = useState([]);

  const modalCloseButton = useRef();

  // useEffect(() => {
  //   if (categoryId) {
  //     getSubcategoriesByCategory();
  //   }

  //   return () => setSubcategories([]);
  // }, [categoryId]);

  // useEffect(() => {
  //   if (subcategoryId) {
  //     getSubsubcategoriesBySubcategory();
  //   }

  //   return () => setSubsubcategories([]);
  // }, [subcategoryId]);

  return (
    <>
      <Modal
        modalId={"createAttribute"}
        modalHeader={"Create Attribute"}
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
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Cost Price</label>
          <input
            type="number"
            className="form-control"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Retail Price</label>
          <input
            type="number"
            className="form-control"
            value={retailPrice}
            onChange={(e) => setRetailPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Discount Percent</label>
          <input
            type="number"
            className="form-control"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Stock Amount</label>
          <input
            type="number"
            className="form-control"
            value={stockAmount}
            onChange={(e) => setStockAmount(e.target.value)}
          />
        </div>

        {/* <div className="form-group">
          <label className="text-black font-w500">Campaign</label>
          <select
            name="campaign"
            id="campaign"
            className="form-control"
            onChange={(e) => setCampaignId(e.target.value)}
          >
            <option value="">Select a campaign</option>

            {campaigns &&
              campaigns.map((campaign, index) => (
                <>
                  <option value={campaign?.id} key={campaign?.id + index}>
                    {campaign?.name}
                  </option>
                </>
              ))}
          </select>
        </div> */}

        {/* <div className="form-group">
          <label className="text-black font-w500">Supplier</label>
          <select
            name="supplier"
            id="supplier"
            className="form-control"
            onChange={(e) => setSupplierId(e.target.value)}
          >
            <option value="">Select a supplier</option>

            {suppliers &&
              suppliers.map((supplier, index) => (
                <>
                  <option value={supplier?.id} key={supplier?.id + index}>
                    {supplier?.name}
                  </option>
                </>
              ))}
          </select>
        </div> */}

        {/* <div className="form-group">
          <label className="text-black font-w500">Short Description</label>
          <textarea
            rows={3}
            className="form-control"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div> */}

        {/* <div className="form-group">
          <label className="text-black font-w500">Long Description</label>
          <textarea
            rows={6}
            className="form-control"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
          />
        </div> */}

        {/* <div className="form-group">
          <label className="text-black font-w500">Featured?</label>
          <select
            name="isFeatured"
            id="isFeatured"
            className="form-control"
            onChange={(e) => setIsFeatured(e.target.value)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div> */}

        {/* <div className="form-group">
          <label className="text-black font-w500">Trending?</label>
          <select
            name="isTrending"
            id="isTrending"
            className="form-control"
            onChange={(e) => setIsTrending(e.target.value)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div> */}

        {loader === true ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className="form-group" style={{ marginTop: "30px" }}>
              <Button
                buttonOnClick={() =>
                  createAttribute(
                    size,
                    costPrice,
                    retailPrice,
                    discountPercent,
                    stockAmount,
                    setLoader,
                    modalCloseButton,
                    getAttributes,
                    productId
                  )
                }
                buttonText={"Submit"}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default CreateAttribute;
