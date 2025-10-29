import { AppContext } from "@/context/AppContext";
import ImageUploader from "@/utils/ImageUploader"
import { Trash2 } from "lucide-react";
import { useContext } from "react";

function InvoiceForm() {
  const { invoieData, setInvoiceData } = useContext(AppContext);
  return (
    <div className="invoiceform container py-4">
      {/* logo */}
      <div className="mb-5">
        <h5>Comapny Logo</h5>
        <ImageUploader />
      </div>
      {/* info */}
      <div className="mb-5">
        <h5 className="mb-3">Your Company</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="Company name"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="Company phone"
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="Company address"
            />
          </div>
        </div>
      </div>
      {/* bill to */}
      <div className="mb-5">
        <h5 className="mb-3">Bill To</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="Phone"
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="Address"
            />
          </div>
        </div>
      </div>
      {/* ship to */}
      <div className="mb-5">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <h5>Ship To</h5>
          <div className="form-check">
            <input
              type="checkbox"
              name="sameAsBilling"
              id="sameAsBilling"
              className="form-check-input cursor-pointer"
            />
            <label htmlFor="sameAsBilling" className="form-check-label">
              Same As Billing
            </label>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="Phone"
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="Address"
            />
          </div>
        </div>
      </div>
      {/* invoice info */}
      <div className="mb-5">
        <h5 className="mb-3">Invoice Information</h5>
        <div className="row g-3">
          {/* Invoice Number */}
          <div className="col-md-4">
            <label htmlFor="invoiceNumber" className="form-label">
              Invoice Number
            </label>
            <input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              disabled
              className="form-control"
              placeholder="Invoice Number"
            />
          </div>

          {/* Invoice Date */}
          <div className="col-md-4">
            <label htmlFor="invoiceDate" className="form-label">
              Invoice Date
            </label>
            <input
              type="date"
              id="invoiceDate"
              name="invoiceDate"
              className="form-control"
            />
          </div>

          {/* Due Date */}
          <div className="col-md-4">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="form-control"
            />
          </div>
        </div>
      </div>
      {/* item details */}
      <div className="mb-5">
        <h5>Item Details</h5>
        {invoieData.items.map((_item, _index) => (
          <div className="card p-3 mb-3">
            <div className="row g-3 mb-2">
              <div className="col md-3">
                <input
                  type="text"
                  className="form-control"
                  name=""
                  id=""
                  placeholder="Item Name"
                />
              </div>
              <div className="col md-3">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Quantity"
                  className="form-control"
                />
              </div>
              <div className="col md-3">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Amount"
                  className="form-control"
                />
              </div>
              <div className="col md-3">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Total"
                  className="form-control"
                />
              </div>
            </div>
            <div className="d-flex gap-2">
              <textarea
                className="form-control"
                placeholder="Description"
                name=""
                id=""
              ></textarea>
              {invoieData.items.length > 1 && (
                <button className="btn btn-outline-danger" type="button">
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
        <button className="btn btn-primary" type="button">
          Add Item
        </button>
      </div>
      {/* bank account info */}
      <div className="mb-5">
        <h5 className="mb-3">Bank Account Details</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Account Name"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Account Number"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Branch/IFSC Code"
            />
          </div>
        </div>
      </div>
      {/* totals */}
      <div className="mb-5">
        <h5>Totals</h5>
        <div className="d-flex justify-content-end">
          <div className="w-100 w-md-50">
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>&#8377;{1000.0}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="taxInput" className="me-2">
                Tax Rate(%)
              </label>
              <input
                type="number"
                name="taxInput"
                id="taxInput"
                className="form-control w-50 text-end"
                placeholder="2"
              />
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax Amout</span>
              <span>&#8377;{1000.0}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold mt-2 text-success">
              <span>Grand Total</span>
              <span>&#8377;{1000.0}</span>
            </div>
          </div>
        </div>
      </div>
      {/* notes */}
      <div className="mb-5">
        <h5>Notes: </h5>
        <div className="w-100">
          <textarea
            name="notes"
            id="notes"
            rows={3}
            className="form-control"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm