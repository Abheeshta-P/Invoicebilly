import CTASection from "@/components/LandingPage/CTASection";
import FeaturesSection from "@/components/LandingPage/FeaturesSection";
import HeroSection from "@/components/LandingPage/HeroSection";
import HowItWorks from "@/components/LandingPage/HowItWorks";

function LandingPage() {
  return (
    <>
      <HeroSection/>
      <HowItWorks />
      <FeaturesSection />
      <CTASection/>
    </>
  );
}
export default LandingPage;
