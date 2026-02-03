
import { Router } from 'express';
import { addressController } from './address.controller';

const router = Router();

router.get('/:id', addressController.getAddress);

router.post('/add-address', addressController.addAddress);

// router.delete('/:id', cartController.removeFromCart);

export const addressRoute = router;