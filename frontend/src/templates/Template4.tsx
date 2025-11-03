import type { FormattedInvoiceDataType } from "@/types";
import "./css/template4.css";

type TemplateProps = {
  invoiceData: FormattedInvoiceDataType;
};

export default function Template4({ invoiceData }: TemplateProps) {
  return (
    <div className="template4-container">
      {/* HEADER */}
      <div className="header-row">
        {/* LEFT - Company Info */}
        <div className="header-left">
          {invoiceData.logo && (
            <img src={invoiceData.logo} alt="Logo" className="t4-logo" />
          )}
          <h2 className="company-name-blue">{invoiceData.companyName}</h2>
          <div className="header-text">{invoiceData.companyAddress}</div>
          <div className="header-text">{invoiceData.companyPhone}</div>
        </div>

        {/* RIGHT - Invoice details */}
        <div className="header-right">
          <div className="invoice-title">Invoice</div>
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
      </div>

      {/* BILL TO + SHIP TO */}
      <div className="bill-ship-row">
        <div className="bill-block">
          <div className="block-title">Billed To</div>
          <p className="bold">{invoiceData.billingName}</p>
          <p className="subtext">{invoiceData.billingAddress}</p>
          <p className="subtext">{invoiceData.billingPhone}</p>
        </div>

        <div className="ship-block">
          <div className="block-title">Ship To</div>
          <p className="bold">{invoiceData.shippingName}</p>
          <p className="subtext">{invoiceData.shippingAddress}</p>
          <p className="subtext">{invoiceData.shippingPhone}</p>
        </div>
      </div>

      {/* ITEMS TABLE */}
      <table className="t4-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Description</th>
            <th className="center">Quantity</th>
            <th className="right">Rate</th>
            <th className="right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {invoiceData.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td className="center">{item.quantity}</td>
              <td className="right">₹{(item.amount??0).toFixed(2)}</td>
              <td className="right">₹{(item.total??0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="total-section">
        <div className="total-line">
          <span>Sub Total</span>
          <span>₹{invoiceData.subtotal.toFixed(2)}</span>
        </div>
        <div className="total-line">
          <span>Tax</span>
          <span>₹{invoiceData.tax.toFixed(2)}</span>
        </div>
        <div className="total-line bold">
          <span>Total Due Amount</span>
          <span>₹{invoiceData.total.toFixed(2)}</span>
        </div>
      </div>

      {/* NOTES */}
      {invoiceData.notes && (
        <div className="notes-box">
          <strong>Notes:</strong>
          <p>{invoiceData.notes}</p>
        </div>
      )}

      <div className="footer-text">Thanks for shopping with us.</div>
    </div>
  );
}
