import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";


export const meta: MetaFunction = () => [
    { title: "Remix Tailwind Starter Project" },
];

export default function Index() {
    return (
        <main className="p-16 relative min-h-screen sm:flex sm:items-center sm:justify-center">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    <div className="max-w-4xl flex flex-col items-center justify-center">
                        <h1 className="text-6xl leading-normal font-semibold text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-300 via-purple-300 to-stone-600 sm:text-center">
                            Getting started with Remix and Tailwind
                        </h1>
                        <Link to="/products" className="text-black tracking-wide text-center text-xl mt-8">
                            Go to Products
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}