import axios from "axios";

import ConnectionErrorModalHandler from "@/components/modals/connectionErrorModal/handler";
import InternalServerErrorModalHandler from "@/components/modals/internalServerErrorModal/handler";
import NotAllowedModalHandler from "@/components/modals/notAllowedModal/handler";
import UnauthorizedModalHandler from "@/components/modals/unauthorizedModal/handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "./AppError";

const base = {
  1: 'https://tst-smartboi-api.azurewebsites.net/api/v1',
  2: "https://prd-smartboi-api.azurewebsites.net/api/v1"
}

const api = axios.create({
  baseURL: base[1],
});

function handleConnectionError() {
  ConnectionErrorModalHandler.showModal();
}

function handleServerError(error: any) {
  switch (error.response.status) {
    case 401:
      UnauthorizedModalHandler.showModal();
      break;
    case 403:
      NotAllowedModalHandler.showModal();
      break;
    case 500:
    case 503:
      InternalServerErrorModalHandler.showModal();
  }
}

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@connectChurch:token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log({ apiError: error })
    const apiError = error?.response?.data
    if (apiError) {
      return Promise.reject(new AppError(apiError.errors[0]))
    }
    if (!error.response) {
      handleConnectionError();
    } else {
      handleServerError(error);
    }
    return Promise.reject(error);
  }
);

export default api;
