type StepCardProps = {
  number: string;
  title: string;
  description: string;
  bgColor: string;
};

function StepCard({ number, title, description, bgColor }: StepCardProps) {
  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
      <div
        className="shadow-sm rounded-3 p-4 h-100 d-flex flex-column align-items-center"
        style={{ background: bgColor }}
      >
        <div
          className="rounded-circle d-flex justify-content-center align-items-center mb-3"
          style={{
            width: "80px",
            height: "80px",
            background: "#01406e",
            color: "#fff",
            fontSize: "2.5rem",
            fontWeight: "700",
          }}
        >
          {number}
        </div>
        <h5 className="fw-bold mb-2 text-center">{title}</h5>
        <p className="text-secondary text-center fs-6 m-0">{description}</p>
      </div>
    </div>
  );
}

export default StepCard;