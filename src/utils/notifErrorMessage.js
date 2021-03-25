export const notifySuccess = (message = "عملیات با موفقیت انجام شد") => {
  return {
    isOpen: true,
    message,
    type: "success",
  };
};
export const notifyError = (message) => {
  return {
    isOpen: true,
    message,
    type: "error",
  };
};
export const notifyError401 = (message = "اطلاعات به درستی وارد نشده") => {
  return {
    isOpen: true,
    message,
    type: "error",
  };
};
export const notifyError422 = (data) => {
  let messages = "";
  for (const m in data.message) {
    messages = messages + data.message[m] + "<br/>";
  }
  return {
    isOpen: true,
    message: messages,
    type: "error",
  };
};
export const notifyError500 = (message = "مشکلی از سمت سرور رخ داده") => {
  return {
    isOpen: true,
    message,
    type: "error",
  };
};

export const closeNotify = (time, notify, func = () => {}) => {
  setTimeout(() => {
    func({
      ...notify,
      isOpen: false,
    });
  }, time);
};
