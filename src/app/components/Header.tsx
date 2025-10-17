"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-shrink-0 items-center gap-6 py-4 px-0 w-full h-24 border-b-[0.8px] border-b-[#f5f5f5] bg-transparent">
      <div className="flex justify-between items-center self-stretch py-0 px-14">
        <div className="w-[9.5rem] h-[3.125rem] bg-cover"
        onClick={() => router.push("/")}>
          <Image
            src="/logo.svg"
            width={180}
            height={38}
            alt="Next.js logo"
            priority
          />
        </div>
        <div className="flex items-center gap-8">
          <div
            className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white"
            onClick={() => router.push("/OurService")}
          >
            <span className="text-base tracking-wide">Services</span>
            <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </div>
          <div
            className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white"
            onClick={() => router.push("/OurLocation")}
          >
            <span className="text-base tracking-wide">Our Location</span>
            <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </div>
          <div className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white">
            <span className="text-base tracking-wide">CREW BRIEF</span>
            <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </div>
          <div className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white">
            <span className="text-base tracking-wide">QUOTE</span>
            <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </div>
          <div className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white">
            <span className="text-base tracking-wide">About Us</span>
            <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </div>
          <div className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white">
            <span className="text-base tracking-wide">CONTACT US</span>
            <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </div>
          <div className="flex justify-center items-center gap-3 py-3 px-6 h-14 bg-[#f90]">
            <div className="get_a_quote flex flex-col justify-center w-[7.0625rem] h-5 text-white font-['Montserrat'] font-medium leading-[120%] uppercase">
              Get A Quote
            </div>
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.44616 16.3361L12.2099 10.4798C12.3363 10.352 12.4072 10.1796 12.4072 9.99982C12.4072 9.82008 12.3363 9.6476 12.2099 9.51982L6.44741 3.66232C6.32107 3.53375 6.25027 3.3607 6.25027 3.18044C6.25027 3.00019 6.32107 2.82714 6.44741 2.69857C6.50914 2.63526 6.58291 2.58494 6.66438 2.55059C6.74585 2.51623 6.83337 2.49854 6.92179 2.49854C7.01021 2.49854 7.09773 2.51623 7.1792 2.55059C7.26067 2.58494 7.33444 2.63526 7.39616 2.69857L13.1587 8.55357C13.5373 8.93922 13.7495 9.4581 13.7495 9.99857C13.7495 10.539 13.5373 11.0579 13.1587 11.4436L7.39616 17.2986C7.33442 17.3621 7.26058 17.4125 7.17899 17.447C7.0974 17.4815 7.00973 17.4992 6.92116 17.4992C6.8326 17.4992 6.74492 17.4815 6.66334 17.447C6.58175 17.4125 6.5079 17.3621 6.44616 17.2986C6.31982 17.17 6.24902 16.997 6.24902 16.8167C6.24902 16.6364 6.31982 16.4634 6.44616 16.3348"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[1895px] h-px" />
    </div>
  );
};

export default Header;
