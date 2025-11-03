export type InvoiceItem = {
  name: string;
  quantity: number | undefined;
  amount: number | undefined;
  description: string;
  total: number | undefined;
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


export type FormattedInvoiceDataType = {
  title: string;

  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyLogo: string;

  invoiceNumber: string;
  invoiceDate: string;
  paymentDate: string;

  accountName: string;
  accountNumber: string;
  accountIFSCCode: string;

  billingName: string;
  billingAddress: string;
  billingPhone: string;

  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;

  notes: string;
  items: InvoiceItem[];
  logo: string;
  currencySymbol: string;
  tax: number;
  subtotal: number;
  taxAmount: number;
  total: number;
};

export type PayloadType = IntialInvoiceDataType & {
  template: string;
  thumbnailURL: string;
} 