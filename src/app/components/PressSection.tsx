"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface IPressRelease {
  _id: string;
  title: string;
  date: string;
  banner?: string;
  summary?: string;
  sections: IPressReleaseSection[];
}

interface IPressReleaseSection {
  type: "heading" | "paragraph" | "quote" | "image";
  content?: string;
  image?: string;
  leftImage?: string;
  rightImage?: string;
}

const PressSection = () => {
  const [allPressReleases, setAllPressReleases] = useState<IPressRelease[]>([]);
  const [pressReleases, setPressReleases] = useState<IPressRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const getFirstParagraph = (sections: IPressReleaseSection[]) => {
    for (const section of sections) {
      if (section.type === "paragraph" && section.content) {
        return section.content;
      }
    }
    return "";
  };

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        const response = await fetch("/api/press-releases");
        if (response.ok) {
          const data = await response.json();
          setAllPressReleases(data);
          setPressReleases(data.slice(0, 2));
        }
      } catch (error) {
        console.error("Error fetching press releases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPressReleases();
  }, []);

  useEffect(() => {
    setPressReleases(showAll ? allPressReleases : allPressReleases.slice(0, 2));
  }, [showAll, allPressReleases]);

  if (loading) {
    return (
      <div className="flex items-center justify-between bg-black px-8 py-10">
        <div className="text-white font-['Playfair Display'] text-[2rem] md:text-[3.5rem] leading-[120%]">
          Latest from Our Press Room
        </div>
        <div className="text-white font-['Montserrat'] font-medium leading-[120%] underline uppercase cursor-pointer">
          Read More
        </div>
      </div>
    );
  }

  if (pressReleases.length === 0) {
    return (
      <div className="flex items-center justify-between bg-black px-8 py-10">
        <div className="text-white font-['Playfair Display'] text-[2rem] md:text-[3.5rem] leading-[120%]">
          Latest from Our Press Room
        </div>
        <div className="text-white font-['Montserrat'] font-medium leading-[120%] underline uppercase cursor-pointer">
          Read More
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black px-8 py-10">
      <div className="flex items-center justify-between mb-10">
        <div className="text-white font-['Playfair Display'] text-[2rem] md:text-[3.5rem] leading-[120%]">
          Latest from Our Press Room
        </div>
        <div
          className="text-white font-['Montserrat'] font-medium leading-[120%] underline uppercase cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Read More"}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {pressReleases.map((release) => (
          <Link key={release._id} href={`/AboutUs/${release._id}`}>
            <div
              className="relative aspect-[5/4] bg-cover bg-center rounded-lg cursor-pointer"
              style={{
                backgroundImage: `url(${release.banner || "/plane0.jpg"})`,
              }}
            >
              <div className="absolute bottom-4 left-4 text-white max-w-[calc(100%-2rem)]">
                <div className="font-['Montserrat'] text-lg mb-2">
                  {release.date}
                </div>
                <div className="font-['Montserrat'] text-lg font-semibold mb-2">
                  {release.title}
                </div>
                <div className="font-['Montserrat'] text-sm max-h-40 overflow-y-auto">
                  {getFirstParagraph(release.sections)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PressSection;
