import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1800000,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token != null) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error?.response?.status === 440) {
      Cookies.remove("gnc.auth-token");
      window.location.href =
        import.meta.env.VITE_SSO_URL +
        "/auth/login?callback=" +
        window.location.href;
    }
    if (error && error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
);

function getToken() {
  const itemStr = Cookies.get("gnc.auth-token");
  if (!itemStr) {
    return null;
  } else {
    return "Bearer " + itemStr;
  }
}

export default axiosClient;
