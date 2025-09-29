"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Lightbulb,
  Star,
  Heart,
  Users,
  TrendingUp,
} from "lucide-react";

// NOTE: Handshake is no longer imported as the image replaces the icon/text placeholder

const About = () => {
  const router = useRouter();
  const coreValues = [
    {
      title: "Integrity",
      description: "We uphold transparent and ethical practices in every interaction.",
      icon: CheckCircle,
    },
    {
      title: "Innovation",
      description: "Continuously leveraging technology to create cutting-edge HR solutions.",
      icon: Lightbulb,
    },
    {
      title: "Excellence",
      description: "Our commitment is to deliver nothing less than exceptional service quality.",
      icon: Star,
    },
    {
      title: "Empathy",
      description: "Understanding and prioritizing the human element in all resource management.",
      icon: Heart,
    },
    {
      title: "Collaboration",
      description: "Building strong partnerships with clients for mutual growth and success.",
      icon: Users,
    },
    {
      title: "Growth",
      description: "Dedicated to fostering both professional and organizational development.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* =====================================================
        01. Hero Section (Clean, Bold Header with Orange Stripe)
        ===================================================== */}
      <section
        className="relative pt-14 py-24 md:pt-20 md:py-36 bg-gray-50 overflow-hidden text-gray-900"
      >
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg font-medium mb-3 uppercase tracking-widest text-orange-600">
              The Foundation of Alpran HR
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Our <span className="text-orange-600">Story</span>
            </h1>
            <p className="text-base md:text-lg font-normal max-w-3xl mx-auto text-gray-700">
              <strong>Transforming</strong> the HR landscape through dedicated partnership and human-centered innovation.
            </p>
          </div>
        </div>
      </section>

      {/* ---
        =====================================================
        02. Our Story Section (Clean Split Layout with Stats Box)
        ===================================================== 
      */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Story Content */}
            <div>
              <p className="text-sm font-semibold text-orange-600 mb-2 uppercase tracking-widest">
                Pioneering Excellence
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
                A Vision for <span className="text-orange-600">Better HR</span>
              </h2>
              <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
                <p>
                  Founded with a vision to <strong>simplify and humanize</strong> complex HR processes, Alpran HR Services began as a small team determined to make a significant impact. Our focus was simple: empower businesses by <strong>elevating their employee experience.</strong>
                </p>
                <p>
                  Today, we are a comprehensive HR partner, trusted for our <strong>deep expertise and future-forward approach</strong>. We integrate strategic consultancy with cutting-edge technology, ensuring our clients don't just manage HR—they <strong>master talent</strong>.
                </p>
              </div>

              {/* Contact Button */}
              <Button
                className="mt-12 bg-orange-600 text-white shadow-xl hover:bg-orange-700
                           px-10 py-7 text-lg font-bold rounded-lg 
                           transition-colors duration-300"
                onClick={() => router.push("/contact")}
              >
                Contact Our Experts
              </Button>
            </div>

            {/* Stats Box and Visual */}
            <div className="flex flex-col gap-8">
              
              {/* Visual Placeholder - USING YOUR IMAGE FROM PUBLIC FOLDER */}
              <div className="relative h-64 rounded-xl overflow-hidden shadow-xl border border-gray-200">
                <img
                  // The path to your image in the public folder. Double-check capitalization!
                  src={"/img.jpg"} 
                  alt="Team Collaboration"
                  className="w-full h-full object-cover" // Ensures the image covers the entire div
                />
              </div>
              
              {/* Stats Box */}
              <div
                className="bg-gray-100 p-10 rounded-xl shadow-lg w-full text-center 
                           border-t-4 border-orange-600"
              >
                <h3 className="text-8xl font-extrabold text-orange-600 tracking-tighter">
                  500+
                </h3>
                <p className="text-2xl font-bold text-gray-800 mt-4">
                  Global Clients Served
                </p>
                <p className="text-md text-gray-600 mt-2">
                  Trusted by organizations across diverse industries worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---
        =====================================================
        03. Core Values Section (Clean Card Grid with Strong Hover Effect)
        ===================================================== 
      */}
      <section className="py-24 md:py-32 bg-gray-100"> 
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Our Guiding <span className="text-orange-600">Principles</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              These six core values are the <strong>heart of our culture</strong> and the foundation of every client success story.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200"
                >
                  <CardContent className="p-8">
                    {/* Icon Styling: High-contrast orange circle */}
                    <div className="h-16 w-16 rounded-full flex items-center justify-center mb-6 
                                    bg-orange-600/10 group-hover:bg-orange-600 transition-colors">
                      <Icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---
        =====================================================
        04. Call to Action (Full-width, high-contrast banner with dual CTA)
        ===================================================== 
      */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Ready to <span className="text-orange-500">Master Your Talent</span> Strategy?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Book a free consultation today and discover how our tailored HR solutions can accelerate your organizational growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary CTA: Solid Orange */}
              <Button
                variant="default"
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-10 py-7 text-xl shadow-2xl rounded-lg"
                onClick={() => router.push("/contact")}
              >
                Get Started Today
              </Button>
              {/* Secondary CTA: Transparent/White border */}
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-10 py-7 text-xl rounded-lg"
              >
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;