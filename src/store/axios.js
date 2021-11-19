import axios from "axios";

// //Add a response interceptor
// axios.interceptors.response.use((response) => {
//     return response
// }, function(error) {
//     return Promise.reject(error);
// });

const authTokenRefresh = async () => {
    try {
  
      await axios.get(process.env.VUE_APP_API_URL + "auth/refresh",{withCredentials:true});
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

export default axiosJWT;