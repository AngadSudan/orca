"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import logo from "@/../public/logo.png";
import draw from "@/../public/draw.png";
import cost from "@/../public/cost.png";
import deploy from "@/../public/deploy.png";
import redesign from "@/../public/redesign.png";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    heading: "Draw your components",
    short_heading: "Draw",
    color: "",
    description:
      "Pick the components based on your choice of service provider and connect the components",
    media: draw,
  },
  {
    heading: "Deploy your diagram",
    short_heading: "Deploy",
    color: "",
    description:
      "deploy your code and observe your cloud resources being built",
    media: deploy,
  },
  {
    heading: "Validate Your billing",
    short_heading: "Validate",
    color: "",
    description:
      "observe the cost for your resources and try to check the bottle necks and how to improve them",
    media: cost,
  },
  {
    heading: "Re-build your achitechture",
    short_heading: "Re-iterate",
    color: "",
    description:
      "Destroy and recreate your cloud resources and keep the loop going",
    media: redesign,
  },
];

export default function LifeCycle() {
  const [currPhase, setCurrPhase] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=4000",
        pin: true,
        scrub: true,

        onUpdate: (self) => {
          const progress = self.progress;

          const phase = Math.min(
            PHASES.length - 1,
            Math.floor(progress * PHASES.length),
          );

          setCurrPhase(phase);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
      },
    );
  }, [currPhase]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[500vh] bg-white text-black"
    >
      <div className="sticky top-0 flex h-screen">
        <div ref={textRef} className="flex w-1/2 flex-col justify-center px-20">
          <p className="mb-4 text-sm uppercase tracking-[6px] text-neutral-700">
            Phase {currPhase + 1}
          </p>

          <h2 className="mb-8 text-5xl font-bold">
            {PHASES[currPhase].heading}
          </h2>

          <p className="max-w-xl text-2xl leading-9 text-neutral-700 font-semibold">
            {PHASES[currPhase].description}
          </p>
          <div>
            <Image
              alt={PHASES[currPhase].short_heading}
              src={PHASES[currPhase].media}
              className="object-contain w-full my-2 h-full"
            />
          </div>
        </div>
        <div className="relative flex w-1/2 items-center justify-center">
          <div className="absolute flex h-52 w-52 items-center justify-center rounded-full border-2 border-black bg-white text-3xl font-bold shadow-xl z-30">
            <Image
              src={logo}
              alt="orca-logo"
              loading="eager"
              className="object-cover rounded-full"
            />
          </div>
          <div
            className={`absolute -translate-x-1/2 transition-all duration-300 ${
              currPhase === 0
                ? "top-20 left-1/2 scale-110 text-white"
                : "top-50 left-[48%] scale-100 text-neutral-700"
            }`}
          >
            <div
              className={`${currPhase === 0 ? "flex items-center justify-center text-2xl font-bold  h-60 w-60 -z-10 rounded-full text-white bg-black" : ""}`}
            >
              <p className="z-30">{PHASES[0].short_heading}</p>
            </div>
          </div>
          <div
            className={`absolute  -translate-y-1/2 transition-all duration-300 ${
              currPhase === 1
                ? "top-1/2 right-16 scale-110 text-white"
                : "top-1/2 right-16 scale-100 text-neutral-600"
            }`}
          >
            <div
              className={`${currPhase === 1 ? "flex items-center justify-center text-2xl font-bold  h-60 w-60 -z-10 rounded-full text-white bg-black" : "text-black"}`}
            >
              <p className="z-30">{PHASES[1].short_heading}</p>
            </div>
          </div>
          <div
            className={`absolute  -translate-x-1/2 transition-all duration-300 ${
              currPhase === 2
                ? "bottom-20 left-1/2 scale-110 text-white"
                : "bottom-30 left-1/2 scale-100 text-neutral-600"
            }`}
          >
            <div
              className={`${currPhase === 2 ? "flex items-center justify-center text-2xl font-bold  h-60 w-60 -z-10 rounded-full text-white bg-black" : " text-black"}`}
            >
              <p className="z-30">{PHASES[2].short_heading}</p>
            </div>
          </div>

          <div
            className={`absolute left-16 top-1/2 -translate-y-1/2 transition-all duration-300 ${
              currPhase === 3
                ? "scale-110 text-white"
                : "scale-100 text-neutral-600"
            }`}
          >
            <div
              className={`${currPhase === 3 ? "flex items-center justify-center text-2xl font-bold  h-60 w-60 -z-10 rounded-full text-white bg-black" : "text-black"}`}
            >
              <p className="z-30">{PHASES[3].short_heading}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
