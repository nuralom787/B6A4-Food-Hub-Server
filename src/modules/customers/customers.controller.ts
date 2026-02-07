import { Request, Response } from "express";
import { customersService } from "./customers.service";


const getCustomers = async (req: Request, res: Response) => {
    try {
        const result = await customersService.getCustomers();
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

const updateStatus = async (req: Request, res: Response) => {
    try {
        const { userId, status } = req.query;
        const result = await customersService.updateStatus(userId as string, status as string);
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

const getSpecificCustomer = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const result = await customersService.getSpecificCustomer(userId as string);
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

export const customersController = {
    getCustomers,
    updateStatus,
    getSpecificCustomer
};