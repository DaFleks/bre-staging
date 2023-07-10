import connectMongo from "@/lib/connectMongo";
import Product from "@/models/productModel";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let dummies: any = [];
  let count = 2000;
  try {
    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;
    products.map((product: any) =>
      dummies.push({
        title: product.title,
        description: product.description,
        price: product.price,
        sku: `BRE-${count++}`,
        image: product.thumbnail,
      })
    );
    console.log(count);
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("Connecting to Mongo Database...");
    await connectMongo();
    console.log("Connected!");
    console.log("Creating new product...");
    await Product.insertMany(dummies);
    console.log("Created Products!");
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ dummies });
}
