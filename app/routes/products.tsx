// app/routes/products.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProductList from "~/components/ProductList";

interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
}

export const loader: LoaderFunction = async () => {
  try {
    const response = await fetch("https://api.echomedi.com/api/products?pagination[page]=${1}&pagination[pageSize]=${1000}");
    console.log("Prodct=======",response.json());
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products: Product[] = await response.json();
    return json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return json({ products: [], error: "Failed to load products" }, { status: 500 });
  }
};

export default function Products() {
  const { products, error } = useLoaderData<{ products: Product[], error?: string }>();

  if (error) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-600">{error}</h1>
        <p className="mt-4">Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Our Products</h1>
      <ProductList products={products} />
    </div>
  );
}