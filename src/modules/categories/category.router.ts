import { Router } from 'express';
import { categoryController } from './category.controller';

const router = Router();

router.get('/', categoryController.getAllCategories);

router.post('/create-category', categoryController.createCategory);

export const categoryRoute = router;