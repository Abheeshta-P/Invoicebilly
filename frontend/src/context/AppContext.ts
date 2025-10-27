import { createContext } from "react";

type AppContextType = {
  invoiceTitle: string;
  setInvoiceTitle: (title: string) => void;
};

export const AppContext = createContext<AppContextType>({
  invoiceTitle: "New Invoice",
  setInvoiceTitle: () => {},
});
