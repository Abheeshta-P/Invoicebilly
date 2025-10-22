import StepCard from "./StepCard";

function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Enter Details",
      description:
        "Quickly fill in your client's information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.",
      bgColor: "#eaf1ff",
    },
    {
      number: "2",
      title: "Choose Template",
      description:
        "Browse our gallery of professionally designed templates. Pick one that matches your brand and style.",
      bgColor: "#eaf6f2",
    },
    {
      number: "3",
      title: "Preview Invoice",
      description:
        "See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.",
      bgColor: "#fff7e6",
    },
    {
      number: "4",
      title: "Download & Save",
      description:
        "Download your invoice as a PDF, send it directly via email, or save it for your records and future reference.",
      bgColor: "#eaf9ff",
    },
  ];

  return (
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-4 display-6">
        Get Started in <span className="text-primary">4 Simple Steps</span>
      </h2>
      <div className="row justify-content-center">
        {steps.map((step, idx) => (
          <StepCard key={idx} {...step} />
        ))}
      </div>
    </section>
  );
}
export default HowItWorks;