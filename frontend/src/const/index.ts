// const.ts

import type { IntialInvoiceDataType } from "@/types";

export const intialInvoiceData: IntialInvoiceDataType = {
  title: "New Invoice",
  billing: { name: "", phone: "", address: "" },
  shipping: { name: "", phone: "", address: "" },
  invoice: { number: "", date: "", dueDate: "" },
  account: { name: "", number: "", ifsccode: "" },
  company: { name: "", number: "", address: "" },
  tax: 0,
  notes: "",
  items: [{ name: "", quantity: undefined, amount: undefined, description: "", total: undefined }],
  logo: "",
};
