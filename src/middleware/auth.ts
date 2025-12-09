/**
 * KIRIMBA Banking System - Authentication Middleware
 * JWT-based authentication and authorization
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AppError } from './errorHandler';
import { prisma } from '../config/database';
import { UserRole, UserStatus } from '@prisma/client';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        phoneNumber: string;
        role: UserRole;
        status: UserStatus;
      };
    }
  }
}

/**
 * Verify JWT token and attach user to request
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as {
      userId: string;
      phoneNumber: string;
    };

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        phoneNumber: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    // Check if user is active
    if (user.status === 'SUSPENDED') {
      throw new AppError('Account suspended', 403);
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Token expired', 401));
    } else {
      next(error);
    }
  }
};

/**
 * Authorize based on user roles
 */
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Not authorized for this action', 403));
    }

    next();
  };
};

/**
 * Optional authentication - attach user if token is valid but don't fail if missing
 */
export const optionalAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.jwtSecret) as {
        userId: string;
        phoneNumber: string;
      };

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          phoneNumber: true,
          role: true,
          status: true,
        },
      });

      if (user && user.status === 'ACTIVE') {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Ignore auth errors for optional authentication
    next();
  }
};

export default { authenticate, authorize, optionalAuthenticate };
