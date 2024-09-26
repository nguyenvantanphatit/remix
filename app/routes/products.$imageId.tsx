import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export interface ProductDetails {
  id: number;
  label: string;
  en_label: string;
  slug: string;
  desc: string;
  en_desc: string;
  image_url: string;
  price: number;
  createdAt: string;
  image: {
    url: string;
  };
  medicines: Array<{
    id: number;
    name: string;
  }>;
}

export interface LoaderData {
  product?: ProductDetails;
  error?: string;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("params", params);
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${params.imageId}`);
  const data = await response.json();
  return json({ product: data });
};

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  console.log("Client-side data:", { product });

  return (

    <>
    
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto my-8">
      {product.title}
    </div>
    </>
  );
}