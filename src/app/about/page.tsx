"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Lightbulb,
  Star,
  Heart,
  Users,
  TrendingUp,
} from "lucide-react";

const About = () => {
  const router = useRouter();
  const coreValues = [
    {
      title: "Integrity",
      description: "We believe in transparent and ethical business practices.",
      icon: CheckCircle,
    },
    {
      title: "Innovation",
      description:
        "Constantly evolving to bring you cutting-edge HR solutions.",
      icon: Lightbulb,
    },
    {
      title: "Excellence",
      description: "Committed to delivering exceptional service quality.",
      icon: Star,
    },
    {
      title: "Empathy",
      description: "Understanding the human side of human resources.",
      icon: Heart,
    },
    {
      title: "Collaboration",
      description: "Working together with clients to achieve shared success.",
      icon: Users,
    },
    {
      title: "Growth",
      description: "Fostering professional and organizational development.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-medium mb-4">Our Company</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              About Alpran HR Services
            </h1>
            <p className="text-xl text-muted-foreground">
              Delivering smart HR solutions for modern businesses
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Founded with a vision to transform the HR landscape, Alpran HR
                  Services has been at the forefront of providing innovative
                  human resource solutions to businesses of all sizes. Our
                  journey began with a simple goal: to make HR processes more
                  efficient and employee-friendly.
                </p>
                <p>
                  Today, we stand proud as a trusted partner for numerous
                  organizations, helping them build strong teams and foster
                  positive work environments.
                </p>
              </div>
              <Button
                className="mt-8 bg-white shadow-2xl outline-orange-500 hover:bg-orange-300 text-primary-foreground"
                onClick={() => router.push("/contact")}
              >
                Contact Us
              </Button>
            </div>
            <div className="relative">
              <div className="bg-accent rounded-lg p-8 text-center">
                <div className="text-6xl font-bold text-primary mb-4">500+</div>
                <p className="text-foreground font-medium mb-2">
                  Companies Served
                </p>
                <p className="text-muted-foreground text-sm">
                  Trusted by organizations worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and drive our
              commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-2 bg-card border-0"
                >
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-smooth">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Ready to Transform Your HR?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let&apos;s work together to build stronger teams and create positive
              work environments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default About;
