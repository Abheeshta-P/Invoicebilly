function CTASection() {
  return (
    <section
      className="container-fluid py-5 mt-5 d-flex flex-column justify-content-center align-items-center text-center px-3"
      style={{ background: "#deebf9ff", minHeight: "40vh" }}
    >
      <h2 className="fw-bold display-4 mb-3">
        Ready to Streamline Your Invoicing?
      </h2>
      <p className="lead text-secondary mx-5 mb-4 fs-6">
        Join thousands of freelancers and small businesses who always trust
        Invoicebilly. Start creating professional invoices today – its fast,
        easy, and effective!
      </p>
      <button
        className="btn btn-primary btn-md fw-bold px-4"
        style={{ borderRadius: "2rem" }}
      >
        Generate Invoice
      </button>

      <small className="text-white-50 fs-6">
        (This will lead to the invoice generation interface)
      </small>
    </section>
  );
}

export default CTASection;
