import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const imageId = params.imageId; 
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${imageId}`);
  const data = await response.json();
  return json({ product: data });
};

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <>
      <section className="relative pt-20 pb-24 bg-indigo-600">
        <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl px-5 lg:px-11 mx-auto max-md:px-4">
          <h1 className="text-white font-manrope font-semibold text-4xl min-[500px]:text-5xl leading-tight mb-8">{product.title}</h1>
        </div>
      </section>
      <section className="relative py-10 lg:py-16 ">
        <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl px-5 lg:px-11 mx-auto max-md:px-4">
          <h1 className="text-white font-manrope font-semibold text-4xl min-[500px]:text-5xl leading-tight mb-8">{product.title}</h1>
          <img src={product.url} alt={product.title} className="mt-4 max-w-full h-auto" />
          <article>
            <p>{product.id}</p>
          </article>
        </div>
      </section>
    </>
  );
}