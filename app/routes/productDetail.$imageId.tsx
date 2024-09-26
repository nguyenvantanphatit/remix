import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const imageId = params.imageId; // Lấy tham số imageId từ URL
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${imageId}`);
  const data = await response.json();
  return json({ product: data });
};

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p className="mt-2">{product.description}</p> // Giả sử sản phẩm có trường mô tả
      <img src={product.url} alt={product.title} className="mt-4 max-w-full h-auto" />
      <p className="mt-2">ID: {product.id}</p>
    </div>
  );
}