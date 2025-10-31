import type { FormattedInvoiceDataType } from "@/types";

type TemplateProps = {
  invoiceData: FormattedInvoiceDataType;
};

function Template4({ invoiceData }: TemplateProps) {
  return <div>Template4 {invoiceData.companyName}</div>;
}

export default Template4;
