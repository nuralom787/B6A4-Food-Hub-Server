import { prisma } from "../../lib/prisma";

export interface OrderItem {
    quantity: string
    price: number
    orderId: string
    mealId: string
}

export interface Order {
    customerId: string;
    deliveryAddress: string;
    orderItems: OrderItem[];
    totalAmount: number
}

// const getAddress = async (userid: string) => {
//     try {
//         const res = await prisma.address.findMany({
//             where: {
//                 userId: userid
//             }
//         });

//         return { success: true, res };
//     }
//     catch (error) {
//         return { success: false, error: "Failed add to cart" };
//     }
// };


const createOrder = async (body: Order) => {
    const { orderItems, customerId, totalAmount, deliveryAddress } = body;

    try {
        const res = await prisma.order.create({
            data: {
                customerId: customerId,
                totalAmount: Number(totalAmount),
                deliveryAddress: deliveryAddress,
                orderItems: {
                    create: orderItems.map((item: any) => ({
                        mealId: item.mealId,
                        quantity: Number(item.quantity),
                        price: Number(item.price)
                    }))
                }
            },
            include: { orderItems: true }
        });
        await prisma.cartItem.deleteMany({
            where: {
                cart: {
                    userId: customerId
                }
            }
        });

        return res;
    }
    catch (error) {
        console.error("Order Creation Error: ", error);
        throw error;
    }
};


export const orderService = {
    createOrder,
    // getAddress
}