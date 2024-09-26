import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import axios from "axios";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Remix Tailwind Starter Project" },
];

export const loader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos")
  const data = await response.json();
  return json({ iamges: data });
};

export default function Products() {
  const { iamges } = useLoaderData<typeof loader>();

  return (
    <div>
      <Outlet />
      <h1 className="text-3xl font-bold text-center my-8">Our Products</h1>
      { ( 
        <ul>
          {iamges.map((image: any) => (
            <li key={image.id}>
              <Link to={`/products/${image.id}`}>{image.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}