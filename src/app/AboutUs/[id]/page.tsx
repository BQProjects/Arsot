import React from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface PressReleaseSection {
  type: "heading" | "paragraph" | "quote" | "image";
  content?: string;
  image?: string;
  leftImage?: string;
  rightImage?: string;
}

interface PressRelease {
  _id: string;
  title: string;
  date: string;
  banner?: string;
  sections: PressReleaseSection[];
  summary?: string;
}

async function getPressRelease(id: string): Promise<PressRelease | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/press-releases/${id}`, {
      cache: 'no-store'
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error("Error fetching release:", error);
  }
  return null;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const release = await getPressRelease(resolvedParams.id);

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
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl font-semibold font['Playfair_Display'] mb-4">
            {release.title}
          </h1>
          <div className="w-[558px] h-2 border-t-[0.5px] border-t-[#fff] border-b-[0.5px] border-b-[#fff]" />
        </div>
      </div>
      <div className="max-w-[1258px] mx-auto px-8 py-16">
        {release.sections.map((section, index) => {
          switch (section.type) {
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
