import type { IntialInvoiceDataType } from "@/types";

export const formatInvoiceData = (invoiceData: IntialInvoiceDataType) => {
  const {
    title,
    company ,
    invoice ,
    account ,
    billing ,
    shipping ,
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
    total
  }
};
