import http from "./httpSevice";
import config from "../services/config.json";

export const getAllCategories = async () => {
  return await http.post(
    `${config.asandevapi}/api/all-categories`,
    JSON.stringify(config.token)
  );
};

export const storeCategoryService = async (category) => {
  category["token"] = config.token.token;
  return await http.post(
    `${config.asandevapi}/api/admin/store-category`,
    JSON.stringify(category)
  );
};
export const deleteCategoyyService = async (category) => {
  category["token"] = config.token.token;
  return await http.post(
    `${config.asandevapi}/api/admin/delete-category`,
    JSON.stringify(category)
  );
};
export const editCategorySevice = async (category) => {
  category["token"] = config.token.token;
  return await http.post(
    `${config.asandevapi}/api/admin/edit-category`,
    JSON.stringify(category)
  );
};
