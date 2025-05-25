import React, { useCallback, useEffect, useState } from "react";
import fetchData from "../../libs/api";
import Slab from "./Slab";

const SlabList = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);
  const [totalCampaign, setTotalCampaign] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalDeliveredOrder, setTotalDeliveredOrder] = useState(0);
  const [totalPendingOrder, setTotalPendingOrder] = useState(0);
  const [totalCanceledOrder, setTotalCanceledOrder] = useState(0);
  const [totalInProgressOrder, setTotalInProgressOrder] = useState(0);

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  const getTotalSlabData = useCallback(() => {
    setLoader(true);

    //total revenue
    fetchData(`/api/v1/dashboard/user/total-revenue`, "GET")
      .then((result) => {
        if (result.success) {
          setTotalRevenue(result.data);
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        console.debug(error);
      })
      .finally(() => {
        setLoader(false);
      });

    //total category
    fetchData(`/api/v1/dashboard/user/total-category`, "GET")
      .then((result) => {
        if (result.success) {
          setTotalCategory(result.data);
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        console.debug(error);
      })
      .finally(() => {
        setLoader(false);
      });

    //total campaign
    fetchData(`/api/v1/dashboard/user/total-campaign`, "GET")
      .then((result) => {
        if (result.success) {
          setTotalCampaign(result.data);
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        console.debug(error);
      })
      .finally(() => {
        setLoader(false);
      });

    //total product
    fetchData(`/api/v1/dashboard/user/total-product`, "GET")
      .then((result) => {
        if (result.success) {
          setTotalProduct(result.data);
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        console.debug(error);
      })
      .finally(() => {
        setLoader(false);
      });

    //total order
    fetchData(`/api/v1/dashboard/user/total-order`, "GET")
      .then((result) => {
        if (result.success) {
          setTotalOrder(result.data);
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        console.debug(error);
      })
      .finally(() => {
        setLoader(false);
      });

    //total delivered order
    fetchData(`/api/v1/dashboard/user/total-delivered-order`, "GET")
      .then((result) => {
        if (result.success) {
          setTotalDeliveredOrder(result.data);
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        console.debug(error);
      })
      .finally(() => {
        setLoader(false);
      });

    //total canceled Order
    fetchData(`/api/v1/dashboard/user/total-canceled-order`, "GET")
      .then((result) => {
        if (result.success) {
          setTotalCanceledOrder(result.data);
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        console.debug(error);
      })
      .finally(() => {
        setLoader(false);
      });

    //total pending order
    fetchData(`/api/v1/dashboard/user/total-pending-order`, "GET")
      .then((result) => {
        if (result.success) {
          setTotalPendingOrder(result.data);
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        console.debug(error);
      })
      .finally(() => {
        setLoader(false);
      });

    //total in progrress order
    fetchData(`/api/v1/dashboard/user/total-in-progress-order`, "GET")
      .then((result) => {
        if (result.success) {
          setTotalInProgressOrder(result.data);
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        console.debug(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    getTotalSlabData();
  }, []);

  return (
    <>
      <Slab title={"Total Revenue"} amount={totalRevenue} />
      <Slab title={"Total Category"} amount={totalCategory} />
      {/* <Slab title={"Total Campaign"} amount={totalCampaign} /> */}
      <Slab title={"Total Product"} amount={totalProduct} />
      <Slab title={"Total Order"} amount={totalOrder} />
      <Slab title={"Total Delivered Order"} amount={totalDeliveredOrder} />
      <Slab title={"Total Pending Order"} amount={totalPendingOrder} />
      <Slab title={"Total Canceled Order"} amount={totalCanceledOrder} />
      <Slab title={"Total Shipped Order"} amount={totalInProgressOrder} />
    </>
  );
};

export default SlabList;
