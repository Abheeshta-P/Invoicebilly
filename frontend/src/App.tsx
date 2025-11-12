import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menubar from "./components/Menubar";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MainPage from "./pages/MainPage";
import PreviewPage from "./pages/PreviewPage";
import Footer from "./components/Footer";
import UserSyncHandler from "./components/UserSyncHandler";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
function App() {
  return (
    <BrowserRouter>
      <UserSyncHandler />
      <Menubar />
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<>
          <SignedIn><Dashboard /></SignedIn>
          <SignedOut><RedirectToSignIn /></SignedOut>
        </>} />
        <Route path="/generate" element={<>
          <SignedIn><PreviewPage /></SignedIn>
          <SignedOut><RedirectToSignIn /></SignedOut>
        </>} />
        <Route path="/preview" element={<>
          <SignedIn><MainPage /></SignedIn>
          <SignedOut><RedirectToSignIn /></SignedOut>
        </>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
