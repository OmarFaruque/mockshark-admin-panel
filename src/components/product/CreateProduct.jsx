import React, { useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import "../css/product.css";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const createProduct = async (
  name,
  setName,
  brandId,
  categoryId,
  subcategoryId,
  subsubcategoryId,
  setCategoryId,
  // campaignId,
  // setCampaignId,
  supplierId,
  setSupplierId,
  productCode,
  setProductCode,
  barcode,
  setBarcode,
  shortDescription,
  setShortDescription,
  longDescription,
  setLongDescription,
  sizes,
  costPrices,
  retailPrices,
  discounts,
  stocks,
  productAttributes,
  images,
  getProducts,
  setLoader,
  modalCloseButton,
  setAttributeRowsCount,
  sku,
  isActive,
  isTrending,
  isFeatured,
  fileSize,
  resolution,
  downloadUrl
) => {
  setLoader(true);

  if (sizes.length < 1 || costPrices.length < 1 || retailPrices.length < 1) {
    showErrorToast("Please enter atleast one size and price");

    setLoader(false);
    return false;
  }



let productAttributeLength = sizes.length;

for (let i = 0; i < productAttributeLength; i++) {
  productAttributes.push({
    size: sizes[i],
    costPrice: parseFloat(costPrices[i]),
    retailPrice: parseFloat(retailPrices[i]),
    discountPercent: parseFloat(discounts[i]),
    stockAmount: parseFloat(stocks[i]),
  });
}


  //for getting unique set
  productAttributes = [
    ...new Map(productAttributes.map((item) => [item["size"], item])).values(),
  ];

  let totalImages = [];
  let imagesLen = images.length;

  for (let j = 0; j < imagesLen; j++) {
    totalImages.push({ image: images[j].name.split(".")[0] });
  }

  if (productCode.trim() !== "") {
    productCode = productCode;
  } else {
    productCode = undefined;
  }

  if (barcode.trim() !== "") {
    barcode = barcode;
  } else {
    barcode = undefined;
  }

  console.log({ totalImages });

  const formData = new FormData();

  console.log({ productAttributes });
  formData.append("downloadUrl", downloadUrl);
  formData.append("name", name);
  formData.append("categoryId", categoryId);
  formData.append("fileSize", fileSize);
  formData.append("resolution", resolution);
  if (brandId) {
    formData.append("brandId", brandId);
  }
  if (subcategoryId) {
    formData.append("subcategoryId", subcategoryId ? subcategoryId : null);
  }
  if (subsubcategoryId) {
    formData.append(
      "subsubcategoryId",
      subsubcategoryId ? subsubcategoryId : null
    );
  }
  if (supplierId) {
    formData.append("supplierId", supplierId ? supplierId : null);
  }
  if (productCode) {
    formData.append("productCode", productCode);
  }

  if (barcode) {
    formData.append("barcode", barcode);
  }
  if (shortDescription) {
    formData.append("shortDescription", shortDescription);
  }
  if (longDescription) {
    formData.append("longDescription", longDescription);
  }
  productAttributes?.forEach((attr, index) => {
    formData.append(
      `productAttributes[${index}][costPrice]`,
      Number(attr.costPrice)
    );
    formData.append(
      `productAttributes[${index}][discountPercent]`,
      Number(attr.discountPercent)
    );
    formData.append(
      `productAttributes[${index}][retailPrice]`,
      Number(attr.retailPrice)
    );
    formData.append(`productAttributes[${index}][size]`, attr.size);
    formData.append(
      `productAttributes[${index}][stockAmount]`,
      Number(attr.stockAmount)
    );
  });
  if (images && images?.length > 0) {
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
  }
  formData.append("sku", sku);
  formData.append("isFeatured", isFeatured);
  formData.append("isTrending", isTrending);
  formData.append("isActive", isActive);

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

  const jsonData = await fetchData("/api/v1/products", "POST", formData, true);

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

const CreateProduct = ({
  getProducts,
  categories,
  campaigns,
  suppliers,
  brands,
}) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [barcode, setBarcode] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [subsubcategoryId, setSubsubcategoryId] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [sku, setSku] = useState("");
  const [isActive, setIsActive] = useState("true");
  const [isFeatured, setIsFeatured] = useState("false");
  const [isTrending, setIsTrending] = useState("false");
  const [subcategories, setSubcategories] = useState("");
  const [subsubcategories, setSubsubcategories] = useState("");
  const [fileSize, setFileSize] = useState("");
const [resolution, setResolution] = useState("");
 const [downloadUrl, setDownloadUrl] = useState("");


  // const [sizes, setSizes] = useState([]);
  // const [costPrices, setCostPrices] = useState([]);
  // const [retailPrices, setRetailPrices] = useState([]);
  // const [discounts, setDiscounts] = useState([]);
  // const [stocks, setStocks] = useState([]);

  // const [productAttributes, setProductAttributes] = useState([]);

  const [attributeRowsCount, setAttributeRowsCount] = useState(1);

  const [tempImages, setTempImages] = useState([]);

  const modalCloseButton = useRef();

  const addMoreAttributes = () => {
    setAttributeRowsCount(attributeRowsCount + 1);
  };

  const handleImages = (e) => {
    const lenghtOfFiles = e.target.files.length;

    if (lenghtOfFiles > 3) {
      showErrorToast("You cannot upload more than 3 images");

      return false;
    }

    let temporaryImages = [];

    for (let i = 0; i < lenghtOfFiles; i++) {
      setTempImages([...tempImages, URL.createObjectURL(e.target.files[i])]);
      temporaryImages.push(URL.createObjectURL(e.target.files[i]));

      images.push(e.target.files[i]);
    }

    setTempImages([...temporaryImages, ...tempImages]);
  };

  const removeImage = (image, ind) => {
    tempImages.splice(ind, 1);

    images.splice(ind, 1);

    setTempImages([...tempImages]);
  };

  const getSubcategoriesByCategory = (catId) => {
    setLoader(true);

    fetchData(`/api/v1/subcategoriesByCategory/${catId}`, "GET")
      .then((result) => {
        if (result.success) {
          setSubcategories(result.data);
          console.log(result?.data);
        } else {
          showErrorToast(result.message);
        }
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  // useEffect(() => {
  //   if (categoryId) {
  //     getSubcategoriesByCategory();
  //   }

  //   return () => setSubcategories([]);
  // }, [categoryId]);

  const getSubsubcategoriesBySubcategory = (subcatId) => {
    setLoader(true);

    fetchData(`/api/v1/subsubcategoriesBySubcategory/${subcatId}`, "GET")
      .then((result) => {
        if (result.success) {
          setSubsubcategories(result.data);
          console.log(result?.data);
        } else {
          showErrorToast(result.message);
        }
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  // useEffect(() => {
  //   if (subcategoryId) {
  //     getSubsubcategoriesBySubcategory();
  //   }

  //   return () => setSubsubcategories([]);
  // }, [subcategoryId]);

  return (
    <>
      <Modal
        modalId={"createProduct"}
        modalHeader={"Create Product"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* <div className="form-group">
          <label className="text-black font-w500">Product Code</label>
          <input
            type="text"
            className="form-control"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div> */}

        {/* <div className="form-group">
          <label className="text-black font-w500">SKU</label>
          <input
            type="text"
            className="form-control"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div> */}

        {/* <div className="form-group">
          <label className="text-black font-w500">Barcode</label>
          <input
            type="text"
            className="form-control"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div> */}

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
                  <option value={brand?.id} key={brand?.id + index}>
                    {brand?.name}
                  </option>
                </>
              ))}
          </select>
        </div> */}

        <div className="form-group">
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
                  <option value={category?.id} key={category?.id + index}>
                    {category?.name}
                  </option>
                </>
              ))}
          </select>
        </div>

        <div className="form-group">
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
                  <option value={subcategory?.id} key={subcategory?.id + index}>
                    {subcategory?.name}
                  </option>
                </>
              ))}
          </select>
        </div>

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
                  >
                    {subsubcategory?.name}
                  </option>
                </>
              ))}
          </select>
        </div> */}

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

        <div className="form-group">
          <label className="text-black font-w500">Short Description</label>
          <textarea
            rows={3}
            className="form-control"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>

     <div className="form-group">
      <label className="text-black font-w500 mb-2 block">Long Description</label>
      <ReactQuill
        theme="snow"
        value={longDescription}
        onChange={setLongDescription}
        className="bg-white"
        style={{ height: '200px', marginBottom: '40px' }}
      />
    </div>

<div className="form-group">
  <label className="text-black font-w500">File Size </label>
  <input
    type="text"
    className="form-control"
    value={fileSize}
    onChange={(e) => setFileSize(e.target.value)}
  />
</div>

<div className="form-group">
  <label className="text-black font-w500">Resolution</label>
  <input
    type="text"
    className="form-control"
    value={resolution}
    onChange={(e) => setResolution(e.target.value)}
  />
</div>
<div className="form-group">
  <label className="text-black font-w500">DownloadUrl</label>
  <input
    type="text"
    className="form-control"
    value={downloadUrl}
    onChange={(e) => setDownloadUrl(e.target.value)}
  />
</div>


        <div className="form-group">
          <label className="text-black font-w500">Active?</label>
          <select
            name="isActive"
            id="isActive"
            className="form-control"
            onChange={(e) => setIsActive(e.target.value)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>

            {/* {categories &&
              categories.map((category, index) => (
                <>
                  <option value={category?.id} key={category?.id + index}>
                    {category?.name}
                  </option>
                </>
              ))} */}
          </select>
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Recommended?</label>
          <select
            name="isFeatured"
            id="isFeatured"
            className="form-control"
            onChange={(e) => setIsFeatured(e.target.value)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>

            {/* {categories &&
              categories.map((category, index) => (
                <>
                  <option value={category?.id} key={category?.id + index}>
                    {category?.name}
                  </option>
                </>
              ))} */}
          </select>
        </div>

        {/* <div className="form-group">
          <label className="text-black font-w500">Trending?</label> */}
          {/* <select
            name="isTrending"
            id="isTrending"
            className="form-control"
            onChange={(e) => setIsTrending(e.target.value)}
          > */}
            {/* <option value="false">No</option>
            <option value="true">Yes</option> */}

            {/* {categories &&
              categories.map((category, index) => (
                <>
                  <option value={category?.id} key={category?.id + index}>
                    {category?.name}
                  </option>
                </>
              ))} */}
          {/* </select> */}
        {/* </div> */}

        <hr />
        {[...Array(attributeRowsCount)].map((arraynum, ind) => (
          <>
            <div
              className="form-group-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: "10px",
              }}
              key={arraynum + ind}
            >
              <div
                className="form-group"
                style={{ width: "15%", textAlign: "center" }}
              >
                <label
                  className="text-black font-w500"
                  style={{ fontSize: "14px" }}
                >
                  Variant
                </label>
                <input
                  type="text"
                  className="form-control"
                  // value={barcode}
                  onChange={(e) => {
                    if (e.target.value.trim() !== "") {
                      sizes[ind] = e.target.value;
                    } else {
                      sizes.splice(ind, 1);
                    }
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{ width: "20%", textAlign: "center" }}
              >
                <label
                  className="text-black font-w500"
                  style={{ fontSize: "12px" }}
                >
                  Current Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  // value={barcode}
                  onChange={(e) => {
                    if (e.target.value.trim() !== "") {
                      costPrices[ind] = e.target.value;
                    } else {
                      costPrices.splice(ind, 1);
                    }
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{ width: "20%", textAlign: "center" }}
              >
                <label
                  className="text-black font-w500"
                  style={{ fontSize: "12px" }}
                >
                  Regular Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  // value={barcode}
                  onChange={(e) => {
                    if (e.target.value.trim() !== "") {
                      retailPrices[ind] = e.target.value;
                    } else {
                      retailPrices.splice(ind, 1);
                    }
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{ width: "15%", textAlign: "center" }}
              >
                <label
                  className="text-black font-w500"
                  style={{ fontSize: "14px" }}
                >
                  Discount%
                </label>
                <input
                  type="text"
                  className="form-control"
                  // value={barcode}
                  onChange={(e) => {
                    if (e.target.value.trim() !== "") {
                      discounts[ind] = e.target.value;
                    } else {
                      discounts.splice(ind, 1);
                    }
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{ width: "15%", textAlign: "center" }}
              >
                <label
                  className="text-black font-w500"
                  style={{ fontSize: "14px" }}
                >
                  Stock
                </label>
                <input
                  type="text"
                  className="form-control"
                  // value={barcode}
                  onChange={(e) => {
                    if (e.target.value.trim() !== "") {
                      stocks[ind] = e.target.value;
                    } else {
                      stocks.splice(ind, 1);
                    }
                  }}
                />
              </div>
            </div>
          </>
        ))}

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            className={`btn btn-sm btn-secondary btn-rounded`}
            onClick={() => addMoreAttributes()}
          >
            Add more size
          </button>
        </div>

        <div className="form-group">
          <div
            className="product-file-input-div"
            style={{
              position: "relative",
              width: "40%",
              background: "lightblue",
              borderRadius: "30px",
              textAlign: "center",
              padding: "8px 10px",
              marginTop: "30px",
            }}
          >
            <label
              className="text-black font-w500"
              style={{ margin: 0, cursor: "pointer", fontSize: "14px" }}
            >
              + Add Images
            </label>
            <input
              type="file"
              multiple
              className="form-control"
              // value={barcode}
              onChange={(e) => handleImages(e)}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: 2,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </div>

          <div
            className="product-images-div"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
              gap: "10px",
              marginTop: "25px",
            }}
          >
            {tempImages.map((image, ind) => (
              <>
                <div className="product-images">
                  <img
                    src={image}
                    key={ind}
                    alt={"image"}
                    style={{
                      width: "130px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />

                  <button
                    type="button"
                    className={`btn btn-sm btn-secondary btn-rounded`}
                    onClick={() => removeImage(image, ind)}
                  >
                    x
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>

        {loader === true ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className="form-group" style={{ marginTop: "30px" }}>
              <Button
                buttonOnClick={() =>
                  createProduct(
                    name,
                    setName,
                    brandId,
                    categoryId,
                    subcategoryId,
                    subsubcategoryId,
                    setCategoryId,
                    // campaignId,
                    // setCampaignId,
                    supplierId,
                    setSupplierId,
                    productCode,
                    setProductCode,
                    barcode,
                    setBarcode,
                    shortDescription,
                    setShortDescription,
                    longDescription,
                    setLongDescription,
                    sizes,
                    costPrices,
                    retailPrices,
                    discounts,
                    stocks,
                    productAttributes,
                    images,
                    getProducts,
                    setLoader,
                    modalCloseButton,
                    setAttributeRowsCount,
                    sku,
                    isActive,
                    isTrending,
                    isFeatured,
                    fileSize,
                   
                    resolution,
                    downloadUrl
                    
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

export default CreateProduct;
 