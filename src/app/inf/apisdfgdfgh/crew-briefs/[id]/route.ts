import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await getPayload({ config });
    const { id } = params;

    const crewBrief = await payload.findByID({
      collection: "crew-briefs",
      id,
    });

    return NextResponse.json(crewBrief);
  } catch (error) {
    console.error("Error fetching crew brief:", error);
    return NextResponse.json(
      { error: "Failed to fetch crew brief" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const payload = await getPayload({ config });
    const { id } = params;

    const updatedCrewBrief = await payload.update({
      collection: "crew-briefs",
      id,
      data: body,
    });

    return NextResponse.json(updatedCrewBrief);
  } catch (error) {
    console.error("Error updating crew brief:", error);
    return NextResponse.json(
      { error: "Failed to update crew brief" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await getPayload({ config });
    const { id } = params;

    await payload.delete({
      collection: "crew-briefs",
      id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting crew brief:", error);
    return NextResponse.json(
      { error: "Failed to delete crew brief" },
      { status: 500 }
    );
  }
}
