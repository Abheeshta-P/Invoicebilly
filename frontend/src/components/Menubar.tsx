import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { intialInvoiceData } from "@/const";

function Menubar() {
  const { openSignIn } = useClerk();
  const { setInvoiceData, setSelectedTemplate, setInvoiceTitle } = useContext(AppContext);

  const navigate = useNavigate();

  const openLogin = () => {
    openSignIn({});
  }

  const handleGenerateClick = () => {
    // reset context
    setInvoiceData(intialInvoiceData);
    setSelectedTemplate("template1");
    setInvoiceTitle("New Invoice");
    navigate("/generate");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to={"/"}>
          <Logo />
          <span
            className="fw-bolder fs-4 mx-3"
            style={{ letterSpacing: "-0.5px", color: "#00254a" }}
          >
            Invoicebilly
          </span>
        </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><Link className="nav-link fw-medium" to={"/"}>Home</Link></li>
            <SignedIn>
              <li className="nav-item"><Link className="nav-link fw-medium" to={"/dashboard"}>Dashboard</Link></li>
              <li className="nav-item me-4"><button className="nav-link fw-medium" onClick={handleGenerateClick}>Generate</button></li>
              <UserButton/>
            </SignedIn>
            <SignedOut>
              <li className="nav-item ms-4"><button className="btn btn-primary rounded-pill px-4" onClick={openLogin}>Login/Signup</button></li>
            </SignedOut>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menubar;
