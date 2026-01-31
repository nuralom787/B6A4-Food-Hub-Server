import { Router } from 'express';
import { providerController } from './provider.controller';

const router = Router();

router.post('/create-profile', providerController.createProviderProfile);

export const providerRouter = router;