"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface CrewBriefSection {
  blockType: "heading" | "paragraph" | "quote" | "image";
  blockName?: string;
  content?: string;
  image?: {
    url: string;
    alt?: string;
  };
  leftImage?: {
    url: string;
    alt?: string;
  };
  rightImage?: {
    url: string;
    alt?: string;
  };
}

interface CrewBrief {
  id: string;
  title: string;
  date: string;
  banner?: {
    url: string;
    alt?: string;
  };
  sections: CrewBriefSection[];
  summary?: string;
  createdAt: string;
  updatedAt: string;
}

function Page({ params }: { params: Promise<{ Brief: string }> }) {
  const resolvedParams = use(params);
  const [brief, setBrief] = useState<CrewBrief | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrief = async () => {
      try {
        const response = await fetch(
          `/api/crew-briefs/${resolvedParams.Brief}`
        );
        if (response.ok) {
          const data = await response.json();
          setBrief(data);
        }
      } catch (error) {
        console.error("Error fetching brief:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrief();
  }, [resolvedParams.Brief]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!brief) {
    return <div className="text-center py-8">Brief not found</div>;
  }

  return (
    <div className="bg-black">
      <Header />
      <div className="relative h-screen">
        {brief.banner && (
          <div
            className="h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${brief.banner.url})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl font-semibold font['Playfair_Display'] mb-4">
            {brief.title}
          </h1>
          <div className="w-[558px] h-2 border-t-[0.5px] border-t-[#fff] border-b-[0.5px] border-b-[#fff]" />
        </div>
      </div>
      <div className="max-w-[1258px] mx-auto px-8 py-16">
        {brief.summary && (
          <div className=" text-lg font-['Montserrat'] leading-[160%] mb-6">
            {brief.summary}
          </div>
        )}
        {brief.sections.map((section, index) => {
          switch (section.blockType) {
            case "heading":
              return (
                <div
                  key={index}
                  className="text-white font-['Montserrat'] text-xl leading-[140%] uppercase mb-4"
                >
                  {section.content}
                </div>
              );
            case "paragraph":
              return (
                <div
                  key={index}
                  className="text-white font-['Montserrat'] text-lg leading-[160%] mb-4"
                >
                  {section.content}
                </div>
              );
            case "quote":
              return (
                <div
                  key={index}
                  className="text-white font-['Playfair_Display'] text-5xl leading-[120%] mb-4"
                >
                  {"\u201C"}
                  {section.content}
                  {"\u201D"}
                </div>
              );
            case "image":
              return (
                <div key={index} className="flex mb-8">
                  {section.leftImage && (
                    <Image
                      src={section.leftImage.url}
                      alt={section.leftImage.alt || "Left image"}
                      width={600}
                      height={300}
                      className="object-cover rounded w-[600px] h-[300px]"
                    />
                  )}
                  {section.rightImage && (
                    <Image
                      src={section.rightImage.url}
                      alt={section.rightImage.alt || "Right image"}
                      width={600}
                      height={300}
                      className="object-cover rounded w-[600px] h-[300px]"
                    />
                  )}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Page;
