import React from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OurTeam from "../components/OurTeam";

const AboutTitle = () => (
  <div className="about_title flex flex-col items-center w-full max-w-6xl px-4">
    <div className="self-stretch text-white text-center font-['Playfair Display'] text-[3.5rem] leading-[120%]">
      About Us
    </div>
    <div className="w-full max-w-2xl text-white text-center font-['Montserrat'] text-lg leading-[160%]">
      Founded in 2007 by an international captain of a fortune 500 flight dept,
      we simply understand corporate aviation inside out
    </div>
  </div>
);

export default function AboutUs() {
  const OurStory = () => (
    <div className="w-full bg-black px-8 py-10">
      <div className="text-white font-['Playfair Display'] text-[3.5rem] leading-[120%] mb-10">
        Our Story
      </div>

      {/* 50/50 Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="flex justify-center items-center bg-black/70 border border-white/50 p-10">
          <div className="flex flex-col items-start gap-10 max-w-lg">
            <div className="space-y-8 text-justify text-neutral-100 font-['Montserrat'] text-lg leading-[160%]">
              <p>
                ARSOT’s network of strategically located FBOs &amp; ground
                support stations delivers essential services for general
                aviation across Argentina, Paraguay and Uruguay, including
                refueling, hangarage, line maintenance, gourmet catering,
                permits and a variety of other world-class amenities with
                exceptional customer service.
              </p>
              <p>
                We are the only company with the ability to provide true VIP
                handling. South America can present rather challenging and
                undesired scenarios which can unexpectedly unfold any time. We
                don’t take no for an answer — as one client put it once, “You
                guys know how to produce miracles.” We constantly assess and
                monitor all aspects of each flight operation — we take it very
                seriously.
              </p>
            </div>

            <button className="flex items-center gap-3 py-3 px-6 bg-white text-[#2e2e2e] font-['Montserrat'] font-medium uppercase tracking-wide">
              Quote Request
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
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/plane0.jpg)" }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-black">
      <Header />
      <div className="relative h-screen flex flex-col items-center justify-start pt-25">
        <div className="absolute top-0 right-0">
          <Image
            src="/grid.svg"
            width={458}
            height={342}
            alt="Grid pattern"
            priority
            className="top-0 right-0"
          />
        </div>
        <AboutTitle />
        <Image
          src="/AboutPlane.png"
          className="mt-20 z-10"
          alt="About Plane"
          width={1200}
          height={700}
        />
      </div>

      <OurStory />

      <OurTeam />

      <Footer />
    </div>
  );
}
