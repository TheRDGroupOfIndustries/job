"use client";
import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

const stats = [
  { number: 15000, label: "Active Jobs", suffix: "+" },
  { number: 50000, label: "Job Seekers", suffix: "+" },
  { number: 2500, label: "Companies", suffix: "+" },
  { number: 98, label: "Success Rate", suffix: "%" },
];

const AnimatedNumber: React.FC<{ value: number; suffix?: string }> = ({
  value,
  suffix = "",
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || animated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            animate(0, value, {
              duration: 2,
              onUpdate(latest) {
                if (node) node.textContent = `${Math.floor(latest).toLocaleString()}${suffix}`;
              },
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [value, suffix, animated]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

const StatsSection = () => (
  <section className="px-8 py-20 bg-gray-50">
    <div className="container mx-auto px-6 text-center">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Trusted by Thousands
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join the growing community of professionals and employers who trust Alpran HR Services
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map(({ number, label, suffix }, idx) => (
          <div key={idx} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              <AnimatedNumber value={number} suffix={suffix} />
            </div>
            <div className="text-lg text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
