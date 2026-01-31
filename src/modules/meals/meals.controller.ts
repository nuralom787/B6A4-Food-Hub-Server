import { NextFunction, Request, Response } from "express";
import { mealsService } from "./meals.service";

// ! Create New Posts.
const createMeals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await mealsService.createMeals(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error)
        // res.status(500).json({ error: "Failed to create post" });
    }
};

const getAllMeals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await mealsService.getAllMeals(req.query);
        res.status(200).json(result);
    }
    catch (error) {
        next(error)
        // res.status(500).json({ error: "Failed to fetch posts" });
    }
};

export const mealsController = {
    createMeals,
    getAllMeals,
};