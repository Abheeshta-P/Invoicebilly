import SkeletonCard from "@/components/SkeletonCard";
import { intialInvoiceData } from "@/const";
import { AppContext } from "@/context/AppContext";
import { getAllInvoices } from "@/service/InvoiceService";
import type { InvoiceResponseType } from "@/types";
import { formatDate, mapInvoiceResponseToInitialData } from "@/utils/formatInvoiceData";
import { Loader2, Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [invoices, setInvoices] = useState<InvoiceResponseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setInvoiceData, setSelectedTemplate, setInvoiceTitle } =
    useContext(AppContext);

  const handleViewClick = (invoice: InvoiceResponseType) => {
    setInvoiceData(mapInvoiceResponseToInitialData(invoice));
    setSelectedTemplate(invoice.template || "template1");
    setInvoiceTitle(invoice.title || "New Invoice");
    navigate("/preview")
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true);
        const response = await getAllInvoices();
        setInvoices(response.data);
      } catch (err) {
        const error = err as Error;
        console.error("Error:", error);
        toast.error("Failed to load invoices: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const handleCreateNew = ()=>{
    if (isLoading) {
      toast("Please wait, still loading invoices...");
      return;
    }
    
    //reset intial state from context
    setInvoiceTitle("New Invoice");
    setSelectedTemplate("template1")
    setInvoiceData(intialInvoiceData)
    navigate("/generate");
  }

  return (
    <div className="container py-5 min-vh-100">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {/* Create New Invoice card */}
        <div className="col">
          <div
            className={`card h-100 d-flex justify-content-center align-items-center border border-2 border-light shadow-sm ${
              isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            style={{ minHeight: "270px" }}
            onClick={handleCreateNew}
          >
            <Plus size={48} />
            <p className="mt-3 fw-medium">
              {isLoading ? (
                <Loader2 className="me-2 spin-animation" size={18} />
              ) : (
                "Create New Invoice"
              )}
            </p>
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading &&
          Array.from({ length: invoices.length || 4 }).map((_, i) => (
            <div className="col" key={i}>
              <SkeletonCard />
            </div>
          ))}

        {/* No invoices message */}
        {!isLoading && invoices.length === 0 && (
          <div className="col-12 text-center mt-5">
            <p className="text-muted fs-5">No invoices found.</p>
          </div>
        )}

        {/* Render actual invoices */}
        {!isLoading &&
          invoices.map((invoice, idx: number) => (
            <div className="col" key={idx}>
              <div
                className="card h-100 shadow-sm cursor-pointer"
                style={{ minHeight: "270px" }}
                onClick={()=> handleViewClick(invoice)}
              >
                {invoice.thumbnailURL ? (
                  <img
                    src={invoice.thumbnailURL}
                    alt="Invoice thumbnail"
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="card-img-top d-flex justify-content-center align-items-center bg-light text-muted"
                    style={{ height: "200px", objectFit: "cover" }}
                  >
                    <span>No Thumbnail</span>
                  </div>
                )}

                <div className="card-body">
                  <h6 className="card-title mb-1">{invoice.title}</h6>
                  <small className="text-muted">
                    Last Updated {formatDate(invoice.lastUpdatedAt)}
                  </small>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
