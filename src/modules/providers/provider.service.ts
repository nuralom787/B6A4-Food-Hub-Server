import { prisma } from "../../lib/prisma";

interface ProviderProfilePayload {
    userId: string;
    businessName: string;
    description: string;
    address: string;
    imageUrl: string;
}

const getProviderProfile = async (id: string) => {
    try {
        const result = await prisma.providerProfile.findUnique({
            where: {
                userId: id
            }
        });

        return result;
    }
    catch (err) {
        throw err;
    }
}

const getSingleProvider = async (id: string) => {
    try {
        const result = await prisma.providerProfile.findUnique({
            where: {
                id
            },
            include: {
                meals: true
            }
        });

        return result;
    }
    catch (err) {
        throw err;
    }
}

const createProviderProfile = async (data: ProviderProfilePayload) => {
    try {
        const result = await prisma.providerProfile.create({
            data
        });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export const providerService = {
    getProviderProfile,
    getSingleProvider,
    createProviderProfile,
};