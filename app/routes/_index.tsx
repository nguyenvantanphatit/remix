import type { MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData, Outlet } from "@remix-run/react";


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
            <h1>Home</h1>
            <Link to="/products">Products</Link>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}