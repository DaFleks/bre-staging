import connectMongo from "@/lib/connectMongo";
import SkuCount from "@/models/skuCountModel";
import { NextResponse } from "next/server";

export async function GET() {
  let currentCount = 0;
  const id = "64a47966fde540527b18d937";
  try {
    await connectMongo();
    const count = await SkuCount.findById(id);
    currentCount = count.skuCount;
  } catch (error) {
    console.log(error);
  } finally {
  }

  return NextResponse.json({ currentCount: currentCount });
}
