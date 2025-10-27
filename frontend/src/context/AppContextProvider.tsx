import { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";

type AppContextProviderProps = {
  children: ReactNode;
}; 

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");

  const contextValue = {
    invoiceTitle, setInvoiceTitle
  }
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

