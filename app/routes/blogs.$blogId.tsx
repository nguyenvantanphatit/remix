import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.blogId}`);
  const data = await response.json();
  return json({ blog: data });
};

export default function BlogDetail() {
  const { blog } = useLoaderData<typeof loader>();
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      Product Details
      <h1>{blog.title}</h1>
      <p>{blog.body}</p>
    </div>
  );
}
