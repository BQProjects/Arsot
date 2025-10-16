"use client";
import React from "react";
import Image from "next/image";

const WhyChooseUs = () => (
  <section className="relative w-full bg-black py-16 min-h-screen flex items-center">
    {/* Decorative grid pattern in the background (bottom-left) */}
    <div className="pointer-events-none absolute bottom-0 left-0 opacity-100">
      <Image
        src="/grid.svg"
        width={458}
        height={342}
        alt="Grid pattern"
        priority
      />
    </div>

    {/* Content container */}
    <div className="mx-auto px-16">
      {/* Two-column layout: left menu, right combined text and image */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1180px] items-start">
        {/* Left: services list */}
        <div className="flex flex-col items-start gap-6 text-white/90">
          <div className="w-full max-w-[11.5rem]">
            <div className="h-2 border-[0.8px] border-white/80 mb-6" />
            <nav className="flex flex-col gap-4 font-['Montserrat'] text-sm leading-[150%]">
              <a className="text-[#f90] underline" href="#">
                Ground Handling &amp; FBO
              </a>
              <a className="hover:text-white/100 transition" href="#">
                Trip Management
              </a>
              <a className="hover:text-white/100 transition" href="#">
                Aircraft Management
              </a>
              <a className="hover:text-white/100 transition" href="#">
                Fuel Service
              </a>
              <a className="hover:text-white/100 transition" href="#">
                Charter Service
              </a>
              <a className="hover:text-white/100 transition" href="#">
                VIP Meet Greet Services
              </a>
            </nav>
          </div>
        </div>

        {/* Right: combined text and image */}
        <div className="h-[554px] bg-[#282522] pl-8 text-white flex justify-start">
          <div className="flex flex-col justify-start">
            <h3 className="font-['Montserrat'] text-sm tracking-wide leading-[120%] uppercase mb-4 pt-8">
              Ground Handling &amp; FBO
            </h3>
            <p className="font-['Montserrat'] text-sm leading-[150%] text-white/90">
              From touchdown to takeoff, our team manages every operational
              detail with care and precision. ARSOT’s FBO network provides
              efficient ground support, crew coordination, and passenger comfort
              — ensuring seamless transitions at every destination.
            </p>
          </div>
          <Image
            src="/mainBg.jpg"
            alt="Corporate Aviation"
            width={680}
            height={554}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Mobile stacking spacing below */}
      <div className="lg:hidden mt-6" />
    </div>
  </section>
);

export default WhyChooseUs;
