import http from "./httpSevice";
import config from "../services/config.json";

export const addCommentService = async (comment) => {
  comment["token"] = config.token.token;
  return await http.post(
    `${config.asandevapi}/api/store-comment`,
    JSON.stringify(comment)
  );
};
export const getAllCommentsService = async () => {
  return await http.post(
    `${config.asandevapi}/api/admin/get-comments`,
    JSON.stringify(config.token)
  );
};
export const deleteCommentService = async (comment) => {
  comment["token"] = config.token.token;
  return await http.post(
    `${config.asandevapi}/api/admin/delete-comment`,
    JSON.stringify(comment)
  );
};
export const activeCommentService = async (comment) => {
  comment["token"] = config.token.token;
  return await http.post(
    `${config.asandevapi}/api/admin/active-comment`,
    JSON.stringify(comment)
  );
};
