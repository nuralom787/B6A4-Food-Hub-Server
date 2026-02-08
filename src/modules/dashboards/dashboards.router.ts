import { Router } from 'express';
import { dashboardController } from './dashboards.controller';

const router = Router();

router.get('/user-stats', dashboardController.getUserDashboardStats);

router.get('/provider-stats', dashboardController.getProviderDashboardStats);

router.get('/admin-stats', dashboardController.getAdminDashboardStats);

export const dashboardRouter = router;