import React, { useEffect, useState } from "react";
//import AddOrderSidebar from "./AddOrderSidebar";
import axios from "axios";
import AppUrl from "./classes/AppUrl";
import "./css/dashboard.css";

const ContentBody = () => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderWeekly, setOrderWeekly] = useState([]);

  useEffect(() => {
    getData();
    getData1();
    getData2();
    monthlyPercent();
    weeklyPercent();
    dailyPercent();
  }, []);

  // window.onload = function percent() {
  //   var percent_monthly = (document.querySelector("#SvgjsText1026").innerHTML =
  //     "77%");
  //   var percent_weekly = (document.querySelector("#SvgjsText1094").innerHTML =
  //     "78%");
  //   var percent_daily = (document.querySelector("#SvgjsText1154").innerHTML =
  //     "87%");
  // };

  var sub_total = 0;
  var sub_total_daily = 0;
  var sub_total_yesterday = 0;
  var sub_total_monthly = 0;
  var sub_total_weekly = 0;

  var daily_pending = 0;
  var daily_delivered = 0;
  var daily_canceled = 0;
  var monthly_pending = 0;
  var monthly_delivered = 0;
  var monthly_canceled = 0;
  var weekly_pending = 0;
  var weekly_delivered = 0;
  var weekly_canceled = 0;

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  var current_month = today.getFullYear() + "-" + (today.getMonth() + 1);

  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  var dd = yesterday.getDate();
  var mm = yesterday.getMonth() + 1; //January is 0!

  var yyyy = yesterday.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  yesterday = yyyy + "-" + mm + "-" + dd;

  order.map((item) =>
    item.order_status.toString() === "1"
      ? (sub_total = sub_total + parseInt(item.order_subtotal))
      : "N/A"
  );

  order.map((item) =>
    item.order_date === date
      ? item.order_status.toString() === "1"
        ? (sub_total_daily = sub_total_daily + parseInt(item.order_subtotal))
        : "N/A"
      : "N/A"
  );

  order.map((item) =>
    item.order_date === yesterday
      ? item.order_status.toString() === "1"
        ? (sub_total_yesterday =
            sub_total_yesterday + parseInt(item.order_subtotal))
        : "N/A"
      : "N/A"
  );

  order.map((item) =>
    item.order_date.substr(0, 7) === current_month
      ? item.order_status.toString() === "1"
        ? (sub_total_monthly =
            sub_total_monthly + parseInt(item.order_subtotal))
        : "N/A"
      : "N/A"
  );

  orderWeekly.map((item) =>
    item.order_status.toString() === "1"
      ? (sub_total_weekly = sub_total_weekly + parseInt(item.order_subtotal))
      : "N/A"
  );

  order.map((item) =>
    item.order_date === date
      ? item.order_status.toString() === "0"
        ? (daily_pending = daily_pending + 1)
        : item.order_status.toString() === "1"
        ? (daily_delivered = daily_delivered + 1)
        : (daily_canceled = daily_canceled + 1)
      : "N/A"
  );

  order.map((item) =>
    item.order_date.substr(0, 7) === current_month
      ? item.order_status.toString() === "0"
        ? (monthly_pending = monthly_pending + 1)
        : item.order_status.toString() === "1"
        ? (monthly_delivered = monthly_delivered + 1)
        : (monthly_canceled = monthly_canceled + 1)
      : "N/A"
  );

  orderWeekly.map((item) =>
    item.order_status.toString() === "0"
      ? (weekly_pending = weekly_pending + 1)
      : item.order_status.toString() === "1"
      ? (weekly_delivered = weekly_delivered + 1)
      : (weekly_canceled = weekly_canceled + 1)
  );

  //  function getData() {
  //    axios
  //      .get(AppUrl.base_url + "categoryGet")
  //      .then(function (response) {
  //        if (response) {
  //          setData(response.data);

  //          //console.log(response.data);
  //        }
  //      })
  //      .catch(function (error) {
  //        console.log(error);
  //      });
  //  }

  function getData() {
    axios
      .get(AppUrl.base_url + "productGet")
      .then(function (response) {
        if (response) {
          setMenu(response.data);
          //setLoader(false);
          //console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getData1() {
    axios
      .get(AppUrl.base_url + "orderGet")
      .then(function (response) {
        if (response) {
          setOrder(response.data);
          //setLoader(false);
          //console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getData2() {
    axios
      .get(AppUrl.base_url + "orderGetWeekly")
      .then(function (response) {
        if (response) {
          setOrderWeekly(response.data);
          //setLoader(false);
          //console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //percentage

  const monthlyPercent = () => {
    let monthly_percent = Math.floor(
      (parseInt(monthly_delivered) * 100) /
        (monthly_delivered + monthly_pending + monthly_canceled)
    );
    let number = document.getElementById("number");
    let circle = document.getElementById("circle");
    let counter = 0;
    setInterval(() => {
      if (counter === monthly_percent) {
        clearInterval();
      } else {
        if (monthly_percent <= 100) {
          counter = counter + 1;
          number.innerHTML = counter + "%";
          circle.style.strokeDashoffset = 472 - 472 * (counter / 100);
        }
      }
    }, 30);
    // var percent_monthly = (document.querySelector("#SvgjsText1026").innerHTML =
    //   "77%");
  };

  const weeklyPercent = () => {
    let weekly_percent = Math.floor(
      (parseInt(weekly_delivered) * 100) /
        (weekly_delivered + weekly_pending + weekly_canceled)
    );
    let number = document.getElementById("number2");
    let circle2 = document.getElementById("circle2");
    let counter = 0;
    setInterval(() => {
      if (counter === weekly_percent) {
        clearInterval();
      } else {
        if (weekly_percent <= 100) {
          counter = counter + 1;
          number.innerHTML = counter + "%";
          circle2.style.strokeDashoffset = 472 - 472 * (counter / 100);
        }
      }
    }, 30);
    // var percent_weekly = (document.querySelector("#SvgjsText1094").innerHTML =
    //   "78%");
  };

  const dailyPercent = () => {
    let daily_percent = Math.floor(
      (parseInt(daily_delivered) * 100) /
        (daily_delivered + daily_pending + daily_canceled)
    );
    let number = document.getElementById("number3");
    let circle3 = document.getElementById("circle3");
    let counter = 0;
    setInterval(() => {
      if (counter === daily_percent) {
        clearInterval();
      } else {
        if (daily_percent <= 100) {
          counter = counter + 1;
          number.innerHTML = counter + "%";
          circle3.style.strokeDashoffset = 472 - 472 * (counter / 100);
        }
      }
    }, 30);
    // var percent_daily = (document.querySelector("#SvgjsText1154").innerHTML =
    //   "87%");
  };

  return (
    <>
      <div className="content-body">
        {/* <!-- row --> */}
        <div className="container-fluid">
          {/* <!-- Add Order --> */}

          <div className="row">
            <div className="col-xl-3 col-xxl-4 col-sm-4">
              <div className="card grd-card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="media-body mr-2">
                      <h2 className="text-black font-w600">{menu.length}</h2>
                      <span className="text-gray">Total Menus</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-sm-4">
              <div className="card grd-card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="media-body mr-2">
                      <h2 className="text-black font-w600">{sub_total}</h2>
                      <span className="text-gray">Total Revenue (TK)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-sm-4">
              <div className="card grd-card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="media-body mr-2">
                      <h2 className="text-black font-w600">{order.length}</h2>
                      <span className="text-gray">Total Oders</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-sm-4">
              <div className="card grd-card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="media-body mr-2">
                      <h2 className="text-black font-w600">{order.length}</h2>
                      <span className="text-gray">Total Customers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-sm-4">
              <div className="card grd-card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="media-body mr-2">
                      <h2 className="text-black font-w600">{order.length}</h2>
                      <span className="text-gray">Total Product</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-sm-4">
              <div className="card grd-card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="media-body mr-2">
                      <h2 className="text-black font-w600">{order.length}</h2>
                      <span className="text-gray">Total Campaign</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-xl-9 col-xxl-8">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-header d-sm-flex d-block pb-0 border-0">
                      <div className="mr-auto pr-3">
                        <h4 className="text-black fs-20">Customer Map</h4>
                        <p className="fs-13 mb-0 text-black">
                          Lorem ipsum dolor sit amet, consectetur
                        </p>
                      </div>
                      <div className="card-action card-tabs mt-3 mt-sm-0 mt-3 mb-sm-0 mb-3 mt-sm-0">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#tab1"
                              role="tab"
                              aria-selected="true"
                            >
                              Monthly
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#tab2"
                              role="tab"
                              aria-selected="false"
                            >
                              Weekly
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#tab3"
                              role="tab"
                              aria-selected="false"
                            >
                              Today
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-body pb-0">
                      <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab1">
                          <div id="chartTimeline"></div>
                        </div>
                        <div className="tab-pane fade" id="tab2">
                          <div id="chartTimeline2"></div>
                        </div>
                        <div className="tab-pane fade" id="tab3">
                          <div id="chartTimeline3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-xxl-12 col-lg-8">
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <h4 className="text-black fs-20 mb-0">
                        Transactions Summary
                      </h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6 mb-sm-0 mb-3">
                          <div className="media align-items-center">
                            <div className="d-inline-block mr-3 position-relative donut-chart-sale2">
                              <span
                                className="donut2"
                                data-peity='{ "fill": ["rgb(84, 205, 81)", "rgba(255, 255, 255, 1)"],   "innerRadius": 27, "radius": 10}'
                              >
                                6/8
                              </span>
                              <small className="text-black">86%</small>
                            </div>
                            <div>
                              <h4 className="fs-28 font-w600 text-black mb-0">
                                585
                              </h4>
                              <span>Succesfull Order</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="media align-items-center">
                            <div className="d-inline-block mr-3 position-relative donut-chart-sale2">
                              <span
                                className="donut2"
                                data-peity='{ "fill": ["rgb(255, 55, 112)", "rgba(255, 255, 255, 1)"],   "innerRadius": 27, "radius": 10}'
                              >
                                3/8
                              </span>
                              <small className="text-black">14%</small>
                            </div>
                            <div>
                              <h4 className="fs-28 font-w600 text-black mb-0">
                                165
                              </h4>
                              <span>Unsuccesfull Order</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-xxl-12 col-lg-4">
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <h4 className="text-black fs-20 mb-0">Average</h4>
                    </div>
                    <div className="card-body">
                      <div className="d-flex align-items-end">
                        <div>
                          <h4 className="fs-28 font-w600 text-black mb-0">
                            87,456
                          </h4>
                          <span>Order</span>
                        </div>
                        <canvas
                          className="lineChart"
                          id="chart_widget_2"
                          height="85"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="col-xl-3 col-xxl-4">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card trending-menus">
                    <div className="card-header d-sm-flex d-block pb-0 border-0">
                      <div>
                        <h4 className="text-black fs-20">
                          Daily Trending Menus
                        </h4>
                        <p className="fs-13 mb-0 text-black">
                          Lorem ipsum dolor
                        </p>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
                        <span className="num">#1</span>
                        <div className="mr-auto pr-3">
                          <a href="post-details.html">
                            <h2 className="text-black fs-14">
                              Medium Spicy Spagethi Italiano
                            </h2>
                          </a>
                          <span className="text-black font-w600 d-inline-block mr-3">
                            $5.6{" "}
                          </span>{" "}
                          <span className="fs-14">Order 89x</span>
                        </div>
                        <img
                          src="images/menus/9.png"
                          alt=""
                          width="60"
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
                        <span className="num">#2</span>
                        <div className="mr-auto pr-3">
                          <a href="post-details.html">
                            <h2 className="text-black fs-14">
                              Watermelon juice with ice
                            </h2>
                          </a>
                          <span className="text-black font-w600 d-inline-block mr-3">
                            $5.6{" "}
                          </span>{" "}
                          <span className="fs-14">Order 89x</span>
                        </div>
                        <img
                          src="images/menus/10.png"
                          alt=""
                          width="60"
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
                        <span className="num">#3</span>
                        <div className="mr-auto pr-3">
                          <a href="post-details.html">
                            <h2 className="text-black fs-14">
                              Chicken curry special with cucumber
                            </h2>
                          </a>
                          <span className="text-black font-w600 d-inline-block mr-3">
                            $5.6{" "}
                          </span>{" "}
                          <span className="fs-14">Order 89x</span>
                        </div>
                        <img
                          src="images/menus/11.png"
                          alt=""
                          width="60"
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
                        <span className="num">#4</span>
                        <div className="mr-auto pr-3">
                          <a href="post-details.html">
                            <h2 className="text-black fs-14">
                              Italiano Pizza With Garlic
                            </h2>
                          </a>
                          <span className="text-black font-w600 d-inline-block mr-3">
                            $5.6{" "}
                          </span>{" "}
                          <span className="fs-14">Order 89x</span>
                        </div>
                        <img
                          src="images/menus/12.png"
                          alt=""
                          width="60"
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex tr-row align-items-center">
                        <span className="num">#5</span>
                        <div className="mr-auto pr-3">
                          <a href="post-details.html">
                            <h2 className="text-black fs-14">
                              Tuna Soup spinach with himalaya salt
                            </h2>
                          </a>
                          <span className="text-black font-w600 d-inline-block mr-3">
                            $5.6{" "}
                          </span>{" "}
                          <span className="fs-14">Order 89x</span>
                        </div>
                        <img
                          src="images/menus/9.png"
                          alt=""
                          width="60"
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentBody;
