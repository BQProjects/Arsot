import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const fboManagers = await payload.find({
      collection: "fbo-managers",
      limit: 100,
    });

    return NextResponse.json(fboManagers.docs);
  } catch (error) {
    console.error("Error fetching FBO managers:", error);
    return NextResponse.json(
      { error: "Failed to fetch FBO managers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = await getPayload({ config });

    const newFboManager = await payload.create({
      collection: "fbo-managers",
      data: body,
    });

    return NextResponse.json(newFboManager);
  } catch (error) {
    console.error("Error creating FBO manager:", error);
    return NextResponse.json(
      { error: "Failed to create FBO manager" },
      { status: 500 }
    );
  }
}
