import http from "./httpSevice";
import config from "../services/config.json";

export const getAllArticles = async () => {
  return await http.post(
    `${config.asandevapi}/api/all-articles`,
    JSON.stringify(config.token)
  );
};
export const getAdminAllArticles = async () => {
  return await http.post(
    `${config.asandevapi}/api/admin/all-articles`,
    JSON.stringify(config.token)
  );
};

export const getGroupOfArticles = async (catId) => {
  return await http.post(
    `${config.asandevapi}/api/all-articles/${catId}`,
    JSON.stringify(config.token)
  );
};

export const getSingleArticle = async (articleId) => {
  return await http.post(
    `${config.asandevapi}/api/article/${articleId}`,
    JSON.stringify(config.token)
  );
};

export const storeArticleService = async (article) => {
  article["token"] = config.token.token;
  return await http.post(
    `${config.asandevapi}/api/admin/store-article`,
    JSON.stringify(article)
  );
};
export const activeArticleService = async (article) => {
  article["token"] = config.token.token;
  return await http.post(
    `${config.asandevapi}/api/admin/active-article`,
    JSON.stringify(article)
  );
};
export const deleteArticleService = async (article) => {
  article["token"] = config.token.token;
  return await http.post(
    `${config.asandevapi}/api/admin/delete-article`,
    JSON.stringify(article)
  );
};
export const editArticleSevice = async (article) => {
  article["token"] = config.token.token;
  return await http.post(
    `${config.asandevapi}/api/admin/edit-article`,
    JSON.stringify(article)
  );
};
