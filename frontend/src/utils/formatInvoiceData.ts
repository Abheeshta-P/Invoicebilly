import type { IntialInvoiceDataType, InvoiceResponseType } from "@/types";

export const formatInvoiceData = (invoiceData: IntialInvoiceDataType) => {
  const {
    title,
    company,
    invoice,
    account,
    billing,
    shipping,
    tax = 0,
    notes = "",
    items = [],
    logo = "",
  } = invoiceData || [];

  const currencySymbol = "₹";
  const subtotal = items.reduce(
    (acc, item) => acc + (item.quantity ?? 0) * (item.amount ?? 0),
    0
  );
  const taxAmount = subtotal * (tax / 100);
  const total = subtotal + taxAmount;

  return {
    title,
    companyName: company.name,
    companyAddress: company.address,
    companyPhone: company.number,
    companyLogo: logo,

    invoiceNumber: invoice.number,
    invoiceDate: invoice.date,
    paymentDate: invoice.dueDate,

    accountName: account.name,
    accountNumber: account.number,
    accountIFSCCode: account.ifsccode,

    billingName: billing.name,
    billingAddress: billing.address,
    billingPhone: billing.phone,

    shippingName: shipping.name,
    shippingAddress: shipping.address,
    shippingPhone: shipping.phone,

    items,
    notes,
    logo,
    currencySymbol,
    tax,
    subtotal,
    taxAmount,
    total,
  };
};

export const formatDate = (dateStr: string) => {
  if (!dateStr) return "N/A";

  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const mapInvoiceResponseToInitialData = (
  invoice: InvoiceResponseType
): IntialInvoiceDataType => ({
  id: invoice.id,
  title: invoice.title,
  company: invoice.company,
  billing: invoice.billing,
  shipping: invoice.shipping,
  invoice: invoice.invoice,
  account: invoice.account,
  tax: invoice.tax,
  notes: invoice.notes,
  logo: invoice.logo,
  items: invoice.items.map((item) => ({
    ...item,
    total: item.amount * item.quantity,
  }))
})
