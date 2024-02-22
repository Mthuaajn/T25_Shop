import axios from "axios";
// import { store } from "../store/redux";
// import { changeToken, resetState } from "../store/user/userSlice";

const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    let localStorageData = window.localStorage.getItem("persist:sneaker/user");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
      const token = JSON.parse(localStorageData?.token);
      config.headers = { Authorization: `Bearer ${token}` };
      return config;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return instance.put("user/refresh-access-token").then((res) => {
        if (res.message === "Success") {
          let localStorageData = window.localStorage.getItem(
            "persist:sneaker/user"
          );
          localStorageData = JSON.parse(localStorageData);
          localStorageData.token = JSON.stringify(res.data.accessToken);
          window.localStorage.setItem(
            "persist:sneaker/user",
            JSON.stringify(localStorageData)
          );
          //store.dispatch(changeToken(res.data.accessToken));
          return instance(originalRequest);
        } else {
          //store.dispatch(resetState());
          return res;
        }
      });
    } else return error.response.data;
  }
);

export default instance;
