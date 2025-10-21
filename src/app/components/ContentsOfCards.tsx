"use client";

import React from "react";
import Image from "next/image";

const originalCards = [
  {
    image: "/plane0.jpg",
    alt: "Wing of an aircraft flying over a desert landscape",
    name: "Martin Alvarez",
    description:
      "Martin oversees every crew transition in Buenos Aires, coordinating services so international operators can turn flights around without delay.",
    location: "Buenos Aires, Argentina",
  },
  {
    image: "/plane1.jpg",
    alt: "Aircraft following the coastline at golden hour",
    name: "Sophie Bennett",
    description:
      "Sophie leads ramp operations along the Mediterranean corridor, tailoring briefings for long-range missions and VIP passengers alike.",
    location: "Nice, France",
  },
  {
    image: "/plane2.jpg",
    alt: "Jet flying over a canyon at sunrise",
    name: "Akira Tanaka",
    description:
      "Akira brings precision planning to every sortie, aligning handlers and flight crews so complex Asia-Pacific itineraries stay on schedule.",
    location: "Tokyo, Japan",
  },
  {
    image: "/plane3.jpg",
    alt: "Aircraft wing cruising above broken cloud layers",
    name: "Layla Hassan",
    description:
      "Layla orchestrates concierge support and ground logistics for charter operators navigating the Middle East's busiest hubs.",
    location: "Dubai, UAE",
  },
];

const cards = [...originalCards, ...originalCards];

const AUTOPLAY_INTERVAL_MS = 2000;

const ContentsOfCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const intervalRef = React.useRef<number | null>(null);
  const totalCards = originalCards.length;

  const clearTimer = React.useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (isPaused) {
      clearTimer();
      return;
    }

    clearTimer();
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, AUTOPLAY_INTERVAL_MS);

    return clearTimer;
  }, [clearTimer, isPaused, totalCards]);

  const goTo = React.useCallback(
    (index: number) => {
      const wrappedIndex = (index + totalCards) % totalCards;
      setActiveIndex(wrappedIndex);
    },
    [totalCards]
  );

  const pauseAutoplay = (state: boolean) => () => setIsPaused(state);

  return (
    <div
      className="relative w-full max-w-[736px] mx-auto overflow-hidden rounded-xl"
      onMouseEnter={pauseAutoplay(true)}
      onMouseLeave={pauseAutoplay(false)}
    >
      <div
        className="flex gap-4 transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 50}%)` }}
      >
        {cards.map((card, index) => {
          const isActive = index % totalCards === activeIndex;

          return (
            <div
              key={`${card.image}-${index}`}
              className="relative w-[calc(50%-14px)] flex-shrink-0"
            >
              <div className="relative h-[556px] w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 720px"
                  className="object-cover"
                  priority={index === 0}
                />
                {!isActive && <div className="absolute inset-0 bg-black/30" />}
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-60"
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-8 text-white transition-all duration-500 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                >
                  <p className="font-['Montserrat'] text-base uppercase tracking-[0.2em] text-white/70">
                    {card.location}
                  </p>
                  <h3 className="font-['Montserrat'] text-2xl leading-[140%]">
                    {card.name}
                  </h3>
                  <p className="font-['Montserrat'] text-sm leading-[160%] text-white/80">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {originalCards.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            className={`h-[6px] rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-8 bg-white" : "w-3 bg-white/40"
            }`}
            aria-label={`Show card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentsOfCards;
