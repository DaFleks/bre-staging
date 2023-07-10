"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import Container from "@/components/Container";
import SearchInput from "@/components/ui/search-input";
import ProductSkeleton from "@/components/ui/product-skeleton";
import Product from "@/components/ui/product/product";

export default function Home() {
  //  Hooks
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");

  //  Effects
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/admin/products");
        const data = response.data.products;
        setProducts(data.filter((product:any) => product.isActive));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  //  Handlers
  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <>
      <SearchInput
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleChange={handleChange}
        placeholder="Search by title, SKU or description..."
      />
      <Container upDown>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {isLoading ? (
            <>
              <ProductSkeleton num={16} />
            </>
          ) : (
            <>
              {searchInput.length > 2
                ? products
                    .filter(
                      (product) =>
                        product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchInput.toLowerCase()) ||
                        product.sku.toLowerCase().includes(searchInput.toLowerCase())
                    )
                    .map((product) => (
                      <Product
                        key={product._id}
                        id={product._id}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        sku={product.sku}
                        image={product.image}
                      />
                    ))
                : products.map((product) => (
                    <Product
                      key={product._id}
                      id={product._id}
                      title={product.title}
                      description={product.description}
                      price={product.price}
                      sku={product.sku}
                      image={product.image}
                    />
                  ))}
            </>
          )}
        </div>
      </Container>
    </>
  );
}
