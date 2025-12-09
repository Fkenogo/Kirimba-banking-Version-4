/**
 * KIRIMBA Banking System - Repayment Routes
 * Phase 4: Repayment & Management
 */

import { Router } from 'express';

const router = Router();

// TODO: Implement repayment routes
// - POST /pay - Make a loan repayment
// - POST /auto-debit - Enable auto-debit
// - GET /schedule/:loanId - Get repayment schedule
// - GET /history - Get repayment history

router.get('/', (req, res) => {
  res.json({
    message: 'Repayment Management API - Phase 4: Repayment & Management',
    endpoints: [
      'POST /pay - Make a loan repayment',
      'POST /auto-debit - Enable auto-debit',
      'GET /schedule/:loanId - Get repayment schedule',
      'GET /history - Get repayment history',
    ],
  });
});

export default router;
