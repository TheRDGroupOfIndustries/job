import CtaBanner from "@/components/user/CtaBanner";
import CareerInsights from "@/components/user/CareerInsights";
import Testimonials from "@/components/user/Testimonials";
import Footer from "@/components/user/Footer";
import HeroSection from "@/components/user/HeroSection";
import FeaturesSection from "@/components/user/FeaturesSection";
import StatsSection from "@/components/user/StatsSection";
import FeaturedJobsSection from "@/components/user/FeaturedJobsSection";
import Navbar from "@/components/user/NavBar";
import HowItWorks from "@/components/user/HowItWorks";
import FeaturedJobs from "@/components/user/FeaturedJobs";

export default function Home() {
  return (
      <main className="">
        <HeroSection/>
        <StatsSection/>
        <FeaturesSection />
        <FeaturedJobs/>
        <HowItWorks />
        <Testimonials />
        <CareerInsights />
        <CtaBanner />
      </main>
  );
}
