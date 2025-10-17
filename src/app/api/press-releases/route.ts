import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import PressRelease from "../../../models/PressRelease";

export async function GET() {
  try {
    await dbConnect();

    const pressReleases = await PressRelease.find({}).sort({ createdAt: -1 });

    return NextResponse.json(pressReleases);
  } catch (error) {
    console.error("Error fetching press releases:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { title, date, banner, sections } = await request.json();

    // Validate required fields
    if (!title || !date || !sections || sections.length === 0) {
      return NextResponse.json(
        { error: "Title, date, and at least one section are required" },
        { status: 400 }
      );
    }

    // Generate summary from first paragraph or heading
    let summary = "";
    for (const section of sections) {
      if (section.type === "paragraph" && section.content) {
        summary =
          section.content.substring(0, 100) +
          (section.content.length > 100 ? "..." : "");
        break;
      }
    }

    // Create new press release
    const newPressRelease = new PressRelease({
      title: title.trim(),
      date: date.trim(),
      banner: banner || undefined,
      sections,
      summary,
    });

    const savedPressRelease = await newPressRelease.save();

    return NextResponse.json(savedPressRelease, { status: 201 });
  } catch (error) {
    console.error("Error creating press release:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
