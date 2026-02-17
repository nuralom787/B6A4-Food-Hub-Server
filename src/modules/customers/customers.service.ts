import { prisma } from "../../lib/prisma";

const getCustomers = async (email: string) => {
    try {
        const result = await prisma.user.findMany({
            where: {
                email: {
                    not: email
                }
            }
        })

        return result;
    } catch (err) {
        throw err
    }
};


const updateStatus = async (userId: string, status: string) => {
    try {
        const res = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                status: status
            }
        });

        return res
    } catch (error) {
        throw error
    }
};


const getSpecificCustomer = async (userId: string) => {
    try {
        const res = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        return res;
    } catch (error) {
        throw error
    }
};

export const customersService = {
    getCustomers,
    updateStatus,
    getSpecificCustomer
};