import Image from "next/image";
import React from "react";

const Footer = () => (
  <div className="flex-shrink-0 w-full bg-black pb-8 pt-8">
    <Image
      src="/logo.svg"
      width={180}
      height={38}
      alt="Next.js logo"
      priority
      className="mx-auto mb-8"
    />
    <div className="w-full h-px bg-white/25 mb-4" />
    <div className="flex justify-between items-center mb-8 pl-8 pr-8">
      <div className="flex items-center gap-12 h-8">
        <div className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white">
          <span className="text-base tracking-wide">About Us</span>
          <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
        </div>
        <div className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white">
          <span className="text-base tracking-wide">Services</span>
          <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
        </div>
        <div className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white">
          <span className="text-base tracking-wide">Resources</span>
          <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
        </div>
        <div className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white">
          <span className="text-base tracking-wide">Locations</span>
          <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
        </div>
        <div className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white">
          <span className="text-base tracking-wide">Request a quote</span>
          <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
        </div>
        <div className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white">
          <span className="text-base tracking-wide">Blog</span>
          <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
        </div>
        <div className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white">
          <span className="text-base tracking-wide">Contact us</span>
          <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <svg
          width={32}
          height={32}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6251 14.832L23.3211 12.0287C23.8433 11.8193 24.4034 11.7205 24.9657 11.7387C26.4244 11.7834 29.0624 12 28.1431 13.0054C26.8931 14.3714 18.1184 17.7867 15.5251 18.7494C12.9317 19.712 9.72508 20.22 7.50641 20.2627C5.56508 20.3 7.73974 19.1294 7.73974 19.1294C7.73974 19.1294 10.2057 17.7367 11.2977 17.264L13.6811 16.222"
            stroke="#FF9900"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.801 17.4946L4.87633 15.1266L3.66699 15.5466L7.50499 19.266M20.4537 15.1093L10.7523 14.304L9.92699 14.89L16.5337 17.234"
            stroke="#FF9900"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="back_to_top-1 text-[#f90] font-['Montserrat'] font-medium leading-[120%] uppercase">
          Back to top
        </div>
      </div>
    </div>
    <div className="w-full h-px bg-white/25 mb-4" />
    <div className="flex justify-between items-start pl-8 pr-8">
      <div className="flex flex-col max-w-xs">
        <div className="text-white font-['Montserrat'] text-xl leading-[140%] uppercase mb-4">
          Contact
        </div>
        <div className="w-full text-neutral-100/[.80] font-['Montserrat'] text-sm leading-[150%] mb-4">
          OPS 24 Hs:&nbsp;+54 11 52582113 / Ext 1# INTL (US Toll Free):&nbsp;1
          888 509 1468 Email (Ar / Uy / Py):&nbsp;ops@arsot.com
        </div>
        <div className="text-white font-['Montserrat'] leading-[160%]">
          @Copyright Arsot Trip Support
        </div>
      </div>
      <div className="flex-shrink-0 self-center">
        <Image src="/Map.svg" width={300} height={200} alt="Map" priority />
      </div>
      <div className="flex flex-col max-w-[46rem]">
        <div className="w-full text-white font-['Montserrat'] text-xl leading-[140%] uppercase mb-4">
          Why Choose ARSOT?
        </div>
        <div className="w-full text-neutral-100/[.80] font-['Montserrat'] text-sm leading-[150%] mb-8">
          With years of expertise in corporate aviation, ARSOT ensures seamless
          operations across Latin America. From permits and fueling to VIP
          handling and on-ground support, our 24/7 team delivers precision,
          care, and reliability—making every journey stress-free.
        </div>
        <div className="flex items-start gap-20">
          <div className="flex flex-col items-start gap-2">
            <div className="text-neutral-100 font-['Montserrat'] text-sm leading-[150%]">
              About Us
            </div>
            <div className="self-stretch text-neutral-100 font-['Montserrat'] text-sm leading-[150%]">
              Services
            </div>
            <div className="text-neutral-100 font-['Montserrat'] text-sm leading-[150%]">
              Resources
            </div>
            <div className="self-stretch text-neutral-100 font-['Montserrat'] text-sm leading-[150%]">
              Location
            </div>
            <div className="self-stretch text-neutral-100 font-['Montserrat'] text-sm leading-[150%]">
              Blog
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-neutral-100 font-['Montserrat'] text-sm leading-[150%]">
              Request a quote
            </div>
            <div className="text-neutral-100 font-['Montserrat'] text-sm leading-[150%]">
              Contact Us
            </div>
            <div className="text-neutral-100 font-['Montserrat'] text-sm leading-[150%]">
              Terms &amp; Conditions
            </div>
            <div className="self-stretch text-neutral-100 font-['Montserrat'] text-sm leading-[150%]">
              Privacy Policy
            </div>
            <div className="self-stretch text-neutral-100 font-['Montserrat'] text-sm leading-[150%]">
              Terms of use
            </div>
          </div>
          <div className="flex flex-row items-start gap-2 ml-8">
            {/* Facebook */}
            <svg
              className="flex-shrink-0 w-[1.375rem] h-5 text-white hover:text-[#1877f2] transition-colors cursor-pointer"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            {/* Twitter */}
            <svg
              className="flex-shrink-0 w-[1.375rem] h-5 text-white hover:text-[#1da1f2] transition-colors cursor-pointer"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            {/* YouTube */}
            <svg
              className="flex-shrink-0 w-[1.375rem] h-5 text-white hover:text-[#ff0000] transition-colors cursor-pointer"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            {/* Pinterest */}
            <svg
              className="flex-shrink-0 w-[1.375rem] h-5 text-white hover:text-[#e60023] transition-colors cursor-pointer"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.75.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.017z" />
            </svg>
            {/* Behance */}
            <svg
              className="flex-shrink-0 w-[1.375rem] h-5 text-white hover:text-[#1769ff] transition-colors cursor-pointer"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 7h-7v10h7v-1h-6V8h6V7zM10 6H5V5H3v1H0v1h3v6H0v1h3v1h2V6h5V6zM9 8H4v4h5V8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
