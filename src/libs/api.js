import { apiBaseUrlDev } from "../config/env";
import { getAccessToken } from "./auth";

export default async function fetchData(
  uri,
  method,
  payload,
  isFormData,
  cookies
) {
  const response = await fetch(`${apiBaseUrlDev}${uri}`, {
    method: method,
    headers: isFormData
      ? { token: `Bearer ${getAccessToken() ?? cookies?.accessToken}` }
      : {
          "Content-Type": "application/json",
          token: `Bearer ${getAccessToken() ?? cookies?.accessToken}`,
        },
    body: !payload ? undefined : isFormData ? payload : JSON.stringify(payload),
  });

  return await response.json();
}
