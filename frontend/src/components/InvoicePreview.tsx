import type { IntialInvoiceDataType } from "@/types";
import { formatInvoiceData } from "@/utils/formatInvoiceData";
import React, { forwardRef } from "react";
import Template1 from "@/templates/Template1";
import Template2 from "@/templates/Template2";
import Template3 from "@/templates/Template3";
import Template4 from "@/templates/Template4";
import Template5 from "@/templates/Template5";

const templateMap = {
  "template1": Template1,
  "template2": Template2,
  "template3": Template3,
  "template4": Template4,
  "template5": Template5,
} as const;

type TemplateMap = typeof templateMap;
export type TemplateKey = keyof TemplateMap;

type InvoicePreviewProps = {
  invoiceData: IntialInvoiceDataType;
  template: TemplateKey;
};

function InvoicePreview(
  { invoiceData, template }: InvoicePreviewProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const formattedData = formatInvoiceData(invoiceData);

  const SelectedTemplate = templateMap[template] || Template1;

  return (
    <div
      ref={ref}
      className="invoice-preview container px-2 py-2 overflow-x-auto"
    >
      <SelectedTemplate invoiceData={formattedData} />
    </div>
  );
}

export default forwardRef<HTMLDivElement, InvoicePreviewProps>(
  InvoicePreview
);
