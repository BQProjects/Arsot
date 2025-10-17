import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import FBOManager from "../../../models/FBOManager";

export async function GET() {
  try {
    await dbConnect();

    const managers = await FBOManager.find({}).sort({ createdAt: -1 });

    return NextResponse.json(managers);
  } catch (error) {
    console.error("Error fetching FBO managers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { name, email, phone, role, location, about, photo } =
      await request.json();

    // Validate required fields
    if (!name || !email || !phone || !role || !location || !about) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingManager = await FBOManager.findOne({
      email: email.toLowerCase(),
    });
    if (existingManager) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Create new FBO manager
    const newManager = new FBOManager({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      role: role.trim(),
      location: location.trim(),
      about: about.trim(),
      photo: photo || undefined,
    });

    const savedManager = await newManager.save();

    return NextResponse.json(savedManager, { status: 201 });
  } catch (error) {
    console.error("Error creating FBO manager:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
