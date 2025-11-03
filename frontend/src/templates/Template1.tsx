import type { FormattedInvoiceDataType } from "@/types";
import "./css/template1.css"

type TemplateProps = {
  invoiceData: FormattedInvoiceDataType;
};

function Template1({ invoiceData }: TemplateProps ) {
  return (
    <div className="template1 border rounded mx-auto my-4 px-sm-4 py-3 w-100">
      {/* header section */}
      <div className="d-flex justify-content-around mb-4">
        {invoiceData.logo && (
          <img
            src={invoiceData.logo}
            className="company-logo mb-2"
            alt="logo"
          />
        )}
        <div className="mb-3 mb-md-0">
          <h2 className="mb-1 company-title">{invoiceData.companyName}</h2>
          <p className="mb-1">{invoiceData.companyAddress}</p>
          <p className="mb-0">Phone: {invoiceData.companyPhone}</p>
        </div>

        <div className="col-md-6 text-start text-md-end">
          <h1 className="mb-2 invoice-title">Invoice</h1>
          <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2 gap-md-4">
            <div className="w-100 w-md-50 mb-3 mb-md-0">
              <p className="mb-1">
                <strong>Invoice:</strong> {invoiceData.invoiceNumber}
              </p>
              <p className="mb-1">
                <strong>Invoice Date:</strong> {invoiceData.invoiceDate}
              </p>
              <p className="mb-1">
                <strong>Due Date:</strong> {invoiceData.paymentDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-3 orange-border" />

      {/* billing section */}
      <div className="row g-3 mb-4">
        {invoiceData.shippingName &&
          invoiceData.shippingPhone &&
          invoiceData.shippingAddress && (
            <div className="col-md-6">
              <div className="p-3 rounded h-100 billing-box">
                <h3 className="mb-2 billing-title">Shipped To</h3>

                <p className="mb-1">
                  <strong>{invoiceData.shippingName}</strong>
                </p>

                <p className="mb-1">{invoiceData.shippingAddress}</p>
                <p className="mb-0">Phone: {invoiceData.shippingPhone}</p>
              </div>
            </div>
          )}

        <div className="col-md-6">
          <div className="p-3 rounded h-100 billing-box">
            <h3 className="mb-2 billing-title">Billed To</h3>

            <p className="mb-1">
              <strong>{invoiceData.billingName}</strong>
            </p>

            <p className="mb-1">{invoiceData.billingAddress}</p>
            <p className="mb-0">Phone: {invoiceData.billingPhone}</p>
          </div>
        </div>
      </div>

      {/* items section */}
      <div className="mb-4">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="p-2 table-header">Item # / Item description</th>
                <th className="p-2 text-center table-header">Qty.</th>
                <th className="p-2 text-end table-header">Rate</th>
                <th className="p-2 text-end table-header">Amount</th>
              </tr>
            </thead>

            <tbody>
              {invoiceData.items.map((item) => (
                <tr>
                  <td className="p-2">{item.name} -&gt; {item.description}</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-end">{item.amount?.toFixed(2)}</td>
                  <td className="p-2 text-end">
                    {((item.quantity ?? 0) * (item.amount ?? 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* totals section */}
      <div className="d-flex justify-content-center gap-5 mb-4">
        <div className="d-flex justify-content-end">
          <div className="p-3 w-100 totals-box" style={{ maxWidth: "300px" }}>
            <span>Sub Total: </span>
            <span>₹{(invoiceData.subtotal ?? 0).toFixed(2)}</span>
          </div>
          {invoiceData.tax > 0 && (
            <div className="d-flex justify-content-between mb-2">
              <span>Tax ({invoiceData.tax}%):</span>
              <span>₹{invoiceData.taxAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="d-flex gap-2 justify-content-between align-items-center fw-bold total-highlight">
            <span>Total: </span>
            <span>{(invoiceData.total ?? 0).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Bank account section */}
      {(invoiceData.accountName ||
        invoiceData.accountNumber ||
        invoiceData.accountIFSCCode) && (
        <div className="mt-4">
          <h3 className="mb-2 billing-title">Bank Account Details</h3>

          {invoiceData.accountName && (
            <p className="mb-1">
              <strong>Account Holder: </strong> {invoiceData.accountName}
            </p>
          )}

          {invoiceData.accountNumber && (
            <p className="mb-1">
              <strong>Account Number: </strong> {invoiceData.accountNumber}
            </p>
          )}

          {invoiceData.accountIFSCCode && (
            <p className="mb-0">
              <strong>Ifsc/Branch Code: </strong> {invoiceData.accountIFSCCode}
            </p>
          )}
        </div>
      )}

      {/* Notes section */}
      {invoiceData.notes && (
        <div className="mt-4">
          <h3 className="mb-2 billing-title">Remarks</h3>
          <p className="mb-0">{invoiceData.notes}</p>
        </div>
      )}
    </div>
  );
}

export default Template1;
