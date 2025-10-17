import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import CrewBrief from "../../../../models/CrewBrief";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Crew Brief ID is required" },
        { status: 400 }
      );
    }

    const brief = await CrewBrief.findById(id);

    if (!brief) {
      return NextResponse.json(
        { error: "Crew Brief not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(brief);
  } catch (error) {
    console.error("Error fetching crew brief:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const { title, date, banner, sections } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Crew Brief ID is required" },
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

    const updatedBrief = await CrewBrief.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        date: date.trim(),
        banner: banner || undefined,
        sections,
        summary,
      },
      { new: true }
    );

    if (!updatedBrief) {
      return NextResponse.json(
        { error: "Crew Brief not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBrief);
  } catch (error) {
    console.error("Error updating crew brief:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Crew Brief ID is required" },
        { status: 400 }
      );
    }

    const deletedBrief = await CrewBrief.findByIdAndDelete(id);

    if (!deletedBrief) {
      return NextResponse.json(
        { error: "Crew Brief not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Crew Brief deleted successfully" });
  } catch (error) {
    console.error("Error deleting crew brief:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
