import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigation, useFetcher } from "@remix-run/react";
import { Trash2, Plus, Minus } from 'lucide-react'
import { useState } from "react";
import { getCart, removeCartItem, updateCartLine } from "~/api";


export const loader = async ({ request }: LoaderFunctionArgs) => {
    const cookieHeader = request.headers.get('cookie');
    const cookies = new URLSearchParams(cookieHeader?.replace(/; /g, '&'));
    const jwt = cookies.get('jwt');
    if (!jwt) {
        throw new Response("Unauthorized", { status: 401 });
    }
    const cart = await getCart(jwt);
    return json({ cart, jwt });
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const intent = formData.get("intent");
    const id = formData.get("id");
    const jwt = formData.get("jwt");

    if (!jwt) {
        throw new Response("Unauthorized", { status: 401 });
    }

    if (intent === "update") {
        const quantity = Number(formData.get("quantity"));
        await updateCartLine(id as string, quantity as number, jwt as string);

    } else if (intent === "remove") {
        await removeCartItem(id as string, jwt as string);
    }

    return null;
};

export default function Cart() {
    const { cart, jwt } = useLoaderData<typeof loader>();
    const [lines, setCartLines] = useState<any[]>(cart.user.cart_lines);
    const fetcher = useFetcher();
    const navigation = useNavigation();
    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        setCartLines(prevLines =>
            prevLines.map(line =>
                line.id === id ? { ...line, quantity: newQuantity } : line
            )
        );
        fetcher.submit(
            { intent: "update", id, quantity: newQuantity.toString(), jwt },
            { method: "post" }
        );
    };

    const handleRemoveItem = (id: string) => {
        setCartLines(prevLines => prevLines.filter(line => line.id !== id));
        fetcher.submit(
            { intent: "remove", id, jwt },
            { method: "post" }
        );
    };

    const isUpdating = navigation.state === "submitting";


    return (
        <>
            <section className="relative pt-20 pb-24 bg-indigo-600">
                <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl px-5 lg:px-11 mx-auto max-md:px-4">
                    Cart
                </div>
            </section>
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 bg-white shadow rounded-lg p-4">
                    <div className="font-bold text-lg mb-4">Cart Items</div>
                    <div>
                        {lines.map((item: any) => (
                            <div key={item.id} className="flex items-center space-x-4 py-4">
                                <div className="flex-shrink-0">
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{item.id}</h3>
                                    <p className="text-sm text-gray-500">${item.quantity}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="p-2 border rounded"
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1 || isUpdating}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        className="p-2 border rounded"
                                        disabled={isUpdating}
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <button className="p-2 text-red-500 border rounded" disabled={isUpdating} onClick={() => handleRemoveItem(item.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}