import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import BlogList from "~/components/BlogList";

export const meta: MetaFunction = () => [
    { title: "Remix Tailwind Starter Project" },
];

export const loader = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data: { id: string, title: string, body: string, userId: string }[] = await response.json();
    return json({ blogs: data });
};
export default function Index() {
    const data = useLoaderData<typeof loader>();
    const blogs = 'blogs' in data ? data.blogs : [];
    return (
        <>
            <BlogList blogs={blogs} />
        </>
    );
}