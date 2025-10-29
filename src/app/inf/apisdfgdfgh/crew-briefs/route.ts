import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const crewBriefs = await payload.find({
      collection: "crew-briefs",
      limit: 100,
    });

    return NextResponse.json(crewBriefs.docs);
  } catch (error) {
    console.error("Error fetching crew briefs:", error);
    return NextResponse.json(
      { error: "Failed to fetch crew briefs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = await getPayload({ config });

    const newCrewBrief = await payload.create({
      collection: "crew-briefs",
      data: body,
    });

    return NextResponse.json(newCrewBrief);
  } catch (error) {
    console.error("Error creating crew brief:", error);
    return NextResponse.json(
      { error: "Failed to create crew brief" },
      { status: 500 }
    );
  }
}
