import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

if (typeof window !== "undefined") {
  const token = localStorage.getItem("user_token");
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// axios.interceptors.response.use(null, (error) => {
//   const expectedErrors =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;
//   if (!expectedErrors) {
//     console.log(error);
//     alert("مشکلی از سمت سرور رخ داده است.");
//   }

//   return Promise.reject(error);
// });

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
