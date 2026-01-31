import { prisma } from "../../lib/prisma";

const createCategory = async (data: { name: string }) => {
    try {
        const result = await prisma.category.create({
            data: {
                name: data.name
            }
        });

        return result;
    }
    catch (err) {
        throw err;
    }
};

const getAllCategories = async () => {
    try {
        const result = await prisma.category.findMany({

        })

        return result;
    } catch (err) {
        throw err
    }
}

export const categoryService = {
    createCategory,
    getAllCategories
};