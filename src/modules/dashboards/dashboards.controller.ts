import { Request, Response } from "express";
import { dashboardService } from "./dashboards.service";

const getUserDashboardStats = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const result = await dashboardService.getUserDashboardStats(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create Meal" });
    }
};

const getProviderDashboardStats = async (req: Request, res: Response) => {
    try {
        const result = await dashboardService.getProviderDashboardStats(req.query);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};

const getAdminDashboardStats = async (req: Request, res: Response) => {
    try {
        const result = await dashboardService.getAdminDashboardStats(req.params.id as string);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};

export const dashboardController = {
    getUserDashboardStats,
    getProviderDashboardStats,
    getAdminDashboardStats
};