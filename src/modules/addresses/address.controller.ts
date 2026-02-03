import { Request, Response } from "express";
import { addressService } from "./address.service";

const getAddress = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await addressService.getAddress(id);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create Meal" });
    }
};

const addAddress = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const result = await addressService.addAddress(body);
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


export const addressController = {
    addAddress,
    getAddress
}