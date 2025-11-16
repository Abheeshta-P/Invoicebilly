import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section
      className="container-fluid d-flex flex-column justify-content-center align-items-center text-center px-3"
      style={{ minHeight: "80vh", background: "#fafbfc" }}
    >
      <div className="mb-4"></div>
      <h1 className="display-3 display-md-2 fw-bold mb-3">
        Effortless Invoicing,
        <br /> Professional Results.
      </h1>
      <h2 className="mb-4 text-secondary">Stop wrestling with spreadsheets.</h2>
      <p
        className="lead mb-4 text-body mx-auto fs-5"
        style={{ maxWidth: "580px" }}
      >
        Invoicebilly helps you create and send beautiful invoices in minutes, so
        you get paid faster.
      </p>
      <button className="btn btn-primary btn-md mb-5 px-4 py-2" onClick={()=>navigate("/generate")}>
        Generate Invoice
      </button>
    </section>
  );
}
export default HeroSection;
