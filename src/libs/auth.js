import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { getCookie, setCookie, removeCookie } from "../libs/cookie";

export const getId = () => getCookie("id");
export const setId = (value) => setCookie("id", value);
export const getRoleId = () => getCookie("roleId");
export const setRoleId = (value) => setCookie("roleId", value);
export const getEmail = () => getCookie("email");
export const setEmail = (value) => setCookie("email", value);
export const getAccessToken = () => getCookie("accessToken");
export const setAccessToken = (value) => setCookie("accessToken", value);

export const createLogin = (id, roleId, email, accessToken) => {
  try {
    setId(id);
    setRoleId(roleId);
    setEmail(email);
    setAccessToken(accessToken);
    return true;
  } catch (error) {
    console.error("error", error);

    return false;
  }
};

export const isLoggedIn = () => {
  if (!getId() || !getRoleId() || !getEmail() || !getAccessToken())
    return false;

  return true;
};

export const destroyLogin = () => {
  try {
    removeCookie("id");
    removeCookie("roleId");
    removeCookie("email");
    removeCookie("accessToken");

    return true;
  } catch (error) {
    console.error("error", error);

    return false;
  }
};

const Auth = (Component) => {
  const Wrapper = (props) => {
    if (!isLoggedIn()) {
      return <Redirect from={props.location.pathname} to="/" push={true} />;
    } else {
      return <Component {...props} />;
    }
  };

  return withRouter(Wrapper);
};

export default Auth;
