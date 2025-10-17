import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import FBOManager from "../../../../models/FBOManager";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const { name, email, phone, role, location, about, photo } =
      await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Manager ID is required" },
        { status: 400 }
      );
    }

    // Check if email already exists for another manager
    const existingManager = await FBOManager.findOne({
      email: email.toLowerCase(),
      _id: { $ne: id },
    });
    if (existingManager) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const updatedManager = await FBOManager.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        role: role.trim(),
        location: location.trim(),
        about: about.trim(),
        photo: photo || undefined,
      },
      { new: true }
    );

    if (!updatedManager) {
      return NextResponse.json(
        { error: "FBO Manager not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedManager);
  } catch (error) {
    console.error("Error updating FBO manager:", error);
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
        { error: "Manager ID is required" },
        { status: 400 }
      );
    }

    const deletedManager = await FBOManager.findByIdAndDelete(id);

    if (!deletedManager) {
      return NextResponse.json(
        { error: "FBO Manager not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "FBO Manager deleted successfully" });
  } catch (error) {
    console.error("Error deleting FBO manager:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
