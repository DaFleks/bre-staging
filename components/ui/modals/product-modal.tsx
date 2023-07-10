"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

import useModalsStore from "@/hooks/useModalsStore";
import useProductsStore from "@/hooks/useProductsStore";

import { ArrowRightIcon, CheckCircle, TrashIcon } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import Modal from "../modal";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { Checkbox } from "../checkbox";
import { Button } from "../button";

import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import UploadImage from "../admin/UploadImage";
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

const formSchema = z.object({
  title: z.string().min(1),
  image: z.string(),
  sku: z.string(),
  stock: z.coerce.number(),
  description: z.string(),
  price: z.coerce.number(),
  isActive: z.boolean(),
});

const ProductModal = () => {
  //  Hooks
  const [isLoading, setIsLoading] = useState(false);
  const [skuCount, setSkuCount] = useState(0);
  const productOpen = useModalsStore((state: any) => state.productOpen);
  const productToggle = useModalsStore((state: any) => state.productToggle);
  const editProduct = useModalsStore((state: any) => state.editProduct);
  const setEditProduct = useModalsStore((state: any) => state.setEditProduct);
  const setProducts = useProductsStore((state: any) => state.setProducts);
  const [image, setImage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: "",
      sku: "",
      stock: 0,
      description: "",
      price: 0.0,
      isActive: false,
    },
  });

  useEffect(() => {
    if (editProduct && form) {
      form.setValue("title", editProduct.title);
      form.setValue("image", editProduct.image ? editProduct.image : "");
      form.setValue("sku", editProduct.sku);
      form.setValue("stock", editProduct.stock);
      form.setValue("description", editProduct.description);
      form.setValue("price", editProduct.price);
      form.setValue("isActive", editProduct.isActive);
      setImage(editProduct.image);
    } else {
      (async () => {
        try {
          const response = await axios.get("/api/admin/sku");
          setSkuCount(response.data.currentCount);
          setImage("");
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [editProduct, form]);

  type CheckedState = boolean | "indeterminate";

  //  Handlers
  const handleFocus = (e: any) => {
    e.target.select();
  };

  const handleUpload = async (e: any) => {
    setIsLoading(true);

    const files = [e.target.files[0]];

    const response = await uploadFiles({
      files,
      endpoint: "imageUploader",
    });

    form.setValue("image", response[0].fileUrl);
    setImage(response[0].fileUrl);
    setIsLoading(false);
  };

  const clearImage = async () => {
    setIsLoading(true);
    if (!editProduct) {
      await axios.delete("/api/deleteimage/" + image.split("/")[4]);
    }
    form.setValue("image", "");
    setImage("");
    setIsLoading(false);
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    (async () => {
      if (editProduct) {
        try {
          await axios.patch(`/api/admin/product/${editProduct._id}`, {
            product: { _id: editProduct._id, ...values },
          });
        } catch (error: any) {
          setIsLoading(false);
          toast(error.response.data);
          return;
        }
      } else {
        try {
          await axios.post("/api/admin/products", {
            values: values,
            count: skuCount,
          });
        } catch (error: any) {
          setIsLoading(false);
          toast(error.response.data);
          return;
        }
        form.reset();
        const response = await axios.get("/api/admin/sku");
        setSkuCount(response.data.currentCount);
        setImage("");
      }

      let response = null;

      try {
        response = await axios.get("/api/admin/products");
      } catch (error: any) {
        setIsLoading(false);
        toast(error.response.data);
        return;
      }

      setProducts(response.data.products);
      setIsLoading(false);
      toast(`Product ${editProduct ? "Updated" : "Added!"}`, {
        icon: <CheckCircle className="text-emerald-500" />,
        duration: 2000,
        position: "top-center",
      });
    })();
  };

  const handleToggle = () => {
    form.reset();
    setEditProduct(null);
    productToggle();
  };

  return (
    <Modal
      title={`${editProduct ? "Update " : "Add "} Product`}
      description={editProduct ? "Modify an existing product..." : "Fiil in as much as you can..."}
      open={productOpen}
      onOpenChange={isLoading ? () => {} : handleToggle}
    >
      <Toaster />
      <input type="file" id="imageUpload" className="hidden" onChange={handleUpload} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Required" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mb-3">
            <FormLabel>Image</FormLabel>
          </div>
          <UploadImage
            isLoading={isLoading}
            image={form.getValues("image")}
            clearImage={clearImage}
          />
          <div className="">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Required" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between gap-3">
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} onFocus={handleFocus} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="number"
                      autoComplete="off"
                      onFocus={handleFocus}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      autoComplete="off"
                      onFocus={handleFocus}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            If SKU is left empty, it will default to:&#160;
            <span className="text-amber-700 font-bold">BRE-{skuCount + 1}</span>
          </p>
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={() => {
                      form.setValue("isActive", !form.getValues("isActive"));
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
                <div>
                  <FormLabel>Active on complete?</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    className="h-[150px] resize-none"
                    placeholder="Details about your product.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3">
            <Button
              disabled={isLoading}
              variant="destructive"
              onClick={() => {
                form.reset();
              }}
            >
              <TrashIcon className="h-4 w-4" />
              &#160;&#160;Reset
            </Button>
            <Button type="submit" disabled={isLoading}>
              <ArrowRightIcon className="h-4 w-4" />
              &#160;&#160;{editProduct ? "Update " : "Add "}Product
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
export default ProductModal;
