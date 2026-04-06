"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className, delay = 0 }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".char");
    
    gsap.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power4.out",
        delay: delay / 1000,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, [text, delay]);

  return (
    <div ref={containerRef} className={`overflow-hidden flex flex-wrap ${className}`}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="word inline-block whitespace-nowrap mr-[0.3em]">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="char inline-block"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
