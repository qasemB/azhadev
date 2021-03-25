import http from "./httpSevice";
import config from "./config.json";

export const CsrfToken = async () => {
  const res = await http.get(`${config.asandevapi}/sanctum/csrf-cookie`);
  if (res.status == 204) {
    return true;
  } else {
    return false;
  }
};
