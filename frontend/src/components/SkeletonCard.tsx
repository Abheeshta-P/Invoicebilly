export default function SkeletonCard() {
  return (
    <div
      className="card h-100 shadow-sm"
      style={{ minHeight: "270px", backgroundColor: "#f1f1f1" }}
    >
      <div className="placeholder-glow">
        <div
          className="card-img-top placeholder"
          style={{ height: "200px", backgroundColor: "#b4b4b4ff" }}
        ></div>
        <div className="card-body d-flex flex-column justify-content-center">
          <h6 className="card-title placeholder col-6"></h6>
          <p className="card-text placeholder col-4"></p>
        </div>
      </div>
    </div>
  );
}
