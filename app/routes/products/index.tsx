// app/routes/products.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import ProductList from "~/components/ProductList";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "List of Products" },
    { name: "description", content: "Welcome to Products!" },
  ];
};
export interface Product {
  price: number;
  product: any;
  id: string;
  attributes: {
    label: string;
    en_label: string;
    slug: string;
    desc: string;
    en_desc: string;
    image_url: string;
    image_placeholder_url: string;
    price: number;
    medicines: any;
  }
}
export interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}

export const loader: LoaderFunction = async () => {
  try {
    const response = await axios.get("https://api.echomedi.com/api/products?pagination[page]=1&pagination[pageSize]=10000");
    const productsResponse: ProductsResponse = await response.data;
    return json({ products: productsResponse.data });
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
      <ProductList products={products as Product[]} />
    </div>
  )
}