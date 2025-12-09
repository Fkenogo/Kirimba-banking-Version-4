/**
 * KIRIMBA Banking System - Loan Routes
 * Phase 3: Loan Request & Approval
 */

import { Router } from 'express';

const router = Router();

// TODO: Implement loan routes
// - POST /request - Request a loan
// - GET /:id - Get loan details
// - GET / - List user loans
// - POST /:id/vote - Vote on group loan
// - GET /:id/votes - Get voting status
// - GET /credit-limit - Get user credit limit

router.get('/', (req, res) => {
  res.json({
    message: 'Loan Management API - Phase 3: Loan Request & Approval',
    endpoints: [
      'POST /request - Request a loan',
      'GET /:id - Get loan details',
      'GET / - List user loans',
      'POST /:id/vote - Vote on group loan',
      'GET /credit-limit - Get credit limit',
    ],
  });
});

export default router;
