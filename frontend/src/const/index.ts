// const.ts
export type InvoiceItem = {
  name: string;
  quantity: number|undefined;
  amount: number|undefined;
  description: string;
  total: number|undefined;
};

export type AddressInfo = {
  name: string;
  phone: string;
  address: string;
};

export type CompanyInfo = {
  name: string;
  number: string;
  address: string;
};

export type AccountInfo = {
  name: string;
  number: string;
  ifsccode: string;
};

export type InvoiceMeta = {
  number: string;
  date: string;
  dueDate: string;
};

export type IntialInvoiceDataType = {
  title: string;
  billing: AddressInfo;
  shipping: AddressInfo;
  invoice: InvoiceMeta;
  account: AccountInfo;
  company: CompanyInfo;
  tax: number;
  notes: string;
  items: InvoiceItem[];
  logo: string;
};

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
