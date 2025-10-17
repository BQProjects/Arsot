import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import CrewBrief from "../../../models/CrewBrief";

export async function GET() {
  try {
    await dbConnect();

    const briefs = await CrewBrief.find({}).sort({ createdAt: -1 });

    return NextResponse.json(briefs);
  } catch (error) {
    console.error("Error fetching crew briefs:", error);
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

    // Create new crew brief
    const newBrief = new CrewBrief({
      title: title.trim(),
      date: date.trim(),
      banner: banner || undefined,
      sections,
      summary,
    });

    const savedBrief = await newBrief.save();

    return NextResponse.json(savedBrief, { status: 201 });
  } catch (error) {
    console.error("Error creating crew brief:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
