import { templates } from "@/assets/assets";
import InvoicePreview, { type TemplateKey } from "@/components/InvoicePreview";
import { AppContext } from "@/context/AppContext";
import { uploadInvoiceThumbnail } from "@/service/CloudinarySerivice";
import { deleteInvoice, saveInvoice, sendInvoice } from "@/service/InvoiceService";
import { generatePdfFromElement } from "@/utils/pdfUtils";
import { useAuth, useUser } from "@clerk/clerk-react";
import html2canvas from "html2canvas";
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PreviewPage() {
  const { selectedTemplate, invoiceData, setSelectedTemplate } =
    useContext(AppContext);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailing, setEmailing] = useState(false);
  const { getToken } = useAuth();
  const { user } = useUser();

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
        clerkId: user?.id,
        template: selectedTemplate,
      };

      const token = await getToken();
      const response = await saveInvoice(payload, token);

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

  const handleDelete = async () => {
    // If there's no ID, we can't delete
    if (!invoiceData.id) {
      toast.error("Cannot delete — invoice not yet saved!");
      return;
    }

    try {
      const token = await getToken();
      const response = await deleteInvoice(invoiceData.id, token);
      if (response.status === 204) {
        toast.success("Invoice deleted successfully");
        navigate("/dashboard");
      } else {
        toast.error("Unable to delete invoice");
      }
    } catch (err) {
      const error = err as Error;
      toast.error("Failed to delete invoice: " + error.message);
    }
  };

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    try {
      setDownloading(true)
      await generatePdfFromElement(previewRef.current, `${invoiceData.title}-invoice_${Date.now()}.pdf`)
    } catch (err) {
      const error = err as Error
      toast.error("Failed to generate invoice" + error.message)
    } finally {
      setDownloading(false)
    }
  };

  const handleSendEmail = async () => {
    if (!previewRef.current || !customerEmail) {
      return toast.error("Please enter a valid email and try again!")
    }
    try {
      // start emailing
      setEmailing(true);
      const pdfBlob = await generatePdfFromElement(previewRef.current, `${invoiceData.title}-invoice_${Date.now()}.pdf`, true);

      if (!pdfBlob) {
        toast.error("Could not generate the pdf. Try again later!");
        return;
      }

      //send that blob pdf to mail in backend
      const formData = new FormData();
      formData.append("file", pdfBlob, `${invoiceData.title}-invoice_${Date.now()}.pdf`);
      formData.append("email", customerEmail);

      const token = await getToken();
      const response = await sendInvoice(formData, token);
      if (response.status === 200) {
        toast.success("Email sent successfully!");
        setShowModal(false);
        setCustomerEmail("");
      } else {
        toast.error("Failed to send email.");
      }
    } catch (err) {
      const error = err as Error;
      toast.error("Failed to send the email" + error.message);
    } finally {
      setEmailing(false);
    }
  }

  useEffect(() => {
    if (!invoiceData || !invoiceData.items?.length) {
      toast.error("Invoice data is empty.")
      navigate("/dashboard");
    }
  }, [invoiceData, navigate])

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
                className={`btn btn-sm rounded-pill p-2 ${selectedTemplate === id
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
          {invoiceData.id && (
            <button className="btn btn-md btn-danger" onClick={handleDelete}>
              Delete Invoice
            </button>
          )}
          <button
            className="btn btn-md btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
          <button className="btn btn-md btn-info" onClick={() => {
            setShowModal(true)
          }}>Send Email</button>
          <button
            className="btn btn-md btn-success d-flex align-items-center justify-content-center"
            onClick={handleDownloadPdf}
            disabled={downloading}
          >
            {downloading && <Loader2 className="me-2 spin-animation" size={18} />}
            {downloading ? "Downloading..." : "Download PDF"}
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

      {/* modal */}
      {showModal && (
        <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Invoice</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input type="email" name="email" id="email" className="form-control" placeholder="Customer email" onChange={(e) => setCustomerEmail(e.target.value)} value={customerEmail} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSendEmail} disabled={emailing}>
                  {emailing ? "Sending..." : "Send"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreviewPage;
