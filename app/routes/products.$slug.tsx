// app/routes/products/$slug.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";

export interface ProductDetails {
  id: string;
  label: string;
  en_label: string;
  slug: string;
  desc: string;
  en_desc: string;
  image_url: string;
  price: number;
  medicines: any;
}

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    return json({ product: null, error: "Product not found" }, { status: 404 });
  }
  const { slug } = params;
  try {
    const response = await axios.get(`https://api.echomedi.com/api/product/findOne/${slug}`);
    if (response.status === 200 && response.data) {
      return json({ product: response.data });
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    return json({ product: null, error: "Failed to load product details" }, { status: 500 });
  }
};

export default function ProductDetail() {
  const { product, error } = useLoaderData<{ product: ProductDetails | null, error?: string }>();
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{product.label}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{product.desc}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Price</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${product.price}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Image</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <img src={product.image_url} alt={product.label} className="w-full h-auto" />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}