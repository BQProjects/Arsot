"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface IPressRelease {
  id: string;
  title: string;
  date: string;
  banner?:
    | {
        url: string;
        alt?: string;
      }
    | string;
  bannerUrl?: string; // Add this for processed banner URL
  summary?: string;
  sections: IPressReleaseSection[];
  createdAt: string;
  updatedAt: string;
}

interface IPressReleaseSection {
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

const PressSection = () => {
  const [allPressReleases, setAllPressReleases] = useState<IPressRelease[]>([]);
  const [pressReleases, setPressReleases] = useState<IPressRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Function to get media URL
  const getMediaUrl = async (mediaId: string): Promise<string> => {
    try {
      console.log("Fetching media for ID:", mediaId);
      const response = await fetch(
        `/api/media?where[id][equals]=${mediaId}&depth=0`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Media API response:", data);
        if (data.docs && data.docs.length > 0) {
          const mediaUrl = data.docs[0].url;
          console.log("Found media URL:", mediaUrl);
          return mediaUrl || "/plane0.jpg";
        }
      }
    } catch (error) {
      console.log("Failed to fetch media:", error);
    }
    console.log("Using fallback image for media ID:", mediaId);
    return "/plane0.jpg";
  };

  const getFirstParagraph = (sections: IPressReleaseSection[]) => {
    for (const section of sections) {
      if (section.blockType === "paragraph" && section.content) {
        return section.content;
      }
    }
    return "";
  };

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        const response = await fetch("/api/press-releases?depth=0&limit=10");
        if (response.ok) {
          const data = await response.json();
          console.log("Press releases data:", data); // Debug log
          const releases = data.docs || [];

          // Process banner URLs for each release
          const releasesWithBanners = await Promise.all(
            releases.map(async (release: Record<string, unknown>) => {
              console.log(
                "Processing release:",
                release.title,
                "Banner:",
                release.banner
              );
              if (release.banner && typeof release.banner === "string") {
                console.log(
                  "Fetching banner URL for release:",
                  release.title,
                  "Banner ID:",
                  release.banner
                );
                release.bannerUrl = await getMediaUrl(release.banner);
                console.log(
                  "Got banner URL for",
                  release.title,
                  ":",
                  release.bannerUrl
                );
              } else if (
                typeof release.banner === "object" &&
                release.banner &&
                typeof release.banner === "object" &&
                "url" in release.banner
              ) {
                release.bannerUrl = (release.banner as { url: string }).url;
              } else {
                console.log(
                  "No banner or invalid banner format for release:",
                  release.title
                );
                release.bannerUrl = "/plane0.jpg";
              }
              return release as unknown as IPressRelease;
            })
          );

          setAllPressReleases(releasesWithBanners);
          setPressReleases(releasesWithBanners.slice(0, 2));
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
        {pressReleases.map((release) => {
          // Use the processed bannerUrl or fallback
          const bannerUrl =
            release.bannerUrl ||
            (typeof release.banner === "object" && release.banner?.url) ||
            "/plane0.jpg";

          return (
            <Link key={release.id} href={`/AboutUs/${release.id}`}>
              <div
                className="relative aspect-[5/4] bg-cover bg-center rounded-lg cursor-pointer"
                style={{
                  backgroundImage: `url(${bannerUrl})`,
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
          );
        })}
      </div>
    </div>
  );
};

export default PressSection;
