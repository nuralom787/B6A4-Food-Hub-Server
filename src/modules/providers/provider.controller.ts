import { Request, Response } from "express";
import { providerService } from "./provider.service";


const createProviderProfile = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const result = await providerService.createProviderProfile(body);
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

export const providerController = {
    createProviderProfile,
};