"use client";
import React, { useState } from "react";
import Image from "next/image";
import Header from "../components/Header";

function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can add API call or other logic
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <Image
        src="/Squaregrid.svg"
        width={458}
        height={342}
        alt="Grid pattern"
        priority
        className="absolute top-0 left-0 h-screen"
      />
      <div>
        <Header />
      </div>
      <div className=" h-screen relative overflow-hidden flex justify-center items-center">
        <div className=" inline-flex justify-center items-center relative z-10">
          <div className=" flex flex-col items-start mr-16">
            <div className="flex flex-col items-start gap-5 mb-8">
              <div className="text-white font-['Playfair_Display'] text-[3.5rem] leading-[120%]">
                We’re ready when you are.
              </div>
              <div className="w-[455px] text-white font-['Montserrat'] leading-[160%]">
                Tell us a few details about your request and our operations team
                will reach out shortly.
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 mb-8">
              <div className="text-white font-['Playfair_Display'] text-xl leading-[140%] uppercase">
                Email
              </div>
              <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
                arsot@gmail.com
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="text-white font-['Playfair_Display'] text-xl leading-[140%] uppercase">
                Socials
              </div>
              <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
                Instagram
              </div>
              <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
                Twitter
              </div>
              <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
                Facebook
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-end gap-8 mb-16"
          >
            <div className="flex flex-col items-start">
              <div className="text-white font-['Montserrat'] leading-[160%] mb-2">
                Full Name
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="pb-[0.6875rem] pr-[403px] pt-3 pl-4 w-[563px] border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-transparent outline-none"
                required
              />
            </div>
            <div className="contact_content-1 flex flex-col items-start">
              <div className="text-white font-['Montserrat'] leading-[160%] mb-2">
                Email
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter a valid email"
                className="pb-[0.6875rem] pr-[417px] pt-3 pl-4 w-[563px] border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-transparent outline-none"
                required
              />
            </div>
            <div className="contact_content-2 flex flex-col items-start w-[563px]">
              <div className="text-white font-['Montserrat'] leading-[160%] mb-2">
                Service Interested In
              </div>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder="Ground Handling, Charter, Fuel, Aircraft Management, Trip Support"
                className="pt-[0.6875rem] pb-[0.6875rem] px-4 w-full border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-transparent outline-none"
                required
              />
            </div>
            <div className="contact_content-3 flex flex-col items-start">
              <div className="text-white font-['Montserrat'] leading-[160%] mb-2">
                Message
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Ground Handling, Charter, Fuel, Aircraft Management, Trip Support"
                className="pb-[8.0625rem] pr-[4.8125rem] pt-3 pl-4 w-[563px] h-[10.3125rem] border border-[#8c8c8c] text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%] bg-transparent outline-none resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="flex justify-center items-center gap-3 py-3 px-6 h-14 bg-white hover:bg-gray-200 transition-colors"
            >
              <div className="text-[#2e2e2e] font-['Montserrat'] font-medium leading-[120%] uppercase">
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
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
