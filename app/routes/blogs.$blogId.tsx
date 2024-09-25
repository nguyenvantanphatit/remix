import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.blogId}`);
  const data = await response.json();
  console.log("Data Details", data);
  return json({ blog: data });
};

export default function ProductDetail() {

 
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      Product Details
      
    </div>
  );
}
