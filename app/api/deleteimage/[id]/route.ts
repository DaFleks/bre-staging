import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

//  DELETE IMAGE
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await utapi.deleteFiles(params.id);
  } catch (error) {
    console.log(error);
  }

  return new NextResponse("Success", { status: 200 });
}
