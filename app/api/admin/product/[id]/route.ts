import connectMongo from "@/lib/connectMongo";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

//  GET PRODUCT
export async function GET(req: Request, { params }: { params: { id: string } }) {
  connectMongo();

  let product = null;

  try {
    product = await Product.findOne({ _id: params.id });
  } catch (error) {
    console.log(error);
    return new NextResponse("An error has occurred.", {
      status: 400,
    });
  }

  return new NextResponse("OK!", {
    status: 200,
  });
}

//  PATCH PRODUCT
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  connectMongo();

  if (req.url.split("?=")[1] === "active") {
    let product = null;
    console.log(params);
    try {
      product = await Product.findById(params.id);
    } catch (error) {
      return new NextResponse("An error has occurred", { status: 400 });
    }

    product.isActive = !product.isActive;
    await product.save();
  } else {
    const body = await req.json();
    const { product: newProduct } = body;
    let oldProduct = null;

    try {
      oldProduct = await Product.findById(params.id);
    } catch (error: any) {
      if (error.code === 11000) {
        return new NextResponse("A product already has that SKU.", {
          status: 409,
        });
      } else {
        return new NextResponse("An error has occurred.");
      }
    }

    if (newProduct.image !== oldProduct.image) {
      try {
        await utapi.deleteFiles(oldProduct.image.split("/")[4]);
      } catch (error) {
        console.log(error);
        return new NextResponse("An error occurred during image swapping.", { status: 400 });
      }
    }

    try {
      await Product.findByIdAndUpdate(newProduct._id, newProduct);
    } catch (error) {
      return new NextResponse("An error occurred updating the product.", { status: 400 });
    }
  }
  return new NextResponse("OK!", { status: 200 });
}

//  DELETE PRODUCT
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  connectMongo();
  let product = null;

  try {
    product = await Product.findById(params.id);
  } catch (error) {
    return new NextResponse("An error occurred finding the product.", { status: 400 });
  }

  try {
    await utapi.deleteFiles(product.image.split("/")[4]);
  } catch (error) {
    console.log(error);
  }

  try {
    await Product.findByIdAndDelete(product._id);
  } catch (error) {
    return new NextResponse("An error occurred deleting the product", { status: 400 });
  }

  return new NextResponse("OK!", { status: 200 });
}
