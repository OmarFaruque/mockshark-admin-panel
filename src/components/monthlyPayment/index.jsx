import React, { useState, useEffect, useCallback } from "react";
import "../css/category-list.css";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import CreateMonthlyPayment from "./CreateMonthlyPayment";
import ActionButton from "../global/ActionButton";
import ActionButtonMenu from "../global/ActionButtonMenu";
import EditMonthlyPayment from "./EditMonthlyPayment";
import DeleteData from "../global/DeleteData";
import CardHeader from "../global/CardHeader";
import Button from "../global/Button";
import Dropdown, { months } from "../global/Dropdown";

const MonthlyPaymentList = () => {
  const d = new Date();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [users, setUsers] = useState([]);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [selectedQuery, setSelectedQuery] = useState(
    new Date(Date.now()).toISOString().split("-")[1]
  );
  const [selectedMonth, setSelectedMonth] = useState(
    `${months[d.getMonth()].label}`
  );
  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState("");

  const loadMoreMonthlyPayment = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const getMonthlyPayments = useCallback(() => {
    setLoader(true);

    fetchData(
      `/api/v1/payments/monthly?month=${selectedQuery}&page=${
        searchTerm.length > 2 ? "" : page
      }&limit=${searchTerm.length > 2 ? "" : limit}`,
      "GET"
    )
      .then((result) => {
        if (result.success) {
          if (searchTerm.length > 2) {
            if (page > 1) {
              setPage(1);
              setData([]);
            }
            setData(result.data);
          } else if (page > 1) {
            setData([...data, ...result.data]);
          } else {
            setData(result.data);
          }
          setMessage(result.message);
        } else {
          showSuccessToast(result.message);
          setMessage(result.message);
        }
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [selectedQuery, searchTerm, page, limit]);

  //get all modules
  const getUsers = useCallback(() => {
    setLoader(true);
    fetchData(`/api/v1/auth/users?limit=100`, "GET")
      .then((result) => {
        if (result.success) {
          setUsers(result.data);
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
  }, []);

  useEffect(() => {
    getUsers();
    return () => setUsers([]);
  }, []);

  useEffect(() => {
    const getMonthlyPaymentDebounce = setTimeout(() => {
      getMonthlyPayments();
    }, 500);

    return () => clearTimeout(getMonthlyPaymentDebounce);
  }, [selectedQuery, searchTerm, page, limit]);

  return (
    <>
      {/* add modal */}
      <CreateMonthlyPayment
        users={users}
        getMonthlyPayments={getMonthlyPayments}
      />

      {/* table */}
      <div className="col-lg-12">
        <div className="card">
          <CardHeader
            title={"Monthly Payments"}
            modalId={"#createMonthlyPayments"}
            buttonText={"+"}
            btnClass={"btnAdd"}
            totalCount={data ? data.length : 0}
          >
            <Dropdown
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              setSelectedQuery={setSelectedQuery}
            />
          </CardHeader>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-responsive-md">
                <thead>
                  <tr>
                    <th className="width80">#</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Due</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data ? (
                    data?.map((item, index) => (
                      <tr key={item.id + index}>
                        <td>
                          <strong>{index + 1}</strong>
                        </td>
                        <td>{item.user.name}</td>
                        <td>{item.date.substring(0, 10)}</td>
                        <td>{item.amount}</td>
                        <td>{item.due}</td>

                        <td>
                          <ActionButton>
                            <ActionButtonMenu
                              menuName={"Edit"}
                              menuTarget={"#editMonthlyPayment" + item.id}
                            />
                            <ActionButtonMenu
                              menuName={"Delete"}
                              menuTarget={"#deleteMonthlyPayment" + item.id}
                            />
                          </ActionButton>
                        </td>
                        <EditMonthlyPayment
                          item={item}
                          getMonthlyPayments={getMonthlyPayments}
                        />
                        <DeleteData
                          uri={`/api/v1/payments/${item.id}/monthly`}
                          getData={getMonthlyPayments}
                          modalId={"deleteMonthlyPayment" + item.id}
                          modalHeader={"Delete Monthly Payment"}
                        />
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr className="col-md-12 text-center">
                        <td></td>
                        <td>{message}</td>
                        <td></td>
                      </tr>
                    </>
                  )}
                </tbody>

                <tfoot>
                  <tr>
                    <th className="width80">#</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Due</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
              <div className="col-md-12 text-center">
                {data?.length === limit * page && (
                  <>
                    <Button
                      buttonText={"Load more"}
                      fontSize={"11px"}
                      buttonOnClick={() => loadMoreMonthlyPayment()}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthlyPaymentList;
