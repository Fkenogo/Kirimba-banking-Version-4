/**
 * KIRIMBA Banking System - Authentication Routes
 * User registration, login, and authentication endpoints
 */

import { Router } from 'express';

const router = Router();

// TODO: Implement authentication routes
// - POST /register - User registration
// - POST /login - User login
// - POST /refresh - Refresh access token
// - POST /logout - User logout
// - GET /me - Get current user profile

router.get('/', (req, res) => {
  res.json({
    message: 'Authentication API',
    endpoints: ['POST /register', 'POST /login', 'POST /refresh', 'POST /logout', 'GET /me'],
  });
});

export default router;
