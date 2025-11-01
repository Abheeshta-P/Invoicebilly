import type { FormattedInvoiceDataType } from "@/types";
import "./css/template3.css";

type TemplateProps = {
  invoiceData: FormattedInvoiceDataType;
};

export default function Template3({ invoiceData }: TemplateProps) {
  return (
    <div className="template3-container">
      {/* HEADER */}
      <div className="header-row mb-5">
        <div className="left-header">
          {invoiceData.logo && (
            <img src={invoiceData.logo} className="t3-logo" alt="logo" />
          )}
          <h2 className="t3-company-name">{invoiceData.companyName}</h2>
          <p>{invoiceData.companyAddress}</p>
          <p>{invoiceData.companyPhone}</p>
        </div>

        <div className="right-header">
          <h2 className="invoice-title">INVOICE</h2>

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

      {/* BILL TO / SHIP TO */}
      <div className="bill-ship-row">
        <div className="bill-block">
          <h3 className="t3-heading">Bill To</h3>
          <p className="bold">{invoiceData.billingName}</p>
          <p>{invoiceData.billingAddress}</p>
          <p>{invoiceData.billingPhone}</p>
        </div>

        <div className="ship-block">
          <h3 className="t3-heading">Ship To</h3>
          <p className="bold">{invoiceData.shippingName}</p>
          <p>{invoiceData.shippingAddress}</p>
          <p>{invoiceData.shippingPhone}</p>
        </div>
      </div>

      {/* TABLE */}
      <table className="t3-table">
        <thead>
          <tr>
            <th>Item / Description</th>
            <th className="center">Quantity</th>
            <th className="right">Rate</th>
            <th className="right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {invoiceData.items.map((item, idx) => (
            <tr key={idx}>
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

      {/* TOTALS */}
      <div className="totals-section">
        <div className="total-line">
          <span>Subtotal:</span>
          <span>₹{invoiceData.subtotal?.toFixed(2)}</span>
        </div>

        {invoiceData.tax > 0 && (
          <div className="total-line">
            <span>Tax ({invoiceData.tax}%):</span>
            <span>₹{invoiceData.taxAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="total-line bold">
          <span>Total:</span>
          <span>₹{invoiceData.total?.toFixed(2)}</span>
        </div>
      </div>

      {/* NOTES */}
      {invoiceData.notes && (
        <div className="notes-block">
          <h4>Notes:</h4>
          <p>{invoiceData.notes}</p>
        </div>
      )}
    </div>
  );
}
