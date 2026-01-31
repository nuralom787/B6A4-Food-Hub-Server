import { prisma } from "../../lib/prisma";

interface ProviderProfilePayload {
    userId: string;
    businessName: string;
    description: string;
    address: string;
    imageUrl: string;
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
    createProviderProfile,
};