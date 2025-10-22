import { assets } from "@/assets/assets";

type FeatureBlockProps = {
  imgSrc: string,
  alt: string,
  title: string,
  points: string[],
  reversed:boolean
}

function FeatureBlock({ imgSrc, alt, title, points, reversed }:FeatureBlockProps) {
  return (
    <div
      className={`row align-items-center py-5 mx-5 flex-column-reverse flex-lg-row${
        reversed ? " flex-lg-row-reverse" : ""
      }`}
    >
      <div className="col-12 col-lg-6 py-3 d-flex justify-content-center">
        <img
          src={imgSrc}
          alt={alt}
          className="img-fluid rounded shadow w-100"
          style={{ maxWidth: 480 }}
        />
      </div>
      <div className="col-12 col-lg-6 text-start">
        <h2 className="fw-bold display-6 mb-3">{title}</h2>
        <ul className="fs-6 text-secondary">
          {points.map((point, idx) => (
            <li className="mb-2" key={idx}>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    imgSrc: assets.feature1,
    alt: "Easy to fill invoice details",
    title: "Easy to fill invoice details",
    points: [
      "Curated list of templates from gallery.",
      "Add your logo and invoice details.",
      "Tailor fields to your needs.",
    ],
    reversed: false,
  },
  {
    imgSrc: assets.feature2,
    alt: "Beautiful Dashboard",
    title: "Beautiful Dashboard",
    points: [
      "View the previous invoices.",
      "Your saved invoices with thumbnail.",
      "Reuse one or more invoices.",
    ],
    reversed: true,
  },
  {
    imgSrc: assets.feature3,
    alt: "Invoice Preview with Action Buttons",
    title: "Invoice Preview with Action Buttons",
    points: [
      "Live preview.",
      "Switch between multiple invoices.",
      "One click to Save, Download and Delete invoices.",
    ],
    reversed: false,
  },
  {
    imgSrc: assets.feature4,
    alt: "Send invoices instantly",
    title: "Send invoices instantly",
    points: [
      "Send invoices instantly without leaving the application.",
      "One click to send invoices.",
      "Send unlimited invoices.",
    ],
    reversed: true,
  },
];


function FeaturesSection() {
  return (
    <section className="container">
      <h2 className="text-center fw-bold my-5 display-5">
        Why Choose Invoicebilly?
      </h2>
      {FEATURES.map((feature, idx) => (
        <FeatureBlock key={idx} {...feature} />
      ))}
    </section>
  );
}

export default FeaturesSection;