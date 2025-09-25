import CtaBanner from "@/components/user/CtaBanner";
import CareerInsights from "@/components/user/CareerInsights";
import Testimonials from "@/components/user/Testimonials";
import Footer from "@/components/user/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="">
        <Testimonials />
        <CareerInsights />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
