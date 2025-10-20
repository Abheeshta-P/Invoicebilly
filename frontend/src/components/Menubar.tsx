import { Link } from "react-router-dom";
import Logo from "./Logo";

function Menubar() {
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
            <li className="nav-item"><Link className="nav-link fw-medium" to={"/dasboard"}>Dashboard</Link></li>
            <li className="nav-item"><button className="nav-link fw-medium">Generate</button></li>
            <li className="nav-item"><button className="btn btn-primary rounded-pill px-4">Login/Signup</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menubar;
