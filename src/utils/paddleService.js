import fetchData from "../libs/api";
/**
 * Create Paddle Product (if not exists) and always create a Price
 *
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.description
 * @param {number} params.amount
 * @param {string} params.currency
 * @param {string|null} params.existingProductId
 *
 * @returns {Promise<{ productId: string, priceId: string }>}
 */
export const createPaddleProductAndPrice = async ({
  name,
  description,
  currency = "USD",
  existingProductId = null,
  attributes = null, 
  type = "product", 
  price = 0.00
}) => {
  let paddleProductId = existingProductId;

  try {
    if (paddleProductId) {
      // Check if the product is active in Paddle
      try {
        const productData = await fetchData(
          `/api/v1/paddle/products/${paddleProductId}`,
          "GET"
        );

        if (!productData.success || productData.product.status !== "active") {
          paddleProductId = null; // Product is not active, so create a new one
        }
      } catch (error) {
        paddleProductId = null; // Product not found, so create a new one
      }
    }

    

    if (!paddleProductId) {

      const productData = await fetchData(
        "/api/v1/paddle/products",
        "POST",
        { name, description }
      );

      if (!productData.success) throw new Error(productData.message);

      paddleProductId = productData.productId;
    }

    const priceData = await fetchData("/api/v1/paddle/prices", "POST", {
      productId: paddleProductId,
      description: `Price for ${name}`,
      attributes,
      currency,
      type, 
      price
    });

    if (!priceData.success) throw new Error(priceData.message);


    return {
      productId: paddleProductId,
      attributes: priceData?.attributes ?? priceData?.paddlePriceId ?? null
    };
  } catch (error) {
    console.error("Paddle Service Error:", error);
    throw error;
  }
};




