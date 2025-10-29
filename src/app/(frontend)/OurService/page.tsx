"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Image from "next/image";
import WhyChooseUs from "../components/WhyChooseUs";

export default function OurService() {
  const services = [
    "Ground Handling & FBO",
    "Trip Management",
    "Aircraft Management",
    "Fuel Service",
    "Charter Service",
    "VIP Meet & Greet Services",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2000); // change every 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Header */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Background Section */}
      <div className="bg-black min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0">
          <Image
            src="/grid.svg"
            width={458}
            height={342}
            alt="Grid pattern"
            priority
          />
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          {/* Title */}
          <div className="flex flex-col justify-center items-center gap-10 mb-16">
            <div className="text-white font-['PlayfairDisplay'] text-[3.5rem] leading-[120%]">
              Our Services
            </div>
            <div className="max-w-[619px] text-white font-['Montserrat'] text-lg leading-[160%]">
              Founded in 2007 by an international captain of a Fortune 500
              flight department, we simply understand corporate aviation inside out.
            </div>
          </div>

          {/* Animated Service Text */}
          <div className="w-full relative text-white font-['Montserrat'] text-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={services[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="absolute w-full"
              >
                {services[index]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUs />
    </div>
  );
}
