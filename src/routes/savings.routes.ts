/**
 * KIRIMBA Banking System - Savings Routes
 * Phase 2: Savings Accumulation
 */

import { Router } from 'express';

const router = Router();

// TODO: Implement savings routes
// - POST /deposit - Deposit to savings
// - POST /recurring - Setup recurring transfer
// - GET /balance - Get account balance
// - GET /transactions - Get transaction history
// - GET /interest - Get interest information

router.get('/', (req, res) => {
  res.json({
    message: 'Savings Management API - Phase 2: Savings Accumulation',
    endpoints: [
      'POST /deposit - Make a deposit',
      'POST /recurring - Setup recurring transfer',
      'GET /balance - Get account balance',
      'GET /transactions - Get transaction history',
    ],
  });
});

export default router;
