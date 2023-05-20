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

export const addAdmin = async (data: any) => {
  const res = await axios.post(`${baseUrl}/`, data, requestConfig);
  return res.data.data;
};

export const updateAdmin = async (data: any) => {
  const res = await axios.put(`${baseUrl}/`, data, requestConfig);
  return res.data.data;
};

export const deleteAdmin = async (id: string) => {
  const res = await axios.delete(`${baseUrl}/${id}`, requestConfig);
  return res.data.data;
};
