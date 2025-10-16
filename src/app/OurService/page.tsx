import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import WhyChooseUs from "../components/WhyChooseUs";

export default function OurService() {
  return (
    <div className="relative">
      <div className="relative z-20">
        <Header />
      </div>
      <div className="bg-black min-h-screen relative">
        <div className="absolute top-0 right-0">
          <Image
            src="/grid.svg"
            width={458}
            height={342}
            alt="Grid pattern"
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-10 mb-16">
            <div className="text-white text-center font-['PlayfairDisplay'] text-[3.5rem] leading-[120%]">
              Our Services
            </div>
            <div className="w-[619px] text-white text-center font-['Montserrat'] text-lg leading-[160%]">
              Founded in 2007 by an international captain of a fortune 500
              flight dept, we simply understand corporate aviation inside out
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
              – Ground Handling &amp; FBO{" "}
            </div>
            <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
              – Trip Management
            </div>
            <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
              – Aircraft Management
            </div>
            <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
              – Fuel Service
            </div>
            <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
              – Charter Service
            </div>
            <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
              – VIP Meet Greet Services
            </div>
          </div>
        </div>
      </div>

      <WhyChooseUs />
    </div>
  );
}
