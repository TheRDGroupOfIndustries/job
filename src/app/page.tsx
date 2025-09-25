import CtaBanner from "@/components/user/CtaBanner";
import CareerInsights from "@/components/user/CareerInsights";
import Testimonials from "@/components/user/Testimonials";
import Footer from "@/components/user/Footer";
import Image from "next/image";
import HowItWorks from "@/components/user/HowItWorks";
import FeaturedJobs from "@/components/user/FeaturedJobs";

export default function Home() {
  return (
    <>
      <main className="">
        <FeaturedJobs/>
        <HowItWorks />
        <Testimonials />
        <CareerInsights />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
