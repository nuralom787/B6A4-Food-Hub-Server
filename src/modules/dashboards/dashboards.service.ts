import { prisma } from "../../lib/prisma";

interface MealFilters {
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    providerId: string;
    categoryId: string;
}

// ! Create New Posts.
const getUserDashboardStats = async (data: MealFilters) => {
    const result = await prisma.meal.create({
        data: {
            ...data
        }
    });

    return result;
};

// ! Get All Posts with Filters.
const getProviderDashboardStats = async (payload: Record<string, any>) => {
    const meals = await prisma.meal.findMany({
        where: {
            ...payload
        }
    });

    return { meals, total: meals.length };
};

// ! Get All Posts with Filters.
const getAdminDashboardStats = async (mealId: string) => {
    const meal = await prisma.meal.findFirstOrThrow({
        where: {
            id: mealId,
        },
        include: {
            category: true,
            provider: true,
            reviews: true,
            orderItems: true
        }
    });

    return { meal };
};

export const dashboardService = {
    getUserDashboardStats,
    getProviderDashboardStats,
    getAdminDashboardStats
};