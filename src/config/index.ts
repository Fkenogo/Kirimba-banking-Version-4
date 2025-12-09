/**
 * KIRIMBA Banking System - Configuration
 * Centralized configuration loaded from environment variables
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

interface Config {
  // Application
  nodeEnv: string;
  port: number;
  apiVersion: string;

  // Database
  databaseUrl: string;

  // Authentication
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
  bcryptRounds: number;

  // Redis
  redisHost: string;
  redisPort: number;
  redisPassword: string;
  redisDb: number;

  // Mobile Money
  lumicash: {
    apiUrl: string;
    apiKey: string;
    apiSecret: string;
    merchantId: string;
  };
  ecocash: {
    apiUrl: string;
    apiKey: string;
    apiSecret: string;
    merchantId: string;
  };

  // Partner Institution
  partner: {
    apiUrl: string;
    apiKey: string;
    apiSecret: string;
    institutionId: string;
    lendingPoolAccount: string;
    repaymentAccount: string;
  };

  // SMS Gateway
  sms: {
    provider: string;
    twilio: {
      accountSid: string;
      authToken: string;
      phoneNumber: string;
    };
  };

  // USSD Gateway
  ussd: {
    gatewayUrl: string;
    apiKey: string;
    shortCode: string;
  };

  // WhatsApp
  whatsapp: {
    enabled: boolean;
    businessAccountId: string;
    accessToken: string;
    phoneNumberId: string;
    verifyToken: string;
  };

  // AI/ML
  ai: {
    enabled: boolean;
    modelEndpoint: string;
    apiKey: string;
    autoApproveThreshold: number;
    highRiskThreshold: number;
  };

  // Interest Rates
  interestRates: {
    tier1: { min: number; max: number; rate: number };
    tier2: { min: number; max: number; rate: number };
    tier3: { min: number; rate: number };
    loans: {
      hours48: number;
      days7: number;
      days14: number;
      days30: number;
    };
  };

  // Fees
  fees: {
    platformFeePercentage: number;
    lateFeeAmount: number;
  };

  // Loan Limits
  creditMultipliers: {
    months0to3: number;
    months4to6: number;
    months7to12: number;
    months12plus: number;
  };
  groupLoanThresholdPercent: number;

  // Grace Periods
  gracePeriodHours: number;

  // Notifications
  notifications: {
    enabled: boolean;
    channels: string[];
    reminders: {
      tMinus3: boolean;
      tMinus1: boolean;
      dueDate: boolean;
    };
  };

  // Gamification
  gamification: {
    enabled: boolean;
    milestones: {
      bonus100k: number;
      bonus500k: number;
    };
  };

  // Financial Literacy
  literacy: {
    completionBonus: number;
    passingScore: number;
  };

  // Security
  corsOrigin: string[];
  maxPinAttempts: number;
  pinLockoutDurationMinutes: number;

  // Rate Limiting
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;

  // File Uploads
  uploads: {
    maxSizeMb: number;
    allowedTypes: string[];
    storagePath: string;
  };
}

export const config: Config = {
  // Application
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiVersion: process.env.API_VERSION || 'v1',

  // Database
  databaseUrl: process.env.DATABASE_URL || '',

  // Authentication
  jwtSecret: process.env.JWT_SECRET || 'default-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-change-me',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),

  // Redis
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
  redisPassword: process.env.REDIS_PASSWORD || '',
  redisDb: parseInt(process.env.REDIS_DB || '0', 10),

  // Mobile Money
  lumicash: {
    apiUrl: process.env.LUMICASH_API_URL || '',
    apiKey: process.env.LUMICASH_API_KEY || '',
    apiSecret: process.env.LUMICASH_API_SECRET || '',
    merchantId: process.env.LUMICASH_MERCHANT_ID || '',
  },
  ecocash: {
    apiUrl: process.env.ECOCASH_API_URL || '',
    apiKey: process.env.ECOCASH_API_KEY || '',
    apiSecret: process.env.ECOCASH_API_SECRET || '',
    merchantId: process.env.ECOCASH_MERCHANT_ID || '',
  },

  // Partner Institution
  partner: {
    apiUrl: process.env.PARTNER_API_URL || '',
    apiKey: process.env.PARTNER_API_KEY || '',
    apiSecret: process.env.PARTNER_API_SECRET || '',
    institutionId: process.env.PARTNER_INSTITUTION_ID || 'UMUCO',
    lendingPoolAccount: process.env.KIRIMBA_LENDING_POOL_ACCOUNT || '',
    repaymentAccount: process.env.KIRIMBA_REPAYMENT_ACCOUNT || '',
  },

  // SMS Gateway
  sms: {
    provider: process.env.SMS_PROVIDER || 'twilio',
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID || '',
      authToken: process.env.TWILIO_AUTH_TOKEN || '',
      phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
    },
  },

  // USSD Gateway
  ussd: {
    gatewayUrl: process.env.USSD_GATEWAY_URL || '',
    apiKey: process.env.USSD_GATEWAY_API_KEY || '',
    shortCode: process.env.USSD_SHORT_CODE || '*384#',
  },

  // WhatsApp
  whatsapp: {
    enabled: process.env.WHATSAPP_ENABLED === 'true',
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || '',
  },

  // AI/ML
  ai: {
    enabled: process.env.AI_MODEL_ENABLED === 'true',
    modelEndpoint: process.env.AI_MODEL_ENDPOINT || 'http://localhost:5000/predict',
    apiKey: process.env.AI_MODEL_API_KEY || '',
    autoApproveThreshold: parseFloat(process.env.AUTO_APPROVE_THRESHOLD || '0.30'),
    highRiskThreshold: parseFloat(process.env.HIGH_RISK_THRESHOLD || '0.50'),
  },

  // Interest Rates
  interestRates: {
    tier1: {
      min: parseFloat(process.env.INTEREST_TIER_1_MIN || '0'),
      max: parseFloat(process.env.INTEREST_TIER_1_MAX || '100000'),
      rate: parseFloat(process.env.INTEREST_TIER_1_RATE || '4.00'),
    },
    tier2: {
      min: parseFloat(process.env.INTEREST_TIER_2_MIN || '100001'),
      max: parseFloat(process.env.INTEREST_TIER_2_MAX || '500000'),
      rate: parseFloat(process.env.INTEREST_TIER_2_RATE || '5.00'),
    },
    tier3: {
      min: parseFloat(process.env.INTEREST_TIER_3_MIN || '500001'),
      rate: parseFloat(process.env.INTEREST_TIER_3_RATE || '6.00'),
    },
    loans: {
      hours48: parseFloat(process.env.LOAN_RATE_48_HOURS || '8.00'),
      days7: parseFloat(process.env.LOAN_RATE_7_DAYS || '6.00'),
      days14: parseFloat(process.env.LOAN_RATE_14_DAYS || '5.00'),
      days30: parseFloat(process.env.LOAN_RATE_30_DAYS || '4.00'),
    },
  },

  // Fees
  fees: {
    platformFeePercentage: parseFloat(process.env.PLATFORM_FEE_PERCENTAGE || '1.00'),
    lateFeeAmount: parseFloat(process.env.LATE_FEE_AMOUNT || '2500'),
  },

  // Loan Limits
  creditMultipliers: {
    months0to3: parseFloat(process.env.CREDIT_MULTIPLIER_0_3_MONTHS || '1.5'),
    months4to6: parseFloat(process.env.CREDIT_MULTIPLIER_4_6_MONTHS || '2.0'),
    months7to12: parseFloat(process.env.CREDIT_MULTIPLIER_7_12_MONTHS || '2.5'),
    months12plus: parseFloat(process.env.CREDIT_MULTIPLIER_12_PLUS_MONTHS || '3.0'),
  },
  groupLoanThresholdPercent: parseFloat(process.env.GROUP_LOAN_THRESHOLD_PERCENT || '33'),

  // Grace Periods
  gracePeriodHours: parseInt(process.env.GRACE_PERIOD_HOURS || '48', 10),

  // Notifications
  notifications: {
    enabled: process.env.NOTIFICATIONS_ENABLED === 'true',
    channels: (process.env.NOTIFICATION_CHANNELS || 'sms,push,whatsapp').split(','),
    reminders: {
      tMinus3: process.env.REMINDER_T_MINUS_3 === 'true',
      tMinus1: process.env.REMINDER_T_MINUS_1 === 'true',
      dueDate: process.env.REMINDER_DUE_DATE === 'true',
    },
  },

  // Gamification
  gamification: {
    enabled: process.env.GAMIFICATION_ENABLED === 'true',
    milestones: {
      bonus100k: parseFloat(process.env.MILESTONE_100K_BONUS || '5000'),
      bonus500k: parseFloat(process.env.MILESTONE_500K_BONUS || '25000'),
    },
  },

  // Financial Literacy
  literacy: {
    completionBonus: parseFloat(process.env.LITERACY_COMPLETION_BONUS || '10000'),
    passingScore: parseInt(process.env.LITERACY_PASSING_SCORE || '80', 10),
  },

  // Security
  corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
  maxPinAttempts: parseInt(process.env.MAX_PIN_ATTEMPTS || '3', 10),
  pinLockoutDurationMinutes: parseInt(process.env.PIN_LOCKOUT_DURATION_MINUTES || '30', 10),

  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),

  // File Uploads
  uploads: {
    maxSizeMb: parseInt(process.env.UPLOAD_MAX_SIZE_MB || '5', 10),
    allowedTypes: (process.env.UPLOAD_ALLOWED_TYPES || 'image/jpeg,image/png,application/pdf').split(','),
    storagePath: process.env.UPLOAD_STORAGE_PATH || 'uploads/kyc',
  },
};

// Validate critical configuration
function validateConfig() {
  const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];

  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Run validation in production
if (config.nodeEnv === 'production') {
  validateConfig();
}

export default config;
