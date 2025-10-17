"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface Service {
  title: string;
  description: string;
  image: string;
}

interface MenuItemProps {
  service: Service;
  index: number;
  activeCardIndex: MotionValue<number>;
  // onItemClick: (index: number) => void;
}

interface CardProps {
  service: Service;
  index: number;
  progress: MotionValue<number>;
  cardsLength: number;
}

const services: Service[] = [
  {
    title: "Ground Handling & FBO",
    description:
      "From touchdown to takeoff, our team manages every operational detail with care and precision. ARSOT's FBO network provides efficient ground support, crew coordination, and passenger comfort — ensuring seamless transitions at every destination.",
    image:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
  },
  {
    title: "Trip Management",
    description:
      "Comprehensive trip planning and management services to ensure smooth and efficient travel.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
  },
  {
    title: "Aircraft Management",
    description:
      "Full aircraft management solutions including maintenance, scheduling, and compliance.",
    image:
      "https://images.unsplash.com/photo-1583521214690-73421a1829a9?w=800&q=80",
  },
  {
    title: "Fuel Service",
    description:
      "Reliable and efficient fuel services for all your aviation needs.",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
  },
  {
    title: "Charter Service",
    description:
      "Private charter services for personalized and flexible travel options.",
    image:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80",
  },
  {
    title: "VIP Meet Greet Services",
    description:
      "Exclusive VIP meet and greet services for premium passenger experience.",
    image:
      "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80",
  },
];

const MenuItem: React.FC<MenuItemProps> = ({
  service,
  index,
  activeCardIndex,
  // onItemClick,
}) => {
  const color = useTransform(activeCardIndex, (activeIndex) =>
    activeIndex === index ? "#f90" : "rgba(255, 255, 255, 0.7)"
  );

  return (
    <motion.div
      className="transition-colors duration-300 cursor-pointer"
      style={{ color }}
      whileHover={{ color: "#f90" }}
      // onClick={() => onItemClick(index)}
    >
      {service.title}
    </motion.div>
  );
};

const Card: React.FC<CardProps> = ({ service, index, progress, cardsLength }) => {
  const scale = useTransform(progress, [0, 1], [1, 0.85]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-[100px] h-[500px] w-full bg-[#1e1e1e] overflow-hidden shadow-2xl rounded-xl origin-top mb-10"
    >
      <div className="flex h-full flex-col lg:flex-row">
        <div className="flex flex-col px-10 py-10 lg:w-2/5 text-white backdrop-blur-sm">
          <h3 className="font-sans text-2xl font-semibold uppercase mb-4 text-[#f90]">
            {service.title}
          </h3>
          <p className="font-sans text-sm leading-relaxed text-white/90">
            {service.description}
          </p>
        </div>
        <div className="lg:w-3/5 relative bg-gray-800">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>
    </motion.div>
  );
};

const ScrollStackedCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Highlight the active card based on scroll
  const activeCardIndex = useTransform(scrollYProgress, (progress) => {
    const totalCards = services.length;
    const index = Math.round(progress * (totalCards - 1));
    return Math.max(0, Math.min(index, totalCards - 1));
  });

  // Scroll to center card when menu clicked
  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;

    const cardElements = Array.from(containerRef.current.children) as HTMLElement[];
    if (cardElements[index]) {
      const cardTop = cardElements[index].offsetTop;
      const cardHeight = cardElements[index].offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollPosition = cardTop - viewportHeight / 2 + cardHeight / 2;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <section className="relative w-full bg-black py-20">
        <div className="mx-auto px-6 md:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            {/* Left Menu */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="flex flex-col items-start gap-6 text-white/90">
                <div className="w-full">
                  <div className="h-2 border-[0.8px] border-white/80 mb-6" />

                  <h2 className="text-3xl font-bold mb-8 text-white">
                    Our Services
                  </h2>

                  <nav className="flex flex-col gap-5 font-sans text-base tracking-wide">
                    {services.map((service, index) => (
                      <MenuItem
                        key={index}
                        service={service}
                        index={index}
                        activeCardIndex={activeCardIndex}
                        // onItemClick={scrollToCard}
                      />
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Right Cards */}
            <div
              ref={containerRef}
              className="relative"
              style={{ height: `${services.length * 550}px` }} // enough height for all cards
            >
              {services.map((service, index) => (
                <Card
                  key={index}
                  service={service}
                  index={index}
                  progress={scrollYProgress}
                  cardsLength={services.length}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollStackedCards;
