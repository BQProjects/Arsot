/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

type Location = {
  name: string;
  coordinates: [number, number];
  description: string;
};

type CountryConfig = {
  code: string; // ISO country name as appears in topojson (e.g., "Argentina")
  center: [number, number];
  zoom: number;
  locations: Location[];
};

const geoUrl =
  "https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/DATA/world.geojson";
const COUNTRIES: CountryConfig[] = [
  {
    code: "Argentina",
    center: [-64.0, -34.0],
    zoom: 3.2,
    locations: [
      {
        name: "Buenos Aires (EZE/AEP)",
        coordinates: [-58.3816, -34.6037],
        description:
          "VIP handling, fueling coordination, permits, and ground support in BA.",
      },
      {
        name: "Cordoba (COR)",
        coordinates: [-64.1888, -31.4201],
        description: "Regional ops and on-demand concierge services.",
      },
    ],
  },
  {
    code: "Peru",
    center: [-75.0, -10.5],
    zoom: 3.4,
    locations: [
      {
        name: "Lima (LIM)",
        coordinates: [-77.0428, -12.0464],
        description: "Comprehensive aviation support in Lima.",
      },
    ],
  },
  {
    code: "Colombia",
    center: [-74.0, 4.5],
    zoom: 3.6,
    locations: [
      {
        name: "Bogotá (BOG)",
        coordinates: [-74.0721, 4.711],
        description: "Operations centered in Bogotá.",
      },
      {
        name: "Medellín (MDE)",
        coordinates: [-75.5906, 6.219],
        description: "Support for executive movements in Medellín.",
      },
    ],
  },
  {
    code: "Costa Rica",
    center: [-84.0, 9.9],
    zoom: 4.0,
    locations: [
      {
        name: "San José (SJO)",
        coordinates: [-84.2041, 9.9939],
        description: "Reliable services in San José.",
      },
    ],
  },
  {
    code: "Uruguay",
    center: [-56.0, -33.0],
    zoom: 4.0,
    locations: [
      {
        name: "Montevideo (MVD)",
        coordinates: [-56.1645, -34.9011],
        description: "Support in Montevideo.",
      },
    ],
  },
  {
    code: "Paraguay",
    center: [-57.5, -23.5],
    zoom: 4.2,
    locations: [
      {
        name: "Asunción (ASU)",
        coordinates: [-57.5759, -25.2637],
        description: "Aviation solutions in Asunción.",
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

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === selectedCountry) || null,
    [selectedCountry]
  );

  const mapCenter: [number, number] = country?.center || [0, 40];
  const mapZoom = country?.zoom || 1.1;

  return (
    <div className="relative w-full min-h-screen">
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
        className="w-screen h-screen"
        style={{
          backgroundImage: "url(/Locations.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: mapCenter, scale: 100 * mapZoom }}
          style={{ width: "100%", height: "100%" }}
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
                          ? "#cccccc"
                          : isSupported
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.1)",
                        stroke: "#ffffff",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: isSupported ? "pointer" : "default",
                      },
                      hover: {
                        fill: isSupported ? "#bbbbbb" : "rgba(255,255,255,0.1)",
                        outline: "none",
                      },
                      pressed: {
                        fill: isSupported ? "#dddddd" : "rgba(255,255,255,0.1)",
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
                  <circle
                    r={12}
                    className="animate-ping opacity-30"
                    fill="#ffffff"
                  />
                  <circle r={5} fill="#ffffff" />
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
                  {selectedLocation?.name === loc.name ? (
                    <circle
                      r={12}
                      className="animate-ping opacity-40"
                      fill="#ffcc00"
                    />
                  ) : null}
                  <circle
                    r={selectedLocation?.name === loc.name ? 7 : 5}
                    fill={
                      selectedLocation?.name === loc.name
                        ? "#ffcc00"
                        : "#ffffff"
                    }
                  />
                </g>
              </Marker>
            ))}
        </ComposableMap>

        {/* Location details card */}
        {selectedLocation && (
          <div className="absolute bottom-8 left-8 bg-black/80 text-white rounded p-4 border border-gray-700 max-w-sm">
            <div className="text-sm text-[#f90] mb-1 font-['Montserrat'] uppercase tracking-wide">
              {country?.code}
            </div>
            <h3 className="text-2xl font-['PlayfairDisplay'] font-bold mb-2">
              {selectedLocation.name}
            </h3>
            <p className="text-gray-300 mb-3 font-['Montserrat']">
              {selectedLocation.description}
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-2 bg-white text-black rounded font-['Montserrat']"
                onClick={() =>
                  window?.scrollTo?.({ top: 0, behavior: "smooth" })
                }
              >
                Request a quote
              </button>
              <button
                className="px-3 py-2 border border-white/30 rounded font-['Montserrat']"
                onClick={() => setSelectedLocation(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
