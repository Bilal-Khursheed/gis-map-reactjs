import { SERVER_URL } from "../../Settings/Constant";


const sendRequest = async (url, init_settings) => {
  url = SERVER_URL + url;
  try {
    let response = await fetch(url, init_settings);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    let err = [];
    err.error = error;
    err.no_result = true;
    return err;
  }
};
export { sendRequest };