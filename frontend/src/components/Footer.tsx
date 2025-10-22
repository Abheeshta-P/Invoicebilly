function Footer() {
  return (
    <footer
      className="text-center text-black-50 fs-6"
      style={{ background: "#deebf9ff" }}
    >
      <p  className="py-2 my-0" style={{ opacity: 0.5}}>
        {" "}
        &copy; Invoicebilly {new Date().getFullYear()}.
      </p>
    </footer>
  );
}

export default Footer