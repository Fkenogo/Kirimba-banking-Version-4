/**
 * KIRIMBA Banking System - Database Configuration
 * Prisma Client initialization
 */

import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

// Prisma Client singleton
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'stdout' },
      { level: 'warn', emit: 'stdout' },
    ],
  });

// Log queries in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e: any) => {
    logger.debug('Query:', {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`,
    });
  });
}

// Store prisma in global for development (prevent multiple instances)
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
