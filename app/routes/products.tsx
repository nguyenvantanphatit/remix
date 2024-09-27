import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import axios from "axios";
import type { MetaFunction } from "@remix-run/node";
import ProductList from "~/components/ProductList";

export const meta: MetaFunction = () => [
  { title: "Remix Tailwind Starter Project" },
];

export const loader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await response.json();
  return json({ images: data.slice(0, 10) });
};

export default function Products() {
  const { images } = useLoaderData<typeof loader>();

  return (
    <>
      <ProductList images={images} />
      <Outlet /> 
    </>
  );
}