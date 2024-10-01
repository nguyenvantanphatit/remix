import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Trash2, Plus, Minus } from 'lucide-react'
import axios from 'axios';
import { useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const cookieHeader = request.headers.get('cookie');
    const cookies = new URLSearchParams(cookieHeader?.replace(/; /g, '&'));
    const jwt = cookies.get('jwt');
    const response = await fetch(`https://api.echomedi.com/api/product/getCart`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    const data = await response.json();
    return json({ cart: data, jwt });
};

export default function Cart() {
    const { cart, jwt } = useLoaderData<typeof loader>();
    const [lines, setCartLines] = useState<any[]>(cart.user.cart_lines);
    const updateCart = async (id: any, quantity: any) => {
        try {
            await axios.post('https://api.echomedi.com/api/cart/updateCartLine', { id, cnt: quantity }, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const updatedLines = lines.map((line) => (line.id === id ? { ...line, quantity } : line));
            setCartLines(updatedLines);
        } catch (error: any) {
            console.error("Error updating cart:", error);
        }
    };

    const handleUpdateQuantity = (id: any, newQuantity: any) => {
        updateCart(id, newQuantity);
    };

    const handleRemoveItem = async (id: any) => {
        try {
            await axios.delete(`https://api.echomedi.com/api/cart-lines/${id}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const updatedLines = lines.filter(line => line.id !== id);
            setCartLines(updatedLines);
        } catch (error: any) {
            console.error("Error removing item:", error);
        }
    };
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
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        className="p-2 border rounded"
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <button className="p-2 text-red-500 border rounded" onClick={() => handleRemoveItem(item.id)}>
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