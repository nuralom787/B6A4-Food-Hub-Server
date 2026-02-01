import { prisma } from "../../lib/prisma";

export interface Meal {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    isAvailable: boolean;
    providerId: string;
    categoryId: string;
}


const addToCart = async (body: { meal: Meal, userId: string }) => {
    try {
        const { meal, userId } = body;

        let cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            cart = await prisma.cart.create({ data: { userId } });
        };

        await prisma.cartItem.upsert({
            where: {
                cartId_mealId: {
                    cartId: cart.id,
                    mealId: meal.id
                }
            },
            update: {
                quantity: {
                    increment: 1
                }
            },
            create: {
                cartId: cart.id,
                mealId: meal.id,
                title: meal.title,
                imageUrl: meal.imageUrl,
                price: meal.price,
                quantity: 1
            },
        });

        return { success: true };
    }
    catch (error) {
        return { success: false, error: "Failed add to cart" };
    }
};

const removeFromCart = async (mealId: string) => {
    try {
        const res = await prisma.cartItem.delete({
            where: {
                id: mealId
            }
        });

        return { success: true, data: res };
    }
    catch (error) {
        return { success: false, error: "Failed add to cart" };
    }
};


const getCart = async (userid: string) => {
    try {
        const res = await prisma.cart.findUnique({
            where: {
                userId: userid
            },
            include: {
                items: true,

            },
        });

        // console.log(res)

        const total_count = res?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
        const subtotal = res?.items.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
        const deliveryFee = res?.items.length ? 5.0 : 0.0;
        const total = subtotal + deliveryFee;

        return { ...res, subtotal, deliveryFee, total, total_count };
    }
    catch (error) {
        return { success: false, error: "Failed add to cart" };
    }
};


export const cartService = {
    addToCart,
    removeFromCart,
    getCart
}