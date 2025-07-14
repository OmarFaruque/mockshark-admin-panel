import React from "react";
import { useHistory } from "react-router-dom";
import fetchData from "../libs/api";
import { destroyLogin } from "../libs/auth";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import "./css/navheader.css";

const logout = async () => {
  const jsonData = await fetchData("/api/v1/auth/logout", "POST");

  const message = jsonData.message;
  if (!jsonData.success)
    // eslint-disable-next-line no-throw-literal
    throw {
      message,
    };

  return { success: true, message: message };
};

const Header = () => {
  const router = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    logout()
      .then((result) => {
        console.log(result);
        if (result.success) {
          destroyLogin();
          showSuccessToast(result.message);
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error.message ?? "Something went wrong!");
      });
  };

  return (
    <>
      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">
                <div className="dashboard_bar">
                  Mockshark
                  <span>Welcome to Mockshark Dashboard!</span>
                </div>
              </div>
              <ul className="navbar-nav header-right">
                <li className="nav-item dropdown header-profile">
                  <a
                    className="nav-link"
                    href="true"
                    role="button"
                    data-toggle="dropdown"
                  >
                    <img
                      src="images/avatar.png"
                      width="20"
                      alt="admin"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="header-info">
                      <span className="text-black">
                        <strong>Admin</strong>
                      </span>
                      <p className="fs-12 mb-0">Admin</p>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    {/* <Link to="/about" className="dropdown-item ai-icon">
                      <svg
                        id="icon-user1"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span className="ml-2">Profile </span>
                    </Link> */}
                    <a
                      href="true"
                      className="dropdown-item ai-icon"
                      onClick={(e) => handleLogout(e)}
                    >
                      <svg
                        id="icon-logout"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-danger"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      <span className="ml-2">Logout </span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
