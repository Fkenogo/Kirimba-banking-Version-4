/**
 * KIRIMBA Banking System - USSD Routes
 * USSD Gateway integration for feature phone access
 */

import { Router } from 'express';

const router = Router();

// TODO: Implement USSD routes
// - POST /callback - USSD gateway callback handler
// - POST /session - Handle USSD session

router.get('/', (req, res) => {
  res.json({
    message: 'USSD Gateway API',
    endpoints: ['POST /callback - USSD gateway callback', 'POST /session - Handle USSD session'],
  });
});

export default router;
