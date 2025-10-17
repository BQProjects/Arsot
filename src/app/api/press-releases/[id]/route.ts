import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import PressRelease from "../../../../models/PressRelease";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Press Release ID is required" },
        { status: 400 }
      );
    }

    const pressRelease = await PressRelease.findById(id);

    if (!pressRelease) {
      return NextResponse.json(
        { error: "Press Release not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(pressRelease);
  } catch (error) {
    console.error("Error fetching press release:", error);
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
        { error: "Press Release ID is required" },
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

    const updatedPressRelease = await PressRelease.findByIdAndUpdate(
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

    if (!updatedPressRelease) {
      return NextResponse.json(
        { error: "Press Release not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPressRelease);
  } catch (error) {
    console.error("Error updating press release:", error);
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
        { error: "Press Release ID is required" },
        { status: 400 }
      );
    }

    const deletedPressRelease = await PressRelease.findByIdAndDelete(id);

    if (!deletedPressRelease) {
      return NextResponse.json(
        { error: "Press Release not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Press Release deleted successfully" });
  } catch (error) {
    console.error("Error deleting press release:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
