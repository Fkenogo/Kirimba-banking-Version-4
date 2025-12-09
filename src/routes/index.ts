/**
 * KIRIMBA Banking System - API Routes
 * Main router that combines all route modules
 */

import { Router } from 'express';
import authRoutes from './auth.routes';
import groupRoutes from './group.routes';
import savingsRoutes from './savings.routes';
import loanRoutes from './loan.routes';
import repaymentRoutes from './repayment.routes';
import gamificationRoutes from './gamification.routes';
import ussdRoutes from './ussd.routes';

const router = Router();

// API Information
router.get('/', (req, res) => {
  res.json({
    message: 'KIRIMBA Banking API v1',
    endpoints: {
      auth: '/auth',
      groups: '/groups',
      savings: '/savings',
      loans: '/loans',
      repayments: '/repayments',
      gamification: '/gamification',
      ussd: '/ussd',
    },
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/savings', savingsRoutes);
router.use('/loans', loanRoutes);
router.use('/repayments', repaymentRoutes);
router.use('/gamification', gamificationRoutes);
router.use('/ussd', ussdRoutes);

export default router;
