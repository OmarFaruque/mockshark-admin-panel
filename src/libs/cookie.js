import jsCookie from "js-cookie";

export const getCookie = (tag) => jsCookie.get(tag);

export const setCookie = (tag, data) => jsCookie.set(tag, data);

export const removeCookie = (tag) => jsCookie.remove(tag);
