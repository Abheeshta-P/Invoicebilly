import { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import { intialInvoiceData } from "@/const";
import type { TemplateKey } from "@/components/InvoicePreview";

type AppContextProviderProps = {
  children: ReactNode;
};

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
  const [invoiceData, setInvoiceData] = useState(intialInvoiceData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>("template1");

  const contextValue = {
    invoiceTitle,
    setInvoiceTitle,
    invoiceData,
    setInvoiceData,
    selectedTemplate,
    setSelectedTemplate,
    intialInvoiceData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
