import { Router } from 'express';
import { mealsController } from './meals.controller';
import verifyRole, { UserRoles } from '../../middleware/authMiddleware';

const router = Router();

router.get('/', mealsController.getAllMeals);

router.post('/', mealsController.createMeals);

export const mealsRouter = router;