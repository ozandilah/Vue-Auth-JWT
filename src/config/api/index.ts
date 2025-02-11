import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import Cookies from "js-cookie";

interface callAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
}: callAPIProps) {
  let headers = {};
  if (token === true) {
    const tokenCookies = Cookies.get("token");
    if (tokenCookies) {
      headers = {
        Authorization: `Bearer ${tokenCookies}`,
      };
    }
  }
  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((error) => error.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }
  const { length } = Object.keys(response.data);
  const res = {
    error: false,
    message: "success",
    data: length > 1 ? response.data : response.data.data,
  };

  return res;
}
