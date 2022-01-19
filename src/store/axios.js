import axios from "axios";

// //Add a response interceptor
// axios.interceptors.response.use((response) => {
//     return response
// }, function(error) {
//     return Promise.reject(error);
// });

const authTokenRefresh = async () => {
    try {
  
      await axios.get(process.env.VUE_APP_API_URL + "vendor/refresh",{data:{refreshToken:localStorage.getItem("refresh-token")}});
    } catch (err) {
      console.log(err);
    }
  };

const axiosJWT = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

axiosJWT.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry) {
      await authTokenRefresh();
      originalRequest._retry = true;
      return axiosJWT(originalRequest);
    }

    return Promise.reject(err);
  }
);

axiosJWT.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = "Bearer" + " " + localStorage.getItem("access-token")
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default axiosJWT;