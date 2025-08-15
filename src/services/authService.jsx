import axiosClient from "./interceptor";
import Cookies from "js-cookie";
import { store } from "../redux/store";
import { setCurrentUser } from "../redux/user";

export const authService = {
  async login(form) {
    try {
      const res = await axiosClient.post("/auth/checkLogin", form);
      setAuthFromCookie(res);
      return res; // ✅ return so caller can use it
    } catch (err) {
      console.warn("checkLogin failed, switching to /auth/Login...", err);
      try {
        const resLogin = await axiosClient.post("/auth/Login", form);
        setAuthFromCookie(resLogin);
        return resLogin; // ✅ return so caller can use it
      } catch (loginErr) {
        console.error("Both checkLogin and Login failed", loginErr);
        throw loginErr;
      }
    }
  },

  getUserByToken() {
    const auth = Cookies.get("Abp.AuthToken");
    if (!auth) return undefined;

    return axiosClient
      .post("/auth/checkToken", { token: auth })
      .then((response) => {
        store.dispatch(setCurrentUser(response));
      })
      .catch((error) => console.error(error));
  },

  logout() {
    Cookies.remove("Abp.AuthToken");
    authRedirect(true);
  },
};

function setAuthFromCookie(auth) {
  const token = auth?.result?.accessToken;
  if (token) {
    Cookies.set("Abp.AuthToken", token, { expires: 7 });
    authRedirect();
  } else {
    window.location.href = "/auth/login";
  }
}

function authRedirect(logout = false) {
  window.location.href = logout ? "/auth/login" : "/";
}
