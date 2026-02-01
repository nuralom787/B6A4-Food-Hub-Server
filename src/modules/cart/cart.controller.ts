import { Request, Response } from "express";
import { cartService, Meal } from "./cart.service";


const addToCart = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const result = await cartService.addToCart(body as { meal: Meal, userId: string });
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create Meal" });
    }
};

const removeFromCart = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await cartService.removeFromCart(id);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create Meal" });
    }
};

const getCart = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await cartService.getCart(id);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create Meal" });
    }
};

export const cartController = {
    addToCart,
    removeFromCart,
    getCart
}