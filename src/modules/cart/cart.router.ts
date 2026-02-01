
import { Router } from 'express';
import { cartController } from './cart.controller';

const router = Router();

router.get('/:id', cartController.getCart);

router.post('/', cartController.addToCart);

router.delete('/:id', cartController.removeFromCart);

export const cartRoute = router;