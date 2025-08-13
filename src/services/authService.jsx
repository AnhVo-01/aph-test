import axios from "axios";
import axiosClient from "./interceptor";
import Cookies from "js-cookie";

export const authService = {
  login: async (form) => {
    const res = await axios.post(
      import.meta.env.VITE_BASE_URL + "/auth/login",
      form
    );
    if (res.status === 200) {
      setAuthFromCookie(res.data);
      authRedirect();
    }
  },

  getUserById(id) {
    return axiosClient.get(`/api/users/${id}`);
  },

  getUserByToken() {
    const auth = Cookies.get("gnc.auth-token");

    if (!auth) {
      window.location.href =
        import.meta.env.VITE_SSO_URL +
        "/auth/login?callback=" +
        window.location.href;
    }

    return axiosClient.get("/auth/getMe", {
      params: { token: auth, app: "BCMS" },
    });
  },

  registration(user) {
    return axiosClient.post("/auth/register", user);
  },

  logout() {
    Cookies.remove("gnc.auth-token");
    window.location.href = import.meta.env.VITE_SSO_URL;
  },
};

function setAuthFromCookie(auth) {
  // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
  if (auth && auth.accessToken) {
    Cookies.set("gnc.auth-token", auth.accessToken, 1);
    return true;
  }
  return false;
}

function authRedirect() {
  if (window.location.href.includes("callback")) {
    const params = new URLSearchParams(window.location.href.split("?")[1]);

    // window.location.href = window.location.href.split("/?")[0];

    const auth = Cookies.get("gnc.auth-token");

    if (auth) {
      window.location.href = params.get("callback") + "?code=" + auth;
    } else {
      window.location.href = "/auth/login";
    }
  } else {
    window.location.href = "/";
  }
}
