import http from "./httpSevice";
import config from "./config.json";
import { CsrfToken } from "./CsrfToken";

export const getAllThings = async () => {
  if (await CsrfToken()) {
    return await http.post(
      `${config.asandevapi}/api/get-things`,
      JSON.stringify(config.token)
    );
  }
};
export const getKeywordsService = async () => {
  if (await CsrfToken()) {
    return await http.post(
      `${config.asandevapi}/api/get-keywords`,
      JSON.stringify(config.token)
    );
  }
};
export const getAbilitiesService = async () => {
  if (await CsrfToken()) {
    return await http.post(
      `${config.asandevapi}/api/get-abilities`,
      JSON.stringify(config.token)
    );
  }
};
