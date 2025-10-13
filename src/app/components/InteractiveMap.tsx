/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import Image from "next/image";

type Location = {
  image: any;
  name: string;
  coordinates: [number, number];
  description: string;
  contact?: string;
  nearestAirport?: string;
  telephone?: string;
  email?: string;
  website?: string;
  openingHours?: string;
  background?: string;
};

type CountryConfig = {
  code: string; // ISO country name as appears in topojson (e.g., "Argentina")
  center: [number, number];
  zoom: number;
  locations: Location[];
  background?: string;
};

const geoUrl =
  "https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/DATA/world.geojson";
const COUNTRIES: CountryConfig[] = [
  {
    code: "Argentina",
    center: [-64.0, -34.0],
    zoom: 3.2,
    background: "/argentina.jpg",
    locations: [
      {
        name: "La Quiaca (LQC)",
        coordinates: [-65.5775, -22.1844],
        description:
          "VIP handling, fueling coordination, permits, and ground support in La Quiaca.",
        contact:
          "Available via coordination from Jujuy (Gobernador Horacio Guzmán International Airport – JUJ).",
        nearestAirport:
          "La Quiaca Airport (LQC / SASQ) – general aviation, limited infrastructure.",
        telephone: "[+54 xxx xxx xxxx]",
        email: "handling@arsot.aero",
        website: "arsot.aero/laquiaca",
        openingHours:
          "Summer\nMon–Fri: 11:00 – 23:00\nSat: 11:00 – 21:00\nSun: 12:00 – 21:00\nWinter\nMon–Fri: 12:00 – 22:00\nSat: 12:00 – 20:00\nSun: 13:00 – 20:00",
        background: "/laquiaca.jpg",
        image: null,
      },
      {
        name: "Cordoba (COR)",
        coordinates: [-64.1888, -31.4201],
        description: "Regional ops and on-demand concierge services.",
        contact: "Available via coordination.",
        nearestAirport: "Cordoba Airport",
        telephone: "+54 xxx xxx xxxx",
        email: "handling@arsot.aero",
        website: "arsot.aero/cordoba",
        openingHours: "Mon-Fri: 08:00 - 18:00",
        background: "/cordoba.jpg",
        image: null,
      },
    ],
  },
  {
    code: "Peru",
    center: [-75.0, -10.5],
    zoom: 3.4,
    background: "/peru.jpg",
    locations: [
      {
        name: "Lima (LIM)",
        coordinates: [-77.0428, -12.0464],
        description: "Comprehensive aviation support in Lima.",
        contact: "Available via coordination.",
        nearestAirport: "Lima Airport",
        telephone: "+51 xxx xxx xxxx",
        email: "handling@arsot.aero",
        website: "arsot.aero/lima",
        openingHours: "Mon-Fri: 08:00 - 18:00",
        background: "/lima.jpg",
        image: null,
      },
    ],
  },
  {
    code: "Colombia",
    center: [-74.0, 4.5],
    zoom: 3.6,
    background: "/colombia.jpg",
    locations: [
      {
        name: "Bogotá (BOG)",
        coordinates: [-74.0721, 4.711],
        description: "Operations centered in Bogotá.",
        contact: "Available via coordination.",
        nearestAirport: "Bogota Airport",
        telephone: "+57 xxx xxx xxxx",
        email: "handling@arsot.aero",
        website: "arsot.aero/bogota",
        openingHours: "Mon-Fri: 08:00 - 18:00",
        background: "/bogota.jpg",
        image: null,
      },
      {
        name: "Medellín (MDE)",
        coordinates: [-75.5906, 6.219],
        description: "Support for executive movements in Medellín.",
        contact: "Available via coordination.",
        nearestAirport: "Medellin Airport",
        telephone: "+57 xxx xxx xxxx",
        email: "handling@arsot.aero",
        website: "arsot.aero/medellin",
        openingHours: "Mon-Fri: 08:00 - 18:00",
        background: "/medellin.jpg",
        image: null,
      },
    ],
  },
  {
    code: "Costa Rica",
    center: [-84.0, 9.9],
    zoom: 4.0,
    background: "/costarica.jpg",
    locations: [
      {
        name: "San José (SJO)",
        coordinates: [-84.2041, 9.9939],
        description: "Reliable services in San José.",
        contact: "Available via coordination.",
        nearestAirport: "San Jose Airport",
        telephone: "+506 xxx xxx xxxx",
        email: "handling@arsot.aero",
        website: "arsot.aero/sanjose",
        openingHours: "Mon-Fri: 08:00 - 18:00",
        background: "/sanjose.jpg",
        image: null,
      },
    ],
  },
  {
    code: "Uruguay",
    center: [-56.0, -33.0],
    zoom: 4.0,
    background: "/uruguay.jpg",
    locations: [
      {
        name: "Montevideo (MVD)",
        coordinates: [-56.1645, -34.9011],
        description: "Support in Montevideo.",
        contact: "Available via coordination.",
        nearestAirport: "Montevideo Airport",
        telephone: "+598 xxx xxx xxxx",
        email: "handling@arsot.aero",
        website: "arsot.aero/montevideo",
        openingHours: "Mon-Fri: 08:00 - 18:00",
        background: "/montevideo.jpg",
        image: null,
      },
    ],
  },
  {
    code: "Paraguay",
    center: [-57.5, -23.5],
    zoom: 4.2,
    background: "/paraguay.jpg",
    locations: [
      {
        name: "Asunción (ASU)",
        coordinates: [-57.5759, -25.2637],
        description: "Aviation solutions in Asunción.",
        contact: "Available via coordination.",
        nearestAirport: "Asuncion Airport",
        telephone: "+595 xxx xxx xxxx",
        email: "handling@arsot.aero",
        website: "arsot.aero/asuncion",
        openingHours: "Mon-Fri: 08:00 - 18:00",
        background: "/asuncion.jpg",
        image: null,
      },
    ],
  },
];

const SUPPORTED = new Set(COUNTRIES.map((c) => c.code));

export default function InteractiveMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollRef = useRef<HTMLDivElement>(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgroundImages = ["/bg1.jpg", "/bg2.jpg", "/bg3.jpg"];

  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(442);

  const containerHeight = 884;
  const thumbHeightFixed = 120;
  const scrollSpeed = 2;

  // Animated map position and zoom
  const [animatedCenter, setAnimatedCenter] = useState<[number, number]>([
    0, 70,
  ]);
  const [animatedZoom, setAnimatedZoom] = useState(1);

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === selectedCountry) || null,
    [selectedCountry]
  );

  const targetCenter: [number, number] = country?.center || [0, 70];
  const targetZoom = country?.zoom || 1;

  // Animate map transitions
  useEffect(() => {
    const duration = 400; // 400ms transition
    const steps = 30; // 30 frames
    const stepDuration = duration / steps;

    const startCenter: [number, number] = [
      animatedCenter[0],
      animatedCenter[1],
    ];
    const startZoom = animatedZoom;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      // Ease-in-out function
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const easedProgress = easeInOutCubic(progress);

      // Interpolate center
      const newCenter: [number, number] = [
        startCenter[0] + (targetCenter[0] - startCenter[0]) * easedProgress,
        startCenter[1] + (targetCenter[1] - startCenter[1]) * easedProgress,
      ];

      // Interpolate zoom
      const newZoom = startZoom + (targetZoom - startZoom) * easedProgress;

      setAnimatedCenter(newCenter);
      setAnimatedZoom(newZoom);

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetCenter[0], targetCenter[1], targetZoom]);

  const handleThumbDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startTop = thumbTop;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const newTop = Math.min(
        containerHeight - thumbHeightFixed,
        Math.max(0, startTop + deltaY)
      );
      setThumbTop(newTop);

      // scroll content based on thumb movement
      const content = scrollRef.current;
      if (content) {
        const maxScroll = content.scrollHeight - content.clientHeight;
        content.scrollTop =
          (newTop / (containerHeight - thumbHeightFixed)) * maxScroll;
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleScroll = () => {
    const content = scrollRef.current;
    if (content) {
      const maxScroll = content.scrollHeight - content.clientHeight;
      const scrollTop = content.scrollTop;
      const newTop =
        (scrollTop / maxScroll) * (containerHeight - thumbHeightFixed);
      setThumbTop(newTop);
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .scrollable::-webkit-scrollbar {
            width: 2px;
          }
          .scrollable::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollable::-webkit-scrollbar-thumb {
            background: #a46200;
          }
        `,
        }}
      />
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute top-4 right-4 text-white z-10">
          <div className="choose_loc flex flex-col items-start w-[17.125rem] border border-white bg-black/[.32] mt-10">
            <div className="flex items-center gap-4 self-stretch py-2 px-4 h-12">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 16C5.742 16 6.85 16.733 7.78 17.475C8.98 18.429 10.027 19.569 10.826 20.876C11.425 21.856 12 23.044 12 24M12 24C12 23.044 12.575 21.855 13.174 20.876C13.974 19.569 15.021 18.429 16.219 17.475C17.15 16.733 18.26 16 19 16M12 24V0"
                  stroke="#FF9900"
                  strokeWidth="1.33333"
                />
              </svg>
              <div className="choose_location-1 text-[#f90] font-['Montserrat'] font-medium leading-[120%] uppercase">
                Choose Location
              </div>
            </div>
            <div className="w-[17.125rem] h-px bg-neutral-700" />
            {COUNTRIES.map((c, index) => (
              <div key={c.code}>
                <div
                  className={`flex justify-center items-center gap-2 py-2 px-4 cursor-pointer ${
                    selectedCountry === c.code ? "bg-white/[.20]" : ""
                  }`}
                  onClick={() => {
                    setSelectedLocation(null);
                    setSelectedCountry(
                      selectedCountry === c.code ? null : c.code
                    );
                  }}
                >
                  <div className="w-8 h-8 flex-shrink-0">
                    {selectedCountry === c.code && (
                      <svg
                        width={32}
                        height={32}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6261 14.832L23.3221 12.0287C23.8443 11.8193 24.4043 11.7205 24.9667 11.7387C26.4254 11.7834 29.0634 12 28.1441 13.0054C26.8941 14.3714 18.1194 17.7867 15.5261 18.7494C12.9327 19.712 9.72605 20.22 7.50739 20.2627C5.56605 20.3 7.74072 19.1294 7.74072 19.1294C7.74072 19.1294 10.2067 17.7367 11.2987 17.264L13.6821 16.222"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.8 17.4946L4.87535 15.1266L3.66602 15.5466L7.50402 19.266M20.4527 15.1093L10.7513 14.304L9.92602 14.89L16.5327 17.234"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="text-white font-['Montserrat'] font-medium leading-[120%] uppercase flex-1">
                    {c.code}
                  </div>
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.39691 7.73559L11.4244 14.6521C11.5777 14.8038 11.7847 14.8889 12.0004 14.8889C12.2161 14.8889 12.4231 14.8038 12.5764 14.6521L19.6054 7.73709C19.7597 7.58548 19.9674 7.50052 20.1837 7.50052C20.4 7.50052 20.6076 7.58548 20.7619 7.73709C20.8379 7.81116 20.8983 7.89968 20.9395 7.99745C20.9807 8.09521 21.002 8.20024 21.002 8.30634C21.002 8.41244 20.9807 8.51747 20.9395 8.61524C20.8983 8.713 20.8379 8.80153 20.7619 8.87559L13.7359 15.7906C13.2731 16.245 12.6505 16.4996 12.0019 16.4996C11.3533 16.4996 10.7307 16.245 10.2679 15.7906L3.24191 8.87559C3.16571 8.8015 3.10514 8.71289 3.06377 8.61498C3.02241 8.51708 3.0011 8.41187 3.0011 8.30559C3.0011 8.19931 3.02241 8.09411 3.06377 7.9962C3.10514 7.8983 3.16571 7.80968 3.24191 7.73559C3.3962 7.58398 3.60385 7.49902 3.82016 7.49902C4.03647 7.49902 4.24413 7.58398 4.39841 7.73559"
                      fill="white"
                    />
                  </svg>
                </div>
                {selectedCountry === c.code && (
                  <div className="flex flex-col items-start w-[17.125rem]">
                    {c.locations.map((loc) => (
                      <div
                        key={loc.name}
                        className={`flex items-center gap-2 pl-[3.6875rem] py-2 pr-4 w-[17.125rem] cursor-pointer ${
                          selectedLocation?.name === loc.name
                            ? "bg-[#ff9900]/[.30]"
                            : "bg-[#ff9900]/0"
                        }`}
                        onClick={() => setSelectedLocation(loc)}
                      >
                        <div className="w-8 h-8 flex-shrink-0">
                          {selectedLocation?.name === loc.name && (
                            <svg
                              width={32}
                              height={32}
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.6261 14.832L23.3221 12.0287C23.8443 11.8193 24.4043 11.7205 24.9667 11.7387C26.4254 11.7834 29.0634 12 28.1441 13.0054C26.8941 14.3714 18.1194 17.7867 15.5261 18.7494C12.9327 19.712 9.72605 20.22 7.50739 20.2627C5.56605 20.3 7.74072 19.1294 7.74072 19.1294C7.74072 19.1294 10.2067 17.7367 11.2987 17.264L13.6821 16.222"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.8 17.4946L4.87535 15.1266L3.66602 15.5466L7.50402 19.266M20.4527 15.1093L10.7513 14.304L9.92602 14.89L16.5327 17.234"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="text-white font-['Montserrat'] font-medium leading-[120%] uppercase">
                          {loc.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {index < COUNTRIES.length - 1 && (
                  <div className="w-[17.125rem] h-px bg-neutral-700" />
                )}
              </div>
            ))}
            <div className="w-[17.125rem] h-px bg-white" />
          </div>
        </div>

        {/* Full screen map area */}
        <div
          className="w-full h-screen"
          style={{
            backgroundImage: `url(${
              selectedLocation
                ? backgroundImages[backgroundIndex]
                : "/Locations.png"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: animatedCenter,
              scale: 100 * animatedZoom,
            }}
            style={{
              width: "100%",
              height: "100%",
              transition: "all 0.4s ease-in-out",
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = (geo.properties as any).name as string;

                  if (countryName === "Antarctica") return null;

                  const isSupported = SUPPORTED.has(countryName);
                  const isSelected = selectedCountry === countryName;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (!isSupported) return;
                        setSelectedLocation(null);
                        setSelectedCountry(isSelected ? null : countryName);
                      }}
                      style={{
                        default: {
                          fill: isSelected
                            ? "rgba(255,255,255,0.2)"
                            : isSupported
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(255,255,255,0.1)",
                          stroke: "#ffffff",
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: isSupported ? "pointer" : "default",
                        },
                        hover: {
                          fill: isSupported
                            ? "#bbbbbb"
                            : "rgba(255,255,255,0.1)",
                          outline: "none",
                        },
                        pressed: {
                          fill: isSupported
                            ? "#dddddd"
                            : "rgba(255,255,255,0.1)",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* World-level markers: show one pin per supported country */}
            {!country &&
              COUNTRIES.map((c) => (
                <Marker key={c.code} coordinates={c.center}>
                  <g
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedCountry(c.code);
                      setSelectedLocation(null);
                    }}
                  >
                    <svg
                      width="16"
                      height="22"
                      viewBox="0 0 24 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ transform: "translate(-8px, -22px)" }}
                    >
                      <path
                        d="M23.6663 11.9999C23.6663 10.4678 23.3646 8.95074 22.7783 7.53528C22.192 6.11981 21.3326 4.83369 20.2493 3.75034C19.1659 2.66699 17.8798 1.80763 16.4643 1.22132C15.0489 0.635019 13.5318 0.333252 11.9997 0.333252C10.4676 0.333252 8.9505 0.635019 7.53503 1.22132C6.11957 1.80763 4.83345 2.66699 3.7501 3.75034C2.66675 4.83369 1.80738 6.11981 1.22108 7.53528C0.634775 8.95074 0.333008 10.4678 0.333008 11.9999C0.333008 14.3116 1.01467 16.4616 2.17467 18.2749H2.16134L11.9997 33.6666L21.838 18.2749H21.8263C23.0279 16.4026 23.6665 14.2246 23.6663 11.9999ZM11.9997 16.9999C10.6736 16.9999 9.40182 16.4731 8.46414 15.5355C7.52646 14.5978 6.99968 13.326 6.99968 11.9999C6.99968 10.6738 7.52646 9.40207 8.46414 8.46439C9.40182 7.5267 10.6736 6.99992 11.9997 6.99992C13.3258 6.99992 14.5975 7.5267 15.5352 8.46439C16.4729 9.40207 16.9997 10.6738 16.9997 11.9999C16.9997 13.326 16.4729 14.5978 15.5352 15.5355C14.5975 16.4731 13.3258 16.9999 11.9997 16.9999Z"
                        fill="white"
                      />
                    </svg>
                  </g>
                </Marker>
              ))}

            {/* Country-level markers: city/location pins */}
            {country &&
              country.locations.map((loc) => (
                <Marker key={loc.name} coordinates={loc.coordinates}>
                  <g
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedLocation(loc)}
                  >
                    <svg
                      width="16"
                      height="22"
                      viewBox="0 0 24 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ transform: "translate(-8px, -22px)" }}
                    >
                      <path
                        d="M23.6663 11.9999C23.6663 10.4678 23.3646 8.95074 22.7783 7.53528C22.192 6.11981 21.3326 4.83369 20.2493 3.75034C19.1659 2.66699 17.8798 1.80763 16.4643 1.22132C15.0489 0.635019 13.5318 0.333252 11.9997 0.333252C10.4676 0.333252 8.9505 0.635019 7.53503 1.22132C6.11957 1.80763 4.83345 2.66699 3.7501 3.75034C2.66675 4.83369 1.80738 6.11981 1.22108 7.53528C0.634775 8.95074 0.333008 10.4678 0.333008 11.9999C0.333008 14.3116 1.01467 16.4616 2.17467 18.2749H2.16134L11.9997 33.6666L21.838 18.2749H21.8263C23.0279 16.4026 23.6665 14.2246 23.6663 11.9999ZM11.9997 16.9999C10.6736 16.9999 9.40182 16.4731 8.46414 15.5355C7.52646 14.5978 6.99968 13.326 6.99968 11.9999C6.99968 10.6738 7.52646 9.40207 8.46414 8.46439C9.40182 7.5267 10.6736 6.99992 11.9997 6.99992C13.3258 6.99992 14.5975 7.5267 15.5352 8.46439C16.4729 9.40207 16.9997 10.6738 16.9997 11.9999C16.9997 13.326 16.4729 14.5978 15.5352 15.5355C14.5975 16.4731 13.3258 16.9999 11.9997 16.9999Z"
                        fill={
                          selectedLocation?.name === loc.name
                            ? "#FF9900"
                            : "#ffffff"
                        }
                      />
                    </svg>
                  </g>
                </Marker>
              ))}
          </ComposableMap>

          {/* Top left content */}
          {!country && (
            <div className="absolute top-4 left-4 text-white z-10">
              <div className="flex flex-col px-4 items-start gap-6">
                <div className="w-[500px] text-white font-['PlayfairDisplay'] text-[3.5rem] leading-[120%]">
                  Trusted
                  <br />
                  Everywhere
                </div>
                <div className="w-[500px] text-white text-justify font-['Montserrat'] leading-[160%] text-lg">
                  We provide services across Argentina, Paraguay and Uruguay
                  with ground bases strategically located. We are all about
                  detailed logistics, we understand VIP handling
                </div>
                <div className="flex justify-center items-center gap-3 py-3 px-6 h-14 bg-white">
                  <div className="text-[#2e2e2e] font-['Montserrat'] font-medium leading-[120%] uppercase">
                    See Locations
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
                      fill="#2E2E2E"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Bottom left plane icon */}
          {!country && (
            <div className="absolute bottom-0 left-4 text-white z-10">
              <div className="flex flex-col justify-center items-center gap-3 w-28 h-[417px]">
                <div className="w-px h-30 bg-[#f90]" />
                <svg
                  width={50}
                  height={49}
                  viewBox="0 0 74 73"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40.7567 9.90693C41.2494 10.4033 41.6394 10.9918 41.9046 11.639C42.1697 12.2862 42.3047 12.9792 42.3018 13.6786V30.0671L60.2994 37.796C60.4961 37.8745 60.6729 37.9957 60.817 38.1509C60.9612 38.306 61.069 38.4913 61.1328 38.6933L62.7114 43.3926C62.7952 43.6532 62.8083 43.9313 62.7493 44.1986C62.6904 44.4658 62.5615 44.7126 62.3758 44.9137C62.1902 45.1148 61.9545 45.263 61.6928 45.3431C61.4311 45.4233 61.1528 45.4324 60.8864 45.3697L42.3323 40.7038L41.438 56.6573L44.9937 59.3188V64.6356C42.3213 63.9286 39.6517 63.2107 36.985 62.4821C36.985 62.4821 33.7213 63.3794 29.0067 64.6356V59.3188L32.5655 56.6573L31.6651 40.7038L13.114 45.3728C12.8477 45.4345 12.5699 45.4246 12.3087 45.3441C12.0475 45.2636 11.8123 45.1155 11.6269 44.9146C11.4415 44.7138 11.3126 44.4675 11.2532 44.2007C11.1939 43.9339 11.2062 43.6562 11.289 43.3957L12.8676 38.6933C12.9314 38.4913 13.0393 38.306 13.1834 38.1509C13.3275 37.9957 13.5043 37.8745 13.701 37.796L31.6986 30.0671V13.6786C31.6957 12.9792 31.8307 12.2862 32.0959 11.639C32.361 10.9918 32.7511 10.4033 33.2438 9.90693C34.2453 8.92056 35.5945 8.36768 37.0002 8.36768C38.4059 8.36768 39.7552 8.92056 40.7567 9.90693Z"
                    stroke="#FF9900"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="w-px h-30 bg-[#f90]" />
              </div>
            </div>
          )}

          {/* Bottom right location image */}
          {selectedLocation && selectedLocation.background && (
            <div className="absolute bottom-4 right-4 z-10">
              <Image
                src={selectedLocation.background}
                alt={selectedLocation.name}
                width={64}
                height={64}
                className="rounded"
              />
            </div>
          )}

          {/* Sidebar */}
          {selectedLocation ? (
            <div className="absolute top-0 left-0 text-white z-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="city flex-shrink-0 w-[414px] h-screen flex flex-col overflow-hidden relative">
                {/* Custom orange scrollbar */}
                <div
                  className="absolute left-0 w-2 bg-[#ff9900] rounded cursor-pointer z-10"
                  style={{
                    height: thumbHeight + "px",
                    top: thumbTop + "px",
                  }}
                  onMouseDown={handleThumbDrag}
                />

                {/* Header */}
                <div className="sticky top-0 z-10 flex pt-[6.5rem] pb-4 px-8">
                  <h1 className="text-[#f90] font-['Playfair_Display'] text-[3.5rem] leading-[120%]">
                    {selectedLocation.name.split(" (")[0]}
                  </h1>
                </div>

                {/* Scrollable content */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-8 pb-10 space-y-10 select-none"
                  onScroll={handleScroll}
                >
                  <p className="text-white text-justify font-['Montserrat'] leading-[160%]">
                    “{selectedLocation.description}”
                  </p>

                  <div className="space-y-4 text-white font-['Montserrat'] leading-[160%] uppercase">
                    <p>Contact: {selectedLocation.contact}</p>
                    <p>Nearest Airport: {selectedLocation.nearestAirport}</p>
                    <p>
                      Telephone: {selectedLocation.telephone}
                      <br />
                      E-mail: {selectedLocation.email}
                      <br />
                      Website: {selectedLocation.website}
                    </p>
                  </div>

                  <div className="space-y-2 text-white font-['Montserrat'] leading-[160%] uppercase">
                    {selectedLocation.openingHours
                      ? selectedLocation.openingHours
                          .split("\n")
                          .map((line: string, index: number) => (
                            <p key={index}>{line}</p>
                          ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          ) : country ? (
            <div className="absolute top-0 left-0 text-white z-10">
              <div className="country flex flex-col flex-shrink-0 items-center gap-2 pb-[533px] w-[414px] h-[884px] bg-black/50">
                <div className="header_of_location_card flex pt-[6.5rem] pb-4 px-10 w-[414px]">
                  <div className="flex-shrink-0 text-[#f90] font-['PlayfairDisplay'] text-[3.5rem]">
                    {country.code}
                  </div>
                </div>
                <div className="flex px-10 flex-col items-start gap-10 self-stretch text-white text-justify font-['Montserrat'] leading-[160%]">
                  Our FBO locations across {country.code} provide premium ground
                  handling, fueling, and passenger services. Each location
                  offers tailored solutions for business aviation, ensuring
                  seamless travel experiences.
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
