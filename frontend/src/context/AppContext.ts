import { createContext } from "react";
import type { IntialInvoiceDataType } from "@/types";
import type { TemplateKey } from "@/components/InvoicePreview";

export type AppContextType = {
  invoiceTitle: string;
  setInvoiceTitle: (title: string) => void;
  invoiceData: IntialInvoiceDataType;
  setInvoiceData: React.Dispatch<React.SetStateAction<IntialInvoiceDataType>>;
  selectedTemplate: TemplateKey;
  setSelectedTemplate: (template: TemplateKey) => void;
};

export const AppContext = createContext<AppContextType>({
  invoiceTitle: "New Invoice",
  setInvoiceTitle: () => {},
  invoiceData: {} as IntialInvoiceDataType,
  setInvoiceData: () => {},
  selectedTemplate: "template1",
  setSelectedTemplate: () => {},
});
