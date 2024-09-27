import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import BlogList from "~/components/BlogList";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';

export const meta: MetaFunction = () => [
    { title: "Remix Tailwind Starter Project" },
];

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const start = url.searchParams.get("_start") || "0";
    const limit = url.searchParams.get("_limit") || "50";
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`);
    const data: { id: string, title: string, body: string, userId: string }[] = await response.json();
    return json({ blogs: data });
};

export default function Index() {
    const { blogs } = useLoaderData<typeof loader>();
    const [sortedBlogs, setSortedBlogs] = useState(blogs);
    const [sortDirection, setSortDirection] = useState("ascending");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        sortBlogs();
    }, [sortDirection, blogs]);

    const sortBlogs = () => {
        const sorted = [...blogs].sort((a, b) => {
            const idA = parseInt(a.id, 10);
            const idB = parseInt(b.id, 10);
            return sortDirection === "ascending" ? idA - idB : idB - idA;
        });
        setSortedBlogs(sorted);
    };

    const toggleSortDirection = () => {
        setSortDirection(prevDirection => prevDirection === "ascending" ? "descending" : "ascending");
    };

    const handleDelete = (id: string) => {
        setSortedBlogs((prevBlogs: { id: string }[]) => prevBlogs.filter(blog => blog.id !== id));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const currentData = sortedBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(sortedBlogs);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Blogs");
        XLSX.writeFile(wb, "BlogsData.xlsx");
    };

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto pb-4">
                    <div className="block">
                        <div className="overflow-x-auto w-full border rounded-lg border-gray-300">
                            <table className="w-full rounded-xl">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="">
                                            <div className="flex items-center py-5 px-5">
                                                <input type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100" />
                                            </div>
                                        </th>
                                        <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Company </th>
                                        <th scope="col" className="p-5 flex items-center gap-2 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize cursor-pointer" onClick={toggleSortDirection}> User ID
                                            {
                                                sortDirection === "ascending" ?
                                                    (
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3 7H21" stroke="black" stroke-width="null" stroke-linecap="round" className="my-path"></path>
                                                            <path d="M6 12H18" stroke="black" stroke-width="null" stroke-linecap="round" className="my-path"></path>
                                                            <path d="M10 17H14" stroke="black" stroke-width="null" stroke-linecap="round" className="my-path"></path>
                                                        </svg>
                                                    ) : (
                                                        <svg className="-rotate-180" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3 7H21" stroke="black" stroke-width="null" stroke-linecap="round" className="my-path"></path>
                                                            <path d="M6 12H18" stroke="black" stroke-width="null" stroke-linecap="round" className="my-path"></path>
                                                            <path d="M10 17H14" stroke="black" stroke-width="null" stroke-linecap="round" className="my-path"></path>
                                                        </svg>
                                                    )
                                            }

                                        </th>
                                        <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"> Full Name & Email </th>
                                        <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Status </th>
                                        <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Actions </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300">
                                    {currentData.map((blog: any) => (
                                        <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                                            <td className="">
                                                <div className="flex items-center py-5 px-5">
                                                    <input type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100" />
                                                </div>
                                            </td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{blog.title}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{blog.userId}</td>
                                            <td className="px-5 py-3">
                                                <div className="w-48 flex items-center gap-3">
                                                    <img src="https://pagedone.io/asset/uploads/1697536419.png" alt="Floyd image" />
                                                    <div className="data">
                                                        <p className="font-normal text-sm text-gray-900">{blog.body}</p>
                                                        <p className="font-normal text-xs leading-5 text-gray-400">floydmiles@pagedone.io</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                <div className="py-1.5 px-2.5 bg-emerald-50 rounded-full flex justify-center w-20 items-center gap-1">
                                                    <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="2.5" cy="3" r="2.5" fill="#059669"></circle>
                                                    </svg>
                                                    <span className="font-medium text-xs text-emerald-600">Active</span>
                                                </div>
                                            </td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                <div className="py-1.5 px-2.5 bg-emerald-50 rounded-full flex justify-center w-20 items-center gap-1">
                                                    <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-indigo-600 flex item-center">
                                                        <svg className="cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path className="fill-indigo-500 group-hover:fill-white" d="M10 5L15 10L10 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => handleDelete(blog.id)} className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex item-center">
                                                        <svg className="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path className="fill-red-600 group-hover:fill-white" d="M5 5L15 15M15 5L5 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </button>
                                                    <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-black flex item-center">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path className="stroke-black group-hover:stroke-white" d="M10 5V15" stroke="black" stroke-width="2.5" stroke-linecap="round"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className="flex items-center justify-center py-4" aria-label="Table navigation">
                            <ul className="flex items-center justify-center text-sm h-auto gap-12">
                                <li>
                                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center gap-2 px-3 h-8 ml-0 text-gray-500 bg-white font-medium text-base leading-7 hover:text-gray-700">
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13 15L8 10L13 5" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg> Back </button>
                                </li>
                                {[...Array(Math.ceil(sortedBlogs.length / itemsPerPage)).keys()].map(page => (
                                    <li key={page}>
                                        <button onClick={() => handlePageChange(page + 1)} className={`font-normal text-base leading-7 py-2.5 px-4 rounded-full transition-all duration-500 ${currentPage === page + 1 ? 'bg-indigo-600 text-white' : 'text-black bg-white hover:bg-indigo-600 hover:text-white'}`}>{page + 1}</button>
                                    </li>
                                ))}
                                <li>
                                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(sortedBlogs.length / itemsPerPage)} className="flex items-center justify-center gap-2 px-3 h-8 ml-0 text-gray-500 bg-white font-medium text-base leading-7 hover:text-gray-700"> next <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 5L13 10L8 15" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <button onClick={exportToExcel} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Xuất Excel
            </button>
            <BlogList blogs={blogs} />
        </>
    );
}