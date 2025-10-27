import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(request: NextRequest) {
  console.log("🔄 Auth request received");

  try {
    console.log("🔄 Connecting to database...");
    await dbConnect();
    console.log("✅ Database connected successfully");

    const { email, password } = await request.json();
    console.log("🔄 Request data:", {
      email,
      passwordLength: password?.length,
    });

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log("🔄 Looking for user with email:", email.toLowerCase());
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log("✅ User found:", {
      id: user._id,
      email: user.email,
      role: user.role,
    });

    // Check password
    console.log("🔄 Verifying password...");
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("❌ Password invalid");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log("✅ Password valid");

    // Create JWT token
    console.log("🔄 Creating JWT token...");
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      "bdcff81d27bb513a6eb30d7093cfad5474691826702ed1466500e5a4446171a664769ea3546f14f07c0623748059d75446e359beddf4ef022523677596fd2c58",
      { expiresIn: "7d" }
    );

    console.log("✅ JWT token created successfully");

    // Return token and user info (excluding password)
    const userResponse = {
      id: user._id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    console.log("✅ Login successful for user:", userResponse.email);
    return NextResponse.json({
      message: "Login successful",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "Unknown error"
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
