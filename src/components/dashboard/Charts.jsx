import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
// import faker from "faker";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import fetchData from "../../libs/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Charts() {
  const [revenues, setRevenues] = useState([]);
  const [revenues1, setRevenues1] = useState([]);

  //get all revenues
  const getRevenues = () => {
    // setLoader(true);

    fetchData(
      `/api/v1/dashboard/user/total-revenue-year-wise/${new Date().getFullYear()}`,
      "GET"
    )
      .then((result) => {
        if (result.success) {
          setRevenues(result.data);
        } else {
          //   showErrorToast(result.message);
        }
      })
      .catch((error) => {
        // showErrorToast(error);
      })
      .finally(() => {
        // setLoader(false);
      });
  };

  useEffect(() => {
    getRevenues();

    return () => setRevenues([]);
  }, []);

  const getRevenues1 = () => {
    // setLoader(true);

    fetchData(
      `/api/v1/dashboard/user/total-revenue-year-wise/${
        new Date().getFullYear() - 1
      }`,
      "GET"
    )
      .then((result) => {
        if (result.success) {
          setRevenues1(result.data);
        } else {
          //   showErrorToast(result.message);
        }
      })
      .catch((error) => {
        // showErrorToast(error);
      })
      .finally(() => {
        // setLoader(false);
      });
  };

  useEffect(() => {
    getRevenues1();

    return () => setRevenues1([]);
  }, []);

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Monthly Revenue - ${new Date().getFullYear()}`,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Optional: To hide grid lines
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Monthly Revenue - ${new Date().getFullYear() - 1}`,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Optional: To hide grid lines
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenues?.map((itm) => {
          return itm?.revenue;
        }),
        backgroundColor: "rgba(53, 199, 235, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        // barThickness: 20, // Set fixed bar width
        // maxBarThickness: 30, // Optional: Maximum bar width
      },
      // {
      //   label: "Dataset 2",
      //   data: [5, 6, 7, 8, 9, 3, 4],
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
    ],
  };

  const data1 = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenues1?.map((itm) => {
          return itm?.revenue;
        }),
        backgroundColor: "rgba(96, 235, 53, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        // barThickness: 20, // Set fixed bar width
        // maxBarThickness: 30, // Optional: Maximum bar width
      },
      // {
      //   label: "Dataset 2",
      //   data: [5, 6, 7, 8, 9, 3, 4],
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
    ],
  };

  return (
    <>
      <div
        className="mt-4"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* <div className="lineChart"></div> */}
        {/* <div className="barChart"> */}
        <div style={{ width: "50%" }}>
          <Bar options={options1} data={data} />
        </div>
        <div style={{ width: "50%" }}>
          <Bar options={options2} data={data1} />
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default Charts;
