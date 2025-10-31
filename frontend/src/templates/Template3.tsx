import type { FormattedInvoiceDataType } from "@/types";

type TemplateProps = {
  invoiceData: FormattedInvoiceDataType;
};

function Template3({ invoiceData }: TemplateProps) {
  return <div>Template3 {invoiceData.companyName}</div>;
}

export default Template3;
