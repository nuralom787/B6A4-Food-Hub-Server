import { prisma } from "../../lib/prisma";

export interface Address {
    userId: string;
    addressLine: string;
    city: string;
    area: string
}

const getAddress = async (userid: string) => {
    try {
        const res = await prisma.address.findMany({
            where: {
                userId: userid
            }
        });

        return { success: true, res };
    }
    catch (error) {
        return { success: false, error: "Failed add to cart" };
    }
};


const addAddress = async (body: Address) => {
    try {

        const res = await prisma.address.create({
            data: body
        });

        return { success: true, res };
    }
    catch (error) {
        return { success: false, error: "Failed add to cart" };
    }
};

// const removeFromCart = async (mealId: string) => {
//     try {
//         const res = await prisma.cartItem.delete({
//             where: {
//                 id: mealId
//             }
//         });

//         return { success: true, data: res };
//     }
//     catch (error) {
//         return { success: false, error: "Failed add to cart" };
//     }
// };


export const addressService = {
    addAddress,
    getAddress
}