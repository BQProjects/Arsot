"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContentsOfCards from "../components/ContentsOfCards";

interface CrewBrief {
  _id: string;
  title: string;
  date: string;
  banner?: string;
  sections: unknown[];
  summary: string;
}

function CrewBrief() {
  const [crewBriefs, setCrewBriefs] = useState<CrewBrief[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrewBriefs = async () => {
      try {
        const response = await fetch("/api/crew-briefs");
        if (response.ok) {
          const data = await response.json();
          setCrewBriefs(data);
        }
      } catch (error) {
        console.error("Error fetching crew briefs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrewBriefs();
  }, []);
  return (
    <div>
      <div className="relative h-screen">
        <Header />
        <div className="absolute top-0 left-0">
          <Image
            src="/grid.svg"
            width={458}
            height={342}
            alt="Grid pattern"
            priority
          />
        </div>
        <div className="grid grid-cols-2 h-full place-items-center">
          <div className="flex flex-col items-start gap-4 px-8">
            <div className="text-[3.5rem] leading-[120%] text-white font-['Montserrat'] text-left">
              Crew <br /> Brief
            </div>
            <div className="w-full max-w-md text-neutral-100 font-['Montserrat'] leading-[160%] text-left">
              Explore expert perspectives, operational tips, and aviation news
              curated by ARSOT. Our blog is designed to inspire, inform, and
              connect with the global flying community.
            </div>
          </div>
          <div className="flex w-full items-center justify-center px-4">
            <ContentsOfCards />
          </div>
        </div>

        <div className="absolute bottom-4 left-0 z-20">
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
      <div className="px-4 pb-16 pt-10 relative ">
        <div className="w-[519px] text-white font-['Playfair_Display'] text-5xl leading-[120%] pb-16">
          Insights &amp; Stories
        </div>
        {loading ? (
          <div className="text-center py-8">Loading crew briefs...</div>
        ) : (
          <div className="flex flex-wrap justify-evenly gap-10">
            {crewBriefs.slice(0, 3).map((brief, index) => (
              <Link key={brief._id || index} href={`/CrewBrief/${brief._id}`}>
                <div
                  className="flex flex-shrink-0 justify-center items-center pt-[10rem] w-[450px]  h-[16rem] bg-cover bg-no-repeat bg-center cursor-pointer"
                  style={{
                    backgroundImage: `url(${
                      brief.banner || "/default-brief-image.jpg"
                    })`,
                  }}
                >
                  <div className="flex flex-shrink-0 items-center gap-6 pr-8 h-[6.3125rem] w-full bg-[#030303]/[.60]">
                    <div className="flex-shrink-0 w-2 h-[6.3125rem] bg-[#f90]" />
                    <div className="flex flex-col items-start gap-4 ">
                      <div className="self-stretch text-neutral-200 font-['Montserrat'] text-xs leading-[150%]">
                        {new Date(brief.date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>
                      <div className="w-[19.3125rem] text-white font-['Montserrat'] font-medium leading-[120%] uppercase">
                        {brief.title}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div
        className="relative flex items-center pt-[10.25rem] pb-[16.1875rem] w-full min-h-[619px] bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(/gulfstream.jpg)` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col flex-shrink-0 items-start gap-6 w-full h-full p-6">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="flex flex-col items-start self-stretch text-white font-['Montserrat'] text-2xl leading-[140%]">
              Aircraft Services
            </div>
            <div className="flex flex-col items-start w-[475px] text-white font-['Montserrat'] text-sm leading-[150%]">
              Excellence in Every Detail. From ground handling to in-flight
              catering, our aircraft services ensure your operations run
              flawlessly.
            </div>
          </div>
          <div className="w-[558px] h-2 border-t-[0.5px] border-t-[#fff] border-b-[0.5px] border-b-[#fff]" />
          <button>
            <div className="flex justify-center items-center gap-3 py-3 px-6 h-14 bg-white">
              <div className="all_solutions_and_services text-[#2e2e2e] font-['Montserrat'] font-medium leading-[120%] uppercase">
                Request a quote
              </div>
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.44714 16.3361L12.2109 10.4798C12.3373 10.352 12.4082 10.1796 12.4082 9.99982C12.4082 9.82008 12.3373 9.6476 12.2109 9.51982L6.44839 3.66232C6.32205 3.53375 6.25125 3.3607 6.25125 3.18044C6.25125 3.00019 6.32205 2.82714 6.44839 2.69857C6.51011 2.63526 6.58388 2.58494 6.66535 2.55059C6.74682 2.51623 6.83435 2.49854 6.92277 2.49854C7.01118 2.49854 7.09871 2.51623 7.18018 2.55059C7.26165 2.58494 7.33542 2.63526 7.39714 2.69857L13.1596 8.55357C13.5383 8.93922 13.7504 9.4581 13.7504 9.99857C13.7504 10.539 13.5383 11.0579 13.1596 11.4436L7.39714 17.2986C7.3354 17.3621 7.26155 17.4125 7.17997 17.447C7.09838 17.4815 7.01071 17.4992 6.92214 17.4992C6.83357 17.4992 6.7459 17.4815 6.66431 17.447C6.58273 17.4125 6.50888 17.3621 6.44714 17.2986C6.3208 17.17 6.25 16.997 6.25 16.8167C6.25 16.6364 6.3208 16.4634 6.44714 16.3348"
                  fill="#2E2E2E"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CrewBrief;
