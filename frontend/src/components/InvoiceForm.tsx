import { useContext, useEffect } from "react";
import type { IntialInvoiceDataType, InvoiceItem } from "@/types";
import { AppContext } from "@/context/AppContext";
import ImageUploader from "@/components/ImageUploader";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

function InvoiceForm() {
  const { invoiceData, setInvoiceData } = useContext(AppContext);

  // Add new item
  const addItem = () => {
    setInvoiceData((prev) => {
      const lastItem = prev.items[prev.items.length - 1];

      // if no items yet, allow adding first one
      if (!lastItem) {
        return {
          ...prev,
          items: [
            ...prev.items,
            { name: "", quantity: 0, amount: 0, description: "", total: 0 },
          ],
        };
      }

      // validate only if lastItem exists
      if (
        !lastItem.name.trim() ||
        (lastItem.quantity ?? 0) <= 0 ||
        (lastItem.amount ?? 0) <= 0
      ) {
        toast.error("Please fill the current item details before adding a new one.");
        return prev;
      }

      return {
        ...prev,
        items: [
          ...prev.items,
          { name: "", quantity: 0, amount: 0, description: "", total: 0 },
        ],
      };
    });
  };

  // Remove item
  const removeItem = (index: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // Update single item
  const updateItem = <K extends keyof InvoiceItem>(
    index: number,
    field: K,
    value: InvoiceItem[K]
  ) => {
    setInvoiceData((prev) => {
      const items = prev.items.map((item, i) => {
        if (i !== index) return item;
        const updated = { ...item, [field]: value };

        if (field === "quantity" || field === "amount") {
          const quantity = Number(
            field === "quantity" ? value : item.quantity ?? 0
          );
          const amount = Number(field === "amount" ? value : item.amount ?? 0);

          updated.quantity = quantity;
          updated.amount = amount;
          updated.total = quantity * amount;
        }
        return updated;
      });
      return { ...prev, items };
    });
  };

  // Update nested section (company, billing, shipping, invoice)
  const updateNested = <K extends keyof IntialInvoiceDataType>(
    section: K,
    key: keyof IntialInvoiceDataType[K],
    value: string | number
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...((prev[section] as Record<string, string | number>) || {}),
        [key]: value,
      } as IntialInvoiceDataType[K],
    }));
  };

  // Copy billing → shipping
  const copyBillingToShipping = (checked: boolean) => {
    if (checked) {
      setInvoiceData((prev) => ({
        ...prev,
        shipping: { ...prev.billing },
      }));
    } else {
      setInvoiceData((prev) => ({
        ...prev,
        shipping: { name: "", phone: "", address: "" },
      }));
    }
  };

  // Totals
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );
  const taxAmount = (subtotal * Number(invoiceData.tax || 0)) / 100;
  const grandTotal = subtotal + taxAmount;

  useEffect(() => {
    if (!invoiceData.invoice.number) {
      const randomNumber = `INV-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;
      setInvoiceData((prev) => ({
        ...prev,
        invoice: { ...prev.invoice, number: randomNumber },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="invoiceform container py-4">
      {/* Company Logo */}
      <div className="mb-5">
        <h5>Company Logo</h5>
        <ImageUploader />
      </div>
      
      {/* Company Info */}
      <div className="mb-5">
        <h5>Your Company</h5>
        <div className="row g-3">
          {Object.entries(invoiceData.company).map(([key, value]) => (
            <div key={key} className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder={key}
                value={value as string}
                onChange={(e) =>
                  updateNested(
                    "company",
                    key as keyof typeof invoiceData.company,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Billing Info */}
      <div className="mb-5">
        <h5>Bill To</h5>
        <div className="row g-3">
          {Object.entries(invoiceData.billing).map(([key, value]) => (
            <div key={key} className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder={key}
                value={value as string}
                onChange={(e) =>
                  updateNested(
                    "billing",
                    key as keyof typeof invoiceData.billing,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Info */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Ship To</h5>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="sameAsBilling"
              onChange={(e) => copyBillingToShipping(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="sameAsBilling">
              Same as Billing
            </label>
          </div>
        </div>

        <div className="row g-3">
          {Object.entries(invoiceData.shipping).map(([key, value]) => (
            <div key={key} className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder={key}
                value={value as string}
                onChange={(e) =>
                  updateNested(
                    "shipping",
                    key as keyof typeof invoiceData.shipping,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Info */}
      <div className="mb-5">
        <h5>Invoice Info</h5>
        <div className="row g-3">
          {Object.entries(invoiceData.invoice).map(([key, value]) => (
            <div key={key} className="col-md-4">
              <input
                type={key === "number" ? "text" : "date"}
                className="form-control"
                placeholder={key}
                value={value as string}
                disabled={key === "number"}
                min={
                  key !== "number"
                    ? new Date().toISOString().split("T")[0]
                    : undefined
                }
                onChange={(e) =>
                  updateNested(
                    "invoice",
                    key as keyof typeof invoiceData.invoice,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="mb-5">
        <h5>Items</h5>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="card p-3 mb-3">
            <div className="row g-3 mb-2">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Qty"
                  value={item.quantity || ""}
                  onChange={(e) =>
                    updateItem(index, "quantity", Number(e.target.value))
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={item.amount || ""}
                  onChange={(e) =>
                    updateItem(index, "amount", Number(e.target.value))
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  readOnly
                  placeholder="Total"
                  disabled
                  value={item.total || ""}
                />
              </div>
            </div>

            <textarea
              rows={2}
              className="form-control"
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
            />

            {invoiceData.items.length > 1 && (
              <button
                className="btn btn-outline-danger mt-2"
                onClick={() => removeItem(index)}
                type="button"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}

        <button className="btn btn-primary" onClick={addItem} type="button">
          Add Item
        </button>
      </div>

      {/* Bank Account Info */}
      <div className="mb-5">
        <h5 className="mb-3">Bank Account Details</h5>
        <div className="row g-3">
          {Object.entries(invoiceData.account).map(([key, value]) => (
            <div key={key} className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder={
                  key === "name"
                    ? "Account Name"
                    : key === "number"
                    ? "Account Number"
                    : "Branch / IFSC Code"
                }
                value={value as string}
                onChange={(e) =>
                  updateNested(
                    "account",
                    key as keyof typeof invoiceData.account,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="mb-5">
        <h5>Totals</h5>
        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <label htmlFor="taxInput" className="m-0">
            Tax (%)
          </label>
          <input
            id="taxInput"
            type="number"
            className="form-control w-25 text-end"
            value={invoiceData.tax}
            min={0}
            onChange={(e) =>
              setInvoiceData((p) => ({ ...p, tax: Number(e.target.value) }))
            }
          />
        </div>
        <div className="d-flex justify-content-between fw-bold text-success mt-2">
          <span>Grand Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
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
            value={invoiceData.notes}
            onChange={(e) =>
              setInvoiceData((p) => ({ ...p, notes: e.target.value }))
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;
