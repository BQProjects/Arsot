import React from "react";
import Image from "next/image";
import Header from "../components/Header";

function OurLocation() {
  return (
    <div>
      <Header />
      <div className="bg-black">
        <div className="flex justify-center pt-28">
          <div className="inline-flex flex-col">
            <div className="self-stretch text-white text-center font-['Playfair_Display'] text-[3.5rem] leading-[120%]">
              Our Location
            </div>
            <div className="w-[685px] text-white text-center font-['Montserrat'] leading-[160%]">
              We provide services across Argentina, Paraguay and Uruguay with
              ground bases strategically located.&nbsp;We are all about detailed
              logistics, we understand VIP handling
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Image
            src="/darkearth.png"
            width={1920}
            height={1080}
            alt="Our Location Image"
            priority
            className="w-screen h-auto"
          />
        </div>
        <div className="bottom-0 left-0 z-20">
          <div className="flex flex-col flex-shrink-0 justify-center items-center gap-3 w-28 h-[417px]">
            <div className="w-px h-40 bg-white" />
            <svg
              width={74}
              height={73}
              viewBox="0 0 74 73"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.7562 9.90669C41.2489 10.403 41.6389 10.9916 41.9041 11.6388C42.1692 12.2859 42.3042 12.979 42.3014 13.6784V30.0669L60.2989 37.7957C60.4956 37.8742 60.6724 37.9954 60.8165 38.1506C60.9607 38.3058 61.0685 38.4911 61.1323 38.693L62.7109 43.3924C62.7947 43.6529 62.8078 43.9311 62.7488 44.1983C62.6899 44.4656 62.561 44.7124 62.3753 44.9135C62.1897 45.1146 61.954 45.2628 61.6923 45.3429C61.4306 45.423 61.1523 45.4322 60.8859 45.3695L42.3318 40.7036L41.4375 56.6571L44.9932 59.3186V64.6354C42.3208 63.9283 39.6512 63.2105 36.9845 62.4819C36.9845 62.4819 33.7208 63.3792 29.0062 64.6354V59.3186L32.565 56.6571L31.6646 40.7036L13.1135 45.3725C12.8473 45.4342 12.5694 45.4243 12.3082 45.3439C12.047 45.2634 11.8118 45.1152 11.6264 44.9144C11.441 44.7136 11.3121 44.4672 11.2528 44.2004C11.1934 43.9337 11.2057 43.6559 11.2885 43.3954L12.8671 38.693C12.9309 38.4911 13.0388 38.3058 13.1829 38.1506C13.327 37.9954 13.5038 37.8742 13.7006 37.7957L31.6981 30.0669V13.6784C31.6952 12.979 31.8302 12.2859 32.0954 11.6388C32.3605 10.9916 32.7506 10.403 33.2433 9.90669C34.2448 8.92032 35.594 8.36743 36.9997 8.36743C38.4054 8.36743 39.7547 8.92032 40.7562 9.90669Z"
                stroke="white"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="w-px h-40 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurLocation;
