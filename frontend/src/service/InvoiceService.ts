import { baseURL } from "@/config/config";
import type { PayloadType } from "@/types";
import axios from "axios";

export const saveInvoice = (payload: PayloadType, token: string | null) => {
  return axios.post(`${baseURL}/invoices`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllInvoices = (token: string | null) => {
  return axios.get(`${baseURL}/invoices`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteInvoice = (id: string, token: string | null) => {
  return axios.delete(`${baseURL}/invoices/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendInvoice = (formData: FormData, token: string | null) => {
  return axios.post(`${baseURL}/invoices/sendinvoice`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
