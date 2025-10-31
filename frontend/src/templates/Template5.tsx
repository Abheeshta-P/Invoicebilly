import type { FormattedInvoiceDataType } from "@/types";

type TemplateProps = {
  invoiceData: FormattedInvoiceDataType;
};

function Template5({ invoiceData }: TemplateProps) {
  return <div>Template5 {invoiceData.companyName}</div>;
}

export default Template5;
