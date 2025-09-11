import axios from "axios";

const TIMEOUT = 1 * 60 * 100000;

class ServiceBase {
  service;
  onUnauthenticated;

  constructor(baseURL, onUnauthenticated) {
    this.service = axios.create({
      baseURL,
      timeout: TIMEOUT,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    this.onUnauthenticated = onUnauthenticated;
    this.service.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError
    );

    this.service.interceptors.response.use(
      this.handleResponse,
      this.handleResponseError
    );
  }

  handleRequest = (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

  handleRequestError = (error) => {
    return Promise.reject(error);
  };
  handleResponse = (response) => {
    return response.data;
  };

  handleResponseError = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.onUnauthenticated();
          break;

        case 403:
          this.onUnauthenticated();
          break;

        case 404:
          console.error("Resource not found");
          break;

        case 500:
          console.error("Internal server error");
          break;

        default:
          console.error("An error occurred:", error.response.data);
          break;
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  };
  get = (url, config = {}) => {
    return this.service.get(url, config);
  };

  post = (url, data = {}, config = {}) => {
    return this.service.post(url, data, config);
  };

  put = (url, data = {}, config = {}) => {
    return this.service.put(url, data, config);
  };

  delete = (url, config = {}) => {
    return this.service.delete(url, config);
  };
  setToken = (token) => {
    localStorage.setItem("token", token);
  };

  removeToken = () => {
    localStorage.removeItem("token");
  };

  redirectTo = (path) => {
    window.location.href = path;
  };
}

export { ServiceBase };
