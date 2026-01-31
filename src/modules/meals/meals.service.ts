import { prisma } from "../../lib/prisma";

interface MealFilters {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    isAvailable: boolean;
    providerId: string;
    categoryId: string;
}

// ! Create New Posts.
const createMeals = async (data: MealFilters) => {
    const result = await prisma.meal.create({
        data: {
            ...data
        }
    });

    return result;
};


// ! Get All Posts with Filters.
const getAllMeals = async (payload: Record<string, any>) => {
    const meals = await prisma.meal.findMany({
        where: {
            ...payload
        }
    });

    return { meals, total: meals.length };
};

export const mealsService = {
    createMeals,
    getAllMeals,
};