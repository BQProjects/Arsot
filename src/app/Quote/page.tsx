"use client";
import React from "react";
import Image from "next/image";
import Header from "../components/Header";

const Quotes = () => (
  <div className="z-10 pb-20">
    <div className="text-white opacity-60 font-['PlayfairDisplay'] text-[3.5rem] leading-[120%] text-left w-7xl mx-auto pb-10">
      Quote Request
    </div>
    <div className="inline-flex flex-col justify-center items-center gap-10 pl-20 pr-20 pt-10 border border-neutral-700 bg-black max-w-7xl w-full pb-10">
      <div className="flex flex-col justify-center items-center gap-4 w-5xl">
        <div className="w-full text-white font-['Montserrat'] text-xl leading-[140%] uppercase">
          Choose your FBO
        </div>
        <div className="flex flex-col items-start gap-2 self-stretch w-5xl mx-auto">
          <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
            Region*
          </div>
          <input
            type="text"
            placeholder="Pick the region for your operation"
            className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-5xl border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 w-5xl">
        <div className="w-full text-white font-['Montserrat'] text-xl leading-[140%] uppercase">
          Aircraft Details
        </div>
        <div className="flex justify-center  gap-10 self-stretch w-5xl">
          <div className="flex flex-col items-start gap-2 flex-1">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Registration
            </div>
            <input
              type="text"
              placeholder="Enter aircraft registration (e.g., N123AB)"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-full h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2 flex-1">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Type
            </div>
            <input
              type="text"
              placeholder="Enter aircraft type (e.g., Gulfstream G650)"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-full h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 w-5xl">
        <div className="w-full text-white font-['Montserrat'] text-xl leading-[140%] uppercase">
          Contacts
        </div>
        <div className="flex justify-between items-center w-5xl">
          <div className="flex flex-col items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Operator *
            </div>
            <input
              type="text"
              placeholder="Operator"
              className="py-2 px-4 w-56 h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Debtor
            </div>
            <input
              type="text"
              placeholder="Debtor"
              className="py-2 px-4 w-56 h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Telephone
            </div>
            <input
              type="tel"
              placeholder="Telephone"
              className="py-2 px-4 w-56 h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Email *
            </div>
            <input
              type="email"
              placeholder="Email"
              className="py-2 px-4 w-56 h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 w-5xl">
        <div className="w-full text-white font-['Montserrat'] text-xl leading-[140%] uppercase">
          Arrival
        </div>
        <div className="flex justify-between items-center w-5xl">
          <div className="flex flex-col items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              STA *
            </div>
            <input
              type="date"
              placeholder="dd/mm/aaaa"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Local Time *
            </div>
            <input
              type="time"
              placeholder="--:--"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              From
            </div>
            <input
              type="text"
              placeholder="Enter destination location"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-5xl">
          <div className="flex flex-col items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Pax *
            </div>
            <input
              type="number"
              placeholder="Number of passengers"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Crew *
            </div>
            <input
              type="number"
              placeholder="Number of crew members"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Flight Number
            </div>
            <input
              type="text"
              placeholder="Enter flight number"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 w-5xl">
        <div className="w-full text-white font-['Montserrat'] text-xl leading-[140%] uppercase">
          Departure
        </div>
        <div className="flex justify-between items-center w-5xl">
          <div className="flex flex-col items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              STA *
            </div>
            <input
              type="date"
              placeholder="dd/mm/aaaa"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Local Time *
            </div>
            <input
              type="time"
              placeholder="--:--"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              To
            </div>
            <input
              type="text"
              placeholder="Enter destination location"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-5xl">
          <div className="flex flex-col items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Pax *
            </div>
            <input
              type="number"
              placeholder="Number of passengers"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Crew *
            </div>
            <input
              type="number"
              placeholder="Number of crew members"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] leading-[160%]">
              Flight Number
            </div>
            <input
              type="text"
              placeholder="Enter flight number"
              className="pl-[0.9375rem] pr-[0.9375rem] p-2 w-[18.75rem] h-11 border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 w-5xl">
        <div className=" w-full text-white font-['Montserrat'] text-xl leading-[140%] uppercase">
          Comments
        </div>
        <div className="flex flex-col items-start gap-2 w-5xl">
          <div className="text-white font-['Montserrat'] leading-[160%]">
            Add any notes or special instructions here
          </div>
          <textarea
            placeholder="Example: catering request, VIP handling, fuel requirements"
            className="p-2 w-full h-[3.9375rem] border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-black"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-end gap-2.5 w-5xl">
        <div className="flex justify-center items-center gap-3 py-3 px-6 h-14 bg-white hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <div className="all_solutions_and_services text-[#2e2e2e] font-['Montserrat'] font-medium leading-[120%] uppercase">
            Submit
          </div>
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.44714 16.3363L12.2109 10.4801C12.3373 10.3523 12.4082 10.1798 12.4082 10.0001C12.4082 9.82032 12.3373 9.64784 12.2109 9.52006L6.44839 3.66256C6.32205 3.53399 6.25125 3.36095 6.25125 3.18069C6.25125 3.00043 6.32205 2.82738 6.44839 2.69881C6.51011 2.6355 6.58388 2.58519 6.66535 2.55083C6.74682 2.51648 6.83435 2.49878 6.92277 2.49878C7.01118 2.49878 7.09871 2.51648 7.18018 2.55083C7.26165 2.58519 7.33542 2.6355 7.39714 2.69881L13.1596 8.55381C13.5383 8.93947 13.7504 9.45834 13.7504 9.99881C13.7504 10.5393 13.5383 11.0582 13.1596 11.4438L7.39714 17.2988C7.3354 17.3623 7.26155 17.4128 7.17997 17.4473C7.09838 17.4817 7.01071 17.4995 6.92214 17.4995C6.83357 17.4995 6.7459 17.4817 6.66431 17.4473C6.58273 17.4128 6.50888 17.3623 6.44714 17.2988C6.3208 17.1702 6.25 16.9972 6.25 16.8169C6.25 16.6367 6.3208 16.4636 6.44714 16.3351"
              fill="#2E2E2E"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

function Quote() {
  return (
    <div className="h-screen w-full">
      <div className="h-2/3 relative">
        <Image
          src="/quotebg.jpg"
          fill
          alt="Home Hero Image"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#000000] opacity-55"></div>
        <div className="absolute top-0 left-0 w-full z-10">
          <Header />
        </div>
      </div>
      <div className="flex justify-center items-center py-10 -mt-48">
        <Quotes />
      </div>
    </div>
  );
}

export default Quote;
