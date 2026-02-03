
import { Router } from 'express';
import { orderController } from './order.controller';

const router = Router();

// router.get('/:id', orderController.getAddress);

router.post('/placed-order', orderController.createOrder);

export const orderRoute = router;