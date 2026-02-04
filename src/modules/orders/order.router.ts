
import { Router } from 'express';
import { orderController } from './order.controller';

const router = Router();

router.get('/:id', orderController.getSpecificOrders);

router.post('/placed-order', orderController.createOrder);

export const orderRoute = router;