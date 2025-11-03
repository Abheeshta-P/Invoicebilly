import { baseURL } from "@/config/config"
import type { PayloadType } from "@/types";
import axios from "axios"

export const saveInvoice = (payload:PayloadType) => {
   return axios.post(`${baseURL}/invoices`, payload);
}