type IntialInvoiceDataType = {
  title: string;
  billing: object;
  shipping: object;
  invoice: object;
  account: object;
  company: object;
  tax: number;
  notes: string;
  items: object[];
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
  items: [{ name: "", quantity: "", amount: "", desciption: "", total: 0 }],
  logo: "",
};
