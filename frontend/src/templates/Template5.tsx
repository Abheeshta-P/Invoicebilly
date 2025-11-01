import type { FormattedInvoiceDataType } from "@/types";
import "./css/template5.css";

type TemplateProps = {
  invoiceData: FormattedInvoiceDataType;
};

export default function Template5({ invoiceData }: TemplateProps) {
  return (
    <div className="template5-container">
      {/* HEADER */}
      <div className="t5-header-row mb-5">
        <div className="t5-header-left">
          <h2 className="t5-invoice-heading">Invoice</h2>

          <p>
            <strong>Invoice No:</strong> {invoiceData.invoiceNumber}
          </p>
          <p>
            <strong>Invoice Date:</strong> {invoiceData.invoiceDate}
          </p>
          <p>
            <strong>Due Date:</strong> {invoiceData.paymentDate}
          </p>
        </div>

        <div className="t5-header-right">
          {invoiceData.logo && (
            <img src={invoiceData.logo} className="t5-logo" alt="logo" />
          )}

          <h2 className="t5-company-name">{invoiceData.companyName}</h2>
          <p>{invoiceData.companyAddress}</p>
          <p>{invoiceData.companyPhone}</p>
        </div>
      </div>

      {/* Billed By + Billed To */}
      <div className="t5-bill-row">
        <div className="t5-bill-box">
          <h3 className="t5-box-title">Billed To</h3>
          <p className="t5-bold">{invoiceData.billingName}</p>
          <p>{invoiceData.billingAddress}</p>
          <p>{invoiceData.billingPhone}</p>
        </div>
        <div className="t5-bill-box">
          <h3 className="t5-box-title">Shipped To</h3>
          <p className="t5-bold">{invoiceData.shippingName}</p>
          <p>{invoiceData.shippingAddress}</p>
          <p>{invoiceData.shippingPhone}</p>
        </div>
      </div>

      {/* ITEMS TABLE */}
      <table className="t5-table">
        <thead>
          <tr>
            <th>Item # / Description</th>
            <th className="center">Qty</th>
            <th className="right">Rate</th>
            <th className="right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {invoiceData.items.map((item, idx) => (
            <tr key={idx}>
              <td>
                {idx + 1}. {item.description}
              </td>
              <td className="center">{item.quantity}</td>
              <td className="right">₹{(item.amount ?? 0).toFixed(2)}</td>
              <td className="right">₹{(item.total ?? 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="t5-totals">
        <div className="t5-total-line">
          <span>Sub Total</span>
          <span>₹{invoiceData.subtotal.toFixed(2)}</span>
        </div>
        <div className="t5-total-line">
          <span>Tax</span>
          <span>₹{invoiceData.tax.toFixed(2)}</span>
        </div>
        <div className="t5-total-line t5-total-due">
          <span>Total Due</span>
          <span>₹{invoiceData.total.toFixed(2)}</span>
        </div>
      </div>

      {/* NOTES */}
      {invoiceData.notes && (
        <div className="t5-notes">
          <h3>Notes</h3>
          <p>{invoiceData.notes}</p>
        </div>
      )}

      <p className="t5-footer">Thanks for shopping with us.</p>
    </div>
  );
}
