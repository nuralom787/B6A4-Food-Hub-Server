import { Request, Response } from "express";
import { orderService } from "./order.service";

// const getAddress = async (req: Request, res: Response) => {
//     try {
//         const id = req.params.id as string;
//         const result = await orderService.getAddress(id);
//         res.status(201).json(result);
//     }
//     catch (error) {
//         res.status(500).json({ error: "Failed to create Meal" });
//     }
// };

const createOrder = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const result = await orderService.createOrder(body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create Meal" });
    }
};

// const removeFromCart = async (req: Request, res: Response) => {
//     try {
//         const id = req.params.id as string;
//         const result = await cartService.removeFromCart(id);
//         res.status(200).json(result);
//     }
//     catch (error) {
//         res.status(500).json({ error: "Failed to create Meal" });
//     }
// };


export const orderController = {
    createOrder,
}