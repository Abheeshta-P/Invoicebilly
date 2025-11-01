import type { FormattedInvoiceDataType } from "@/types";
import "./css/template2.css";

type TemplateProps = { invoiceData: FormattedInvoiceDataType };

export default function Template2({ invoiceData }: TemplateProps) {
  return (
    <div className="template2 mx-auto my-4 p-4 border rounded">
      {/* Title */}
      <h1 className="invoice-heading mb-4">Invoice</h1>

        {/* COMPANY + LOGO + INVOICE DETAILS */}
        <div className="d-flex flex-column">
          {/* LOGO + COMPANY */}
          <div className="mb-1">
            {invoiceData.logo && (
              <img
                src={invoiceData.logo}
                className="company-logo mb-2"
                alt="logo"
              />
            )}

            <h2 className="company-name">{invoiceData.companyName}</h2>
            <p className="m-0">{invoiceData.companyAddress}</p>
            <p className="m-0">{invoiceData.companyPhone}</p>
        </div>
        <hr className="mb-4"/>
          <div className="d-flex justify-content-between align-items-center">
            {/* LEFT SIDE – BILLED TO */}
            <div className="bill-shipping-block">
              <h3 className="green-heading">Billed To</h3>
              <p className="bold">{invoiceData.billingName}</p>
              <p>{invoiceData.billingAddress}</p>
              <p>{invoiceData.billingPhone}</p>
            </div>
            {/* INVOICE DETAILS */}
            <div className="invoice-details">
              <h3 className="green-heading">Invoice Details</h3>

              <p>
                <strong>Invoice #:</strong> {invoiceData.invoiceNumber}
              </p>
              <p>
                <strong>Invoice Date:</strong> {invoiceData.invoiceDate}
              </p>
              <p>
                <strong>Due Date:</strong> {invoiceData.paymentDate}
              </p>
            </div>
          </div>
        </div>

      {/* ---- ITEMS TABLE ---- */}
      <div className="table-container mt-4">
        <table className="items-table">
          <thead>
            <tr>
              <th>Item Description</th>
              <th className="center">Qty</th>
              <th className="right">Rate</th>
              <th className="right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td className="center">{item.quantity}</td>
                <td className="right">₹{item.amount?.toFixed(2)}</td>
                <td className="right">
                  ₹{((item.quantity ?? 0) * (item.amount ?? 0)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- TOTALS SECTION (right aligned like screenshot) ---- */}
      <div className="totals-wrapper">
        <p className="totals-line">
          <span>Sub Total:</span>
          <span>₹{invoiceData.subtotal.toFixed(2)}</span>
        </p>

        {invoiceData.tax > 0 && (
          <p className="totals-line">
            <span>Tax ({invoiceData.tax}%):</span>
            <span>₹{invoiceData.taxAmount.toFixed(2)}</span>
          </p>
        )}

        <p className="totals-line total-due">
          <span>Total Due:</span>
          <span>₹{invoiceData.total.toFixed(2)}</span>
        </p>
      </div>

      {/* ---- BANK DETAILS ---- */}
      {(invoiceData.accountName ||
        invoiceData.accountNumber ||
        invoiceData.accountIFSCCode) && (
        <div className="bank-section mt-4">
          <h3 className="green-heading">Bank Account Details</h3>

          {invoiceData.accountName && (
            <p>
              <strong>Account Holder:</strong> {invoiceData.accountName}
            </p>
          )}
          {invoiceData.accountNumber && (
            <p>
              <strong>Account Number:</strong> {invoiceData.accountNumber}
            </p>
          )}
          {invoiceData.accountIFSCCode && (
            <p>
              <strong>IFSC / Branch Code:</strong> {invoiceData.accountIFSCCode}
            </p>
          )}
        </div>
      )}

      {/* ---- NOTES ---- */}
      {invoiceData.notes && (
        <div className="notes-section mt-4">
          <h3 className="green-heading">Additional Notes</h3>
          <p>{invoiceData.notes}</p>
        </div>
      )}
    </div>
  );
}
