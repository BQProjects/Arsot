import React from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface PressReleaseSection {
  type?: "heading" | "paragraph" | "quote" | "image";
  blockType?: "heading" | "paragraph" | "quote" | "image";
  content?: string;
  image?: string;
  leftImage?: string;
  rightImage?: string;
  id?: string;
}

interface PressRelease {
  _id: string;
  title: string;
  date: string;
  banner?: string;
  sections: PressReleaseSection[];
  summary?: string;
}

// Helper function to get media URL
async function getMediaUrl(mediaId: string): Promise<string> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/media?where[id][equals]=${mediaId}&depth=0`
    );
    if (response.ok) {
      const data = await response.json();
      if (data.docs && data.docs.length > 0) {
        return data.docs[0].url || "/gulfstream.jpg";
      }
    }
  } catch (error) {
    console.log("Failed to fetch media:", error);
  }
  return "/gulfstream.jpg";
}

async function getPressRelease(id: string): Promise<PressRelease | null> {
  try {
    console.log("Fetching press release with ID:", id);
    const response = await fetch(
      `http://localhost:3000/api/press-releases/${id}?depth=0`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Press release data:", data);

      // Process banner URL if it's a media ID
      if (data.banner && typeof data.banner === "string") {
        try {
          const mediaResponse = await fetch(
            `http://localhost:3000/api/media?where[id][equals]=${data.banner}&depth=0`
          );
          if (mediaResponse.ok) {
            const mediaData = await mediaResponse.json();
            if (mediaData.docs && mediaData.docs.length > 0) {
              data.banner = mediaData.docs[0].url;
            }
          }
        } catch (error) {
          console.log("Failed to fetch banner media:", error);
        }
      }

      // Process section images
      if (data.sections && Array.isArray(data.sections)) {
        for (const section of data.sections) {
          const sectionType = section.type || section.blockType;
          if (sectionType === "image") {
            if (section.leftImage && typeof section.leftImage === "string") {
              section.leftImage = await getMediaUrl(section.leftImage);
            }
            if (section.rightImage && typeof section.rightImage === "string") {
              section.rightImage = await getMediaUrl(section.rightImage);
            }
          }
        }
      }

      return data;
    }
  } catch (error) {
    console.error("Error fetching release:", error);
  }
  return null;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const release = await getPressRelease(resolvedParams.id);

  console.log("Rendered release data:", release);

  if (!release) {
    return <div className="text-center py-8">Release not found</div>;
  }

  return (
    <div className="bg-black">
      <Header />
      <div className="relative h-screen">
        {release.banner && (
          <div
            className="h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${release.banner})` }}
          />
        )}
        {!release.banner && (
          <div className="h-full bg-gray-800 flex items-center justify-center">
            <div className="text-white">No banner image</div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl font-semibold font['Playfair_Display'] mb-4">
            {release.title}
          </h1>
          <div className="w-[558px] h-2 border-t-[0.5px] border-t-[#fff] border-b-[0.5px] border-b-[#fff]" />
        </div>
      </div>
      <div className="max-w-[1258px] mx-auto px-8 py-16">
        {release.summary && (
          <div className=" text-lg font-['Montserrat'] leading-[160%] mb-6">
            {release.summary}
          </div>
        )}
        {release.sections && release.sections.length > 0 ? (
          release.sections.map((section, index) => {
            // Handle both 'type' and 'blockType' fields
            const sectionType = section.type || section.blockType;
            console.log(
              `Rendering section ${index}:`,
              section,
              `Type: ${sectionType}`
            );

            switch (sectionType) {
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
                console.log("Rendering image section:", section);
                return (
                  <div key={index} className="flex mb-8">
                    {section.leftImage && (
                      <Image
                        src={section.leftImage}
                        alt="Left image"
                        width={600}
                        height={300}
                        className="object-cover rounded w-[600px] h-[300px]"
                      />
                    )}
                    {section.rightImage && (
                      <Image
                        src={section.rightImage}
                        alt="Right image"
                        width={600}
                        height={300}
                        className="object-cover rounded w-[600px] h-[300px]"
                      />
                    )}
                    {!section.leftImage && !section.rightImage && (
                      <div className="text-white">
                        No images in this section
                      </div>
                    )}
                  </div>
                );
              default:
                return (
                  <div key={index} className="text-red-500 mb-4">
                    Unknown section type: {sectionType} - Content:{" "}
                    {section.content}
                  </div>
                );
            }
          })
        ) : (
          <div className="text-white">No sections found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
