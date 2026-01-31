import { Request, Response } from "express";
import { categoryService } from "./category.service";


const createCategory = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const result = await categoryService.createCategory(body);
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};


const getAllCategories = async (req: Request, res: Response) => {
    try {
        const result = await categoryService.getAllCategories();
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

export const categoryController = {
    createCategory,
    getAllCategories
};