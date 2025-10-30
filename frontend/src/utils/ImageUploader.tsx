import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

function ImageUploader() {
  const { invoiceData, setInvoiceData } = useContext(AppContext);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setInvoiceData((prev) => ({
          ...prev,
          logo: base64, // store Base64 image globally
        }));
      };
      reader.readAsDataURL(file);
    },
    [setInvoiceData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const removeLogo = () => {
    setInvoiceData((prev) => ({
      ...prev,
      logo: "", // clear uploaded logo
    }));
  };

  return (
    <div className="mt-4 text-center">
      {invoiceData.logo ? (
        <div className="position-relative d-inline-block">
          <img
            src={invoiceData.logo}
            alt="Company Logo"
            className="img-fluid rounded-3 shadow-sm"
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              objectFit: "cover",
            }}
          />
          <button
            type="button"
            className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-1"
            onClick={removeLogo}
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border border-2 border-dashed p-5 rounded-3 cursor-pointer ${
            isDragActive ? "bg-light border-primary" : "border-secondary"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p className="text-black-50 mb-0">
              Drag & drop an image here, or click to select one
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;