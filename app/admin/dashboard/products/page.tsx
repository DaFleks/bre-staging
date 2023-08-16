"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import useModalsStore from "@/hooks/useModalsStore";

import { PackageIcon, PlusIcon, PowerIcon, PowerOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProductTableRow from "@/components/ui/admin/ProductTableRow";
import DashboardStat from "@/components/ui/dashboard-stat";
import SearchInput from "@/components/ui/search-input";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useProductsStore from "@/hooks/useProductsStore";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import DashboardHeader from "@/components/ui/dashboard-header";
import DashboardStatWrapper from "@/components/ui/dashboard-stat-wrapper";

const AdminProducts = () => {
  //  Hooks
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ numProducts: "--", numActive: "--", numInactive: "--" });
  const [searchInput, setSearchInput] = useState("");
  const products = useProductsStore((state: any) => state.products);
  const setProducts = useProductsStore((state: any) => state.setProducts);
  const productToggle = useModalsStore((state: any) => state.productToggle);

  //  Effects
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/admin/products");
        setProducts(response.data.products);
        setStats({
          numProducts: response.data.products.length,
          numActive: response.data.products.filter((product: any) => product.isActive).length,
          numInactive: response.data.products.filter((product: any) => !product.isActive).length,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  type Product = {
    _id: string;
    title: string;
    sku: string;
    stock: number;
    description: string;
    price: number;
    image: string;
    isActive: boolean;
    isDiscounted: boolean;
    updatedAt: boolean;
  };

  //  Handlers
  const handleChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  const deleteProduct = async (id: string) => {
    setIsLoading(true);
    let response = null;

    try {
      await axios.delete(`/api/admin/product/${id}`);
    } catch (error) {
      toast("An error has occurred.");
      setIsLoading(false);
      return;
    }

    try {
      response = await axios.get("/api/admin/products");
    } catch (error) {
      toast("There was a problem getting the product list.");
      setIsLoading(false);
      return;
    }

    if (response) {
      setProducts(response.data.products);
      setStats({
        numProducts: response.data.products.length,
        numActive: response.data.products.filter((product: any) => product.isActive).length,
        numInactive: response.data.products.filter((product: any) => !product.isActive).length,
      });
      setIsLoading(false);
    }
  };

  const toggleIsActive = async (_id: string) => {
    setIsLoading(true);
    let response = null;

    try {
      await axios.patch(`/api/admin/product/${_id}?=active`);
    } catch (error) {
      toast("An error has occurred.");
      console.log(error);
      setIsLoading(false);
      return;
    }

    try {
      response = await axios.get("/api/admin/products");
    } catch (error) {
      toast("An error has occurred.");
      setIsLoading(false);
      return;
    }

    setProducts(response.data.products);
    setStats({
      numProducts: response.data.products.length,
      numActive: response.data.products.filter((product: any) => product.isActive).length,
      numInactive: response.data.products.filter((product: any) => !product.isActive).length,
    });
    setIsLoading(false);
  };

  return (
    <>
      <DashboardHeader text="Products" subtext="Add, update, or delete any of your products..." />

      <DashboardStatWrapper>
        <DashboardStat
          title="Total Products"
          stat={stats.numProducts}
          icon={<PackageIcon className="h-4 w-4" />}
        />
        <DashboardStat
          title="Active Products"
          stat={stats.numActive}
          icon={<PowerIcon className="h-4 w-4" />}
        />
        <DashboardStat
          title="Inactive Products"
          stat={stats.numInactive}
          icon={<PowerOffIcon className="h-4 w-4" />}
        />
      </DashboardStatWrapper>

      <div className="mb-6 flex flex-col sm:flex-row-reverse sm:gap-3 justify-between items-center">
        <Button className="w-full py-6 sm:w-1/3" onClick={productToggle}>
          <PlusIcon />
          &#160;&#160;Add Product
        </Button>
        <Separator className="my-6 sm:hidden" />
        <div className="w-full">
          <SearchInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleChange={handleChange}
            placeholder="Search by title, SKU or description..."
          />
        </div>
      </div>

      <Table className="border">
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="text-center">SKU</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>LOADING</TableCell>
            </TableRow>
          ) : (
            <>
              {searchInput.length > 2
                ? products
                    .filter(
                      (product: Product) =>
                        product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchInput.toLowerCase()) ||
                        product.sku.toLowerCase().includes(searchInput.toLowerCase())
                    )
                    .map((product: Product) => (
                      <ProductTableRow
                        key={product._id}
                        _id={product._id}
                        image={product.image}
                        title={product.title}
                        sku={product.sku}
                        stock={product.stock}
                        description={product.description}
                        price={product.price}
                        isActive={product.isActive}
                        updatedAt={`${product.updatedAt}`}
                        toggleIsActive={toggleIsActive}
                        deleteProduct={deleteProduct}
                      />
                    ))
                : products.map((product: Product) => (
                    <ProductTableRow
                      key={product._id}
                      _id={product._id}
                      image={product.image}
                      title={product.title}
                      sku={product.sku}
                      stock={product.stock}
                      description={product.description}
                      price={product.price}
                      isActive={product.isActive}
                      updatedAt={`${product.updatedAt}`}
                      toggleIsActive={toggleIsActive}
                      deleteProduct={deleteProduct}
                    />
                  ))}
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
};
export default AdminProducts;
