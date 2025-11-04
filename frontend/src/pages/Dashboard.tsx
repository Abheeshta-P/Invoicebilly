import { getAllInvoices } from "@/service/InvoiceService";
import type { InvoiceResponseType } from "@/types";
import { formatDate } from "@/utils/formatInvoiceData";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Dashboard() {
  const [invoices, setInvoices] = useState<InvoiceResponseType[]>([]);
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getAllInvoices();
        setInvoices(response.data);
      } catch (err) {
        const error = err as Error;
        console.error("Error:", error);
        toast.error("Failed to load the invoice: " + error.message);
      }
    };
    fetchInvoices();
  }, []);
  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {/* Create New Invoice card */}
        <div className="col">
          <div className="card h-100 d-flex justify-content-center align-items-center border border-2 border-light shadow-sm cursor-pointer" style={{ minHeight: "270px" }}>
            <Plus size={48} />
            <p className="mt-3 fw-medium">Create New Invoice</p>
          </div>
        </div>

        {/* Render the existing invoices */}
        {invoices.map((invoice, idx: number) => (
          <div className="col" key={idx}>
            <div
              className="card h-100 shadow-sm cursor-pointer"
              style={{ minHeight: "270px" }}
            >
              {invoice.thumbnailURL && (
                <img
                  src={invoice.thumbnailURL}
                  alt="Invoice thumbnail"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h6 className="card-title mb-1">{invoice.title}</h6>
                <small className="text-muted">Last Updated {formatDate(invoice.createdAt)}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
