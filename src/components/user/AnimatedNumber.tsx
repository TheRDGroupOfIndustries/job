import React, { useEffect, useRef } from "react";
import { animate } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, suffix = "" }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;

    const controls = animate(0, value, {
      duration: 2,
      onUpdate(latest) {
        if (nodeRef.current) {
          nodeRef.current.textContent = `${Math.floor(latest).toLocaleString()}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [value, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

export default AnimatedNumber;
