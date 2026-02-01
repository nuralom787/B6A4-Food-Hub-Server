import { Request, Response } from "express";
import { providerService } from "./provider.service";

const getProviderProfile = async (req: Request, res: Response) => {
    try {
        // console.log("From Provider: ", req.query.id)
        const id = req.query.id;
        const result = await providerService.getProviderProfile(id as string);
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
}

const getSingleProvider = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await providerService.getSingleProvider(id as string);
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
}

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
    getProviderProfile,
    getSingleProvider,
    createProviderProfile,
};