import { Router } from 'express';
import { providerController } from './provider.controller';

const router = Router();

router.get('/', providerController.getProviderProfile);

router.get('/:id', providerController.getSingleProvider);

router.post('/create-profile', providerController.createProviderProfile);

export const providerRouter = router;