import http from "./httpSevice";
import config from "./config.json";
import { CsrfToken } from "./CsrfToken";

export const getAllUserService = async () => {
  return await http.post(
    `${config.asandevapi}/api/admin/all-users`,
    JSON.stringify(config.token)
  );
};

export const deleteUserService = async (user) => {
  user["token"] = config.token.token;
  return await http.post(
    `${config.asandevapi}/api/admin/delete-user`,
    JSON.stringify(user)
  );
};

export const registerUser = async (user) => {
  user["token"] = config.token.token;
  if (await CsrfToken()) {
    return await http.post(
      `${config.asandevapi}/api/register`,
      JSON.stringify(user)
    );
  } else {
    console.log("csrf not set");
  }
};

export const loginUser = async (user) => {
  user["token"] = config.token.token;
  if (await CsrfToken()) {
    return await http.post(
      `${config.asandevapi}/api/login`,
      JSON.stringify(user)
    );
  }
  //  else {
  //   console.log("csrf not set");
  // }
};

export const logoutUser = async () => {
  if (await CsrfToken()) {
    const res = await http.post(`${config.asandevapi}/api/logout`);
    if (res.data.status == 200) {
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_info");
      localStorage.removeItem("user_remember");
      return true;
    }
  }
};

export const forgetPassword = async (user) => {
  user["token"] = config.token.token;
  if (await CsrfToken()) {
    return await http.post(
      `${config.asandevapi}/api/forget-password`,
      JSON.stringify(user)
    );
  }
};

export const getUser = async () => {
  if (await CsrfToken()) {
    const res = await http.post(`${config.asandevapi}/api/get-user`);
    if (res.status == 200) {
      return { ...res.data };
    }
  }
};

export const saveToken = (token, user, remember) => {
  localStorage.setItem("user_token", token);
  localStorage.setItem("user_info", JSON.stringify(user));
  if (remember) {
    const time = new Date().getTime() + 5 * 365 * 24 * 60 * 60 * 1000;
    localStorage.setItem("user_remember", time);
  } else {
    const time = new Date().getTime() + 2 * 60 * 60 * 1000;
    localStorage.setItem("user_remember", time);
  }
};

export const authCheck = async () => {
  if (await CsrfToken()) {
    try {
      const res = await http.post(`${config.asandevapi}/api/check-login`);
      if (res.status == 200 && res.data == 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

export const checkLoginToken = () => {
  const token = localStorage.getItem("user_token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export const getStorageUser = async () => {
  const user = JSON.parse(localStorage.getItem("user_info"));
  if (user) {
    return user;
  }
};

export const chechExpireDate = async () => {
  const nowTime = new Date().getTime();
  const expireDate = localStorage.getItem("user_remember");
  if (expireDate) {
    const diff = parseInt(expireDate) - parseInt(nowTime);
    if (diff >= 0) {
      return true;
    } else {
      await logoutUser();
      return false;
    }
  } else {
    return false;
  }
};

export const checkAdmin = async () => {
  if (chechExpireDate()) {
    const user = await getUser();
    if (user) {
      if (user.is_admin == 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
