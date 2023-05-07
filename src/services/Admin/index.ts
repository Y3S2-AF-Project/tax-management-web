import axios from "axios";
import { ILogin } from "../../interfaces/admin";
import requestConfig from "./config/requestConfig";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "admin";

export const adminLogin = (data: ILogin) => {
  return axios.post(`${baseUrl}/login`, data);
};

export const getAdmins = async () => {
  const res = await axios.get(`${baseUrl}/`, requestConfig);
  return res.data.data;
};
