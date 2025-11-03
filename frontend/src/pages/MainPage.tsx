import InvoiceForm from "@/components/InvoiceForm";
import type { TemplateKey } from "@/components/InvoicePreview";
import TemplateGrid from "@/components/TemplateGrid";
import { AppContext } from "@/context/AppContext";
import { Pencil } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { invoiceTitle, invoiceData, setInvoiceTitle, setInvoiceData, setSelectedTemplate } = useContext(AppContext);
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setInvoiceTitle(newTitle);
    setInvoiceData((prev) => ({
      ...prev,
      title:newTitle
    }))
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const validateInvoiceData = () => {
    const data = invoiceData;

    // Helper to check if all fields in an object are non-empty
    const allFieldsFilled = (obj: Record<string, unknown>) =>
      Object.values(obj).every(
        (v) => v !== "" && v !== null && v !== undefined
      );

    if (!allFieldsFilled(data.company)) {
      toast.error("Please fill all company details.");
      return false;
    }
    if (!allFieldsFilled(data.billing)) {
      toast.error("Please fill all billing details.");
      return false;
    }
    if (!allFieldsFilled(data.shipping)) {
      toast.error("Please fill all shipping details.");
      return false;
    }
    if (!allFieldsFilled(data.account)) {
      toast.error("Please fill all bank account details.");
      return false;
    }
    if (!allFieldsFilled(data.invoice)) {
      toast.error("Please complete invoice details.");
      return false;
    }
    if (!data.logo) {
      toast.error("Please add logo.");
      return false;
    }

    // Validate items
    if (!data.items.length) {
      toast.error("Please add at least one item.");
      return false;
    }

    const invalidItem = data.items.find(
      (item) => !item.name.trim() || (item.quantity!= undefined && item.quantity <= 0) || (item.amount!=undefined && item.amount <= 0)
    );
    if (invalidItem) {
      toast.error("Please fill all item details correctly.");
      return false;
    }

    // Tax optional, but can check if invalid
    if (isNaN(Number(data.tax))) {
      toast.error("Please enter a valid tax value.");
      return false;
    }

    return true; // ✅ All validations passed
  };

  const handleTemplateClick = (id: TemplateKey): void => {
    if (!validateInvoiceData()) return; // stop if invalid

    setSelectedTemplate(id);
    toast.success(`${id} selected successfully!`);
    navigate("/preview");
  };

  

  return (
    <div className="mainpage container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        {/* Title bar */}
        <div className="bg-white border rounded shadow-sm p-3 mb-4">
          <div className="d-flex align-items-center justify-content-between">
            {isEditingTitle ? (
              <input
                type="text"
                className="form-control me-2"
                autoFocus
                onBlur={handleTitleBlur}
                onChange={handleTitleChange}
                value={invoiceTitle}
              />
            ) : (
              <>
                <h5 className="mb-0 me-2">{invoiceTitle}</h5>
                <button
                  className="btn btn-sm p-0 border-0 bg-transparent"
                  onClick={handleTitleEdit}
                >
                  <Pencil className="text-primary" size={20} />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-6 d-flex">
            <div className="bg-white border rounded shadow-sm p-4 w-100">
              <InvoiceForm />
            </div>
          </div>
          <div className="col-12 col-lg-6 d-flex">
            <div className="bg-white border rounded shadow-sm p-4 w-100">
              <TemplateGrid ontemplateClick={handleTemplateClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
