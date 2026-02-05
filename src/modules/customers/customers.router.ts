import { Router } from 'express';
import { customersController } from './customers.controller';

const router = Router();

router.get('/', customersController.getCustomers);

router.patch('/update-status', customersController.updateStatus);

export const customersRoute = router;