import { baseURL } from "@/config/config";
import type { PayloadType } from "@/types";
import axios from "axios";

export const saveInvoice = (payload: PayloadType) => {
  return axios.post(`${baseURL}/invoices`, payload);
};

export const getAllInvoices = () => {
  return axios.get(`${baseURL}/invoices`);
};

export const deleteInvoice = (id: string) => {
  return axios.delete(`${baseURL}/invoices/${id}`);
};
