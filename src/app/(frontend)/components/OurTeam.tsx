"use client";

import React, { useEffect, useState } from "react";

interface FBOManager {
  id: string;
  name: string;
  role: string;
  location: string;
  about: string;
  photo?:
    | {
        url: string;
        alt?: string;
      }
    | string;
  photoUrl?: string; // Add this for processed photo URL
  createdAt: string;
  updatedAt: string;
}

const OurTeam = () => {
  const [managers, setManagers] = useState<FBOManager[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to get media URL
  const getMediaUrl = async (mediaId: string): Promise<string> => {
    try {
      console.log("Fetching media for ID:", mediaId);
      // Try PayloadCMS internal API first
      const response = await fetch(
        `/api/media?where[id][equals]=${mediaId}&depth=0`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Media API response:", data);
        if (data.docs && data.docs.length > 0) {
          const mediaUrl = data.docs[0].url;
          console.log("Found media URL:", mediaUrl);
          return mediaUrl || "/gulfstream.jpg";
        }
      }

      // Fallback: try direct media endpoint
      const directResponse = await fetch(`/api/media/${mediaId}`);
      if (directResponse.ok) {
        const media = await directResponse.json();
        console.log("Direct media response:", media);
        return media.url || "/gulfstream.jpg";
      }
    } catch (error) {
      console.log("Failed to fetch media:", error);
    }
    console.log("Using fallback image for media ID:", mediaId);
    return "/gulfstream.jpg";
  };

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch("/api/fbo-managers?depth=0&limit=10");
        if (response.ok) {
          const data = await response.json();
          console.log("FBO managers data:", data); // Debug log

          // Process managers to get photo URLs
          const managersWithPhotos = await Promise.all(
            (data.docs || []).map(async (manager: Record<string, unknown>) => {
              console.log(
                "Processing manager:",
                manager.name,
                "Photo:",
                manager.photo
              );
              if (manager.photo && typeof manager.photo === "string") {
                console.log(
                  "Fetching photo URL for manager:",
                  manager.name,
                  "Photo ID:",
                  manager.photo
                );
                manager.photoUrl = await getMediaUrl(manager.photo);
                console.log(
                  "Got photo URL for",
                  manager.name,
                  ":",
                  manager.photoUrl
                );
              } else {
                console.log(
                  "No photo or invalid photo format for manager:",
                  manager.name
                );
              }
              return manager as unknown as FBOManager;
            })
          );

          setManagers(managersWithPhotos);
        }
      } catch (error) {
        console.error("Error fetching managers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  if (loading) {
    return (
      <div className="our_team flex flex-col items-start pt-[4.9375rem] pb-[7.75rem] px-8 py-10 bg-black">
        <div className="flex flex-col items-start gap-5">
          <div className="self-stretch text-white font-['Playfair Display'] text-[2rem] md:text-[3.5rem] leading-[120%]">
            Our People
          </div>
          <div className="w-full max-w-[397px] text-white font-['Montserrat'] text-lg leading-[160%]">
            Loading team members...
          </div>
        </div>
      </div>
    );
  }

  if (managers.length === 0) {
    return (
      <div className="our_team flex flex-col items-start pt-[4.9375rem] pb-[7.75rem] px-8 py-10 bg-black">
        <div className="flex flex-col items-start gap-5">
          <div className="self-stretch text-white font-['Playfair Display'] text-[2rem] md:text-[3.5rem] leading-[120%]">
            Our People
          </div>
          <div className="w-full max-w-[397px] text-white font-['Montserrat'] text-lg leading-[160%]">
            No team members found.
          </div>
        </div>
      </div>
    );
  }

  // Only duplicate if we have enough managers for smooth scrolling
  const duplicatedManagers =
    managers.length >= 3 ? [...managers, ...managers] : managers;

  return (
    <div className="w-full flex flex-col items-start pt-[4.9375rem] pb-[7.75rem] px-8 py-10 bg-black">
      <div className="w-full flex flex-col items-start gap-5">
        <div className="self-stretch text-white font-['Playfair Display'] text-[2rem] md:text-[3.5rem] leading-[120%]">
          Our People
        </div>
        <div className="w-full max-w-[397px] text-white font-['Montserrat'] text-lg leading-[160%]">
          Meet our dedicated FBO managers across South America.
        </div>
      </div>
      <div className="w-full overflow-hidden mt-10">
        <div className="flex animate-scroll">
          {duplicatedManagers.map((manager, index) => {
            // Use the processed photoUrl or fallback
            const photoUrl =
              manager.photoUrl ||
              (typeof manager.photo === "object" ? manager.photo?.url : null) ||
              "/gulfstream.jpg";

            console.log(
              `Rendering manager ${manager.name} with photo URL:`,
              photoUrl
            );

            return (
              <div
                key={`${manager.id}-${index}`}
                className="flex-shrink-0 w-1/5 px-2"
              >
                <div className="flex flex-col justify-center items-start gap-10">
                  <svg
                    width={250}
                    height={300}
                    viewBox="0 0 340 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect width={340} height={400} fill="#D9D9D9" />
                    <rect
                      width={340}
                      height={400}
                      fill={`url(#pattern-${manager.id}-${index})`}
                    />
                    <defs>
                      <pattern
                        id={`pattern-${manager.id}-${index}`}
                        patternContentUnits="objectBoundingBox"
                        width={1}
                        height={1}
                      >
                        <use
                          xlinkHref={`#image-${manager.id}-${index}`}
                          transform="matrix(0.0015015 0 0 0.00127628 0 -0.138138)"
                        />
                      </pattern>
                      <image
                        id={`image-${manager.id}-${index}`}
                        width={666}
                        height={1000}
                        preserveAspectRatio="none"
                        xlinkHref={photoUrl}
                      />
                    </defs>
                  </svg>
                  <div className="flex flex-col items-start gap-4 self-stretch">
                    <div className="flex flex-col items-start gap-2.5 self-stretch">
                      <div className="flex flex-col items-start self-stretch">
                        <div className="self-stretch text-white font-['Montserrat'] text-lg leading-[160%]">
                          {manager.name}
                        </div>
                        <div className="self-stretch text-white font-['Montserrat'] leading-[160%]">
                          {manager.location} – {manager.role}
                        </div>
                      </div>
                      <div className="self-stretch text-white font-['Montserrat'] text-sm leading-[150%]">
                        {manager.about}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-[15rem]">
                      <svg
                        width={32}
                        height={32}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6261 14.8318L23.3221 12.0284C23.8443 11.819 24.4043 11.7203 24.9667 11.7384C26.4254 11.7831 29.0634 11.9998 28.1441 13.0051C26.8941 14.3711 18.1194 17.7864 15.5261 18.7491C12.9327 19.7118 9.72605 20.2198 7.50739 20.2624C5.56605 20.2998 7.74072 19.1291 7.74072 19.1291C7.74072 19.1291 10.2067 17.7364 11.2987 17.2638L13.6821 16.2218"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.8 17.4949L4.87535 15.1269L3.66602 15.5469L7.50402 19.2662M20.4527 15.1095L10.7513 14.3042L9.92602 14.8902L16.5327 17.2342"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex-shrink-0 w-[8rem] text-white font-['Montserrat'] font-medium leading-[120%] uppercase">
                        {manager.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OurTeam;
