import { templates } from "@/assets/assets";
import InvoicePreview, { type TemplateKey } from "@/components/InvoicePreview";
import { AppContext } from "@/context/AppContext";
import { uploadInvoiceThumbnail } from "@/service/CloudinarySerivice";
import { saveInvoice } from "@/service/InvoiceService";
import html2canvas from "html2canvas";
import { Loader2 } from "lucide-react";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PreviewPage() {
  const { selectedTemplate, invoiceData, setSelectedTemplate } =
    useContext(AppContext);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveAndExit = async () => {
    try {
      setLoading(true);
      // create thumbnail URL
      if (!previewRef.current) return;
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
        scrollY: -window.scrollY,
      });
      const imageData = canvas.toDataURL("image/png");
      const thumbnailURL = await uploadInvoiceThumbnail(imageData);
      const payload = {
        ...invoiceData,
        thumbnailURL,
        template: selectedTemplate,
      };

      const response = await saveInvoice(payload);

      if (response?.status === 200) {
        toast.success("Invoice saved successfully.");
        navigate("/dashboard");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      const error = err as Error;
      console.error("Error:", error);
      toast.error("Failed to save invoice: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="previewpage container-fluid d-flex flex-column p-3 min-vh-100">
      {/* action buttons */}
      <div className="d-flex flex-column align-items-center mb-4 gap-3">
        {/* list of template buttons */}
        <div className="d-flex gap-2 flex-wrap justify-content-center">
          {templates.map(
            ({ id, label }: { id: TemplateKey; label: string }) => (
              <button
                key={id}
                style={{ minWidth: "100px", height: "38px" }}
                onClick={() => setSelectedTemplate(id)}
                className={`btn btn-sm rounded-pill p-2 ${
                  selectedTemplate === id
                    ? "btn-warning"
                    : "btn-outline-secondary"
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>

        {/* list of action buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button
            className="btn btn-md btn-primary d-flex align-items-center justify-content-center"
            onClick={handleSaveAndExit}
            disabled={loading}
          >
            {loading && <Loader2 className="me-2 spin-animation" size={18} />}
            {loading ? "Saving..." : "Save and Exit"}
          </button>
          <button className="btn btn-md btn-danger">Delete Invoice</button>
          <button className="btn btn-md btn-secondary">
            Back to Dashboard
          </button>
          <button className="btn btn-md btn-info">Send Email</button>
          <button className="btn btn-md btn-success d-flex align-items-center justify-content-center">
            Download PDF
          </button>
        </div>
      </div>

      {/* Template display */}
      <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">
        <div ref={previewRef} className="invoice-preview">
          <InvoicePreview
            invoiceData={invoiceData}
            template={selectedTemplate}
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
