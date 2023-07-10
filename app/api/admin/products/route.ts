import connectMongo from "@/lib/connectMongo";
import Product from "@/models/productModel";
import SkuCount from "@/models/skuCountModel";
import { NextResponse } from "next/server";

//  GET ALL PRODUCTS
export async function GET(req: Request) {
  let products = [];
  try {
    await connectMongo();
    products = await Product.find({});
  } catch (error) {
    console.log(error);
    return new NextResponse("An error has occurred.", {
      status: 400,
    });
  }
  return NextResponse.json({ products });
}

// ADD NEW PRODUCT
export async function POST(req: Request) {
  const id = "64a47966fde540527b18d937";

  try {
    const body = await req.json();
    const count = body.count;
    const { title, image, sku, stock, description, price, isActive } = body.values;

    await connectMongo();

    try {
      const product = await Product.create({
        title: title,
        image: image,
        sku: sku !== "" ? sku : `BRE-${count + 1}`,
        stock: stock,
        description: description,
        price: price.toFixed(2),
        isActive: isActive,
      });

    } catch (error: any) {
      console.log(error);
      if (error.code === 11000) {
        return new NextResponse("A product already has that SKU.", {
          status: 409,
        });
      } else {
        return new NextResponse("An error has occurred.", {
          status: 400,
        });
      }
    }

    await SkuCount.findByIdAndUpdate(id, {
      skuCount: count + 1,
    });
  } catch (error) {
    console.log(error);
    return new Response("An error has occurred.", {
      status: 400,
    });
  }
  return new NextResponse("OK!", { status: 200 });
}
