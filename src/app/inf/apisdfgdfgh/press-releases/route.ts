import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const pressReleases = await payload.find({
      collection: "press-releases",
      limit: 100,
    });

    return NextResponse.json(pressReleases.docs);
  } catch (error) {
    console.error("Error fetching press releases:", error);
    return NextResponse.json(
      { error: "Failed to fetch press releases" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = await getPayload({ config });

    const newPressRelease = await payload.create({
      collection: "press-releases",
      data: body,
    });

    return NextResponse.json(newPressRelease);
  } catch (error) {
    console.error("Error creating press release:", error);
    return NextResponse.json(
      { error: "Failed to create press release" },
      { status: 500 }
    );
  }
}
