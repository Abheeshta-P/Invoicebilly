import { templates } from "@/assets/assets";
import type { TemplateKey } from "./InvoicePreview";

function TemplateGrid({ontemplateClick}:{ontemplateClick: (id:TemplateKey)=>void}) {
  return (
    <div className="row g-3">
      {templates.map(
        ({
          id,
          label,
          image,
        }: {
          id: TemplateKey,
          label: string,
          image: string,
        }) => (
          <div className="col-12 col-sm-6 col-lg-4" key={id}>
            <div
              className="border rounded shadow-sm overflow-hidden template-hover cursor-pointer"
              title={label}
              onClick={() => ontemplateClick(id)}
            >
              <img src={image} alt={label} className="w-100" loading="lazy" />
            </div>
            <div className="p-2 text-center fw-medium">{label}</div>
          </div>
        )
      )}
    </div>
  );
}

export default TemplateGrid