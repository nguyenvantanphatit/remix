// src/api.ts
export async function getCart(jwt: string) {
    const response = await fetch('https://api.echomedi.com/api/product/getCart', {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to load cart');
    }

    return response.json();
}

export async function updateCartLine(id: string, quantity: number, jwt: string) {
    const response = await fetch('https://api.echomedi.com/api/cart/updateCartLine', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, cnt: quantity }),
    });

    if (!response.ok) {
        throw new Error('Failed to update cart');
    }

    return response.json();
}

export async function removeCartItem(id: string, jwt: string) {
    const response = await fetch(`https://api.echomedi.com/api/cart-lines/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to remove item');
    }

    return response.json();
}
