import CtaBanner from "@/components/user/CtaBanner";
import CareerInsights from "@/components/user/CareerInsights";
import Testimonials from "@/components/user/Testimonials";
import Footer from "@/components/user/Footer";
import HeroSection from "@/components/user/HeroSection";
import FeaturesSection from "@/components/user/FeaturesSection";
import StatsSection from "@/components/user/StatsSection";
import FeaturedJobsSection from "@/components/user/FeaturedJobsSection";
import Navbar from "@/components/user/NavBar";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="">
        <Navbar/>
        <HeroSection/>
        <StatsSection/>
        <FeaturesSection />
        <FeaturedJobsSection />
        <Testimonials />
        <CareerInsights />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
