# KIRIMBA Banking System - Version 4

**Group Savings and Microloan Platform for Burundi**

KIRIMBA is a comprehensive financial inclusion platform designed to empower small-scale vendors and traders in Burundi through group-based savings and microloans. The system combines traditional ROSCA (Rotating Savings and Credit Association) principles with modern fintech capabilities, AI-powered credit scoring, and multi-channel access (USSD, Mobile App, WhatsApp).

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [User Journey Phases](#user-journey-phases)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🌟 Overview

KIRIMBA addresses the financial needs of informal traders and vendors who lack access to traditional banking services. By leveraging group trust relationships and mobile money infrastructure, KIRIMBA provides:

- **Group Savings Accounts**: Secure, interest-bearing joint accounts with FDIC-equivalent insurance
- **Quick Microloans**: 48-hour to 30-day loans with instant approval
- **AI Credit Assessment**: Sophisticated scoring based on savings behavior, loan history, and group health
- **Multi-Channel Access**: USSD, Mobile App, and WhatsApp interfaces
- **Financial Literacy**: Educational modules with completion bonuses
- **Gamification**: Leaderboards, achievements, and milestone rewards

---

## ✨ Key Features

### Phase 1: Group Formation & Onboarding
- Multi-channel group registration (USSD, Mobile App, Agent-Assisted)
- Simplified KYC verification
- Automatic account creation with partner institutions
- Member invitation and enrollment system

### Phase 2: Savings Accumulation
- Mobile money integration (Lumicash, EcoCash)
- Automated recurring transfers
- Tiered interest rates (4%-6% annually)
- Real-time balance tracking
- Milestone bonuses and gamification

### Phase 3: Loan Request & Approval
- AI-powered credit assessment (30-second decisions)
- Three approval pathways:
  - Instant approval (≤ 1.5x personal savings)
  - Group voting (> personal limit but ≤ 33% group savings)
  - Declined with improvement path
- 5-30 minute disbursement via mobile money

### Phase 4: Repayment & Management
- Flexible repayment options (mobile money, cash, auto-debit, installments)
- Proactive reminders (T-3 days, T-1 day, due date)
- Grace periods and hardship support
- Automated default handling with collateral deduction

### Phase 5: Growth & Advancement
- Credit limit progression (1.5x to 3x multipliers)
- Product graduation (Quick Loans → Growth Loans → MFI Products → Bank)
- Financial literacy program (5 modules)
- Community building and recognition programs

---

## 🚀 Technology Stack

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL 16
- **Cache**: Redis 7

### AI/ML
- **Framework**: Python (Flask)
- **Libraries**: scikit-learn, TensorFlow/PyTorch
- **Features**: Credit scoring, risk assessment

### Integrations
- **Mobile Money**: Lumicash, EcoCash
- **SMS**: Twilio / Africa's Talking
- **USSD**: Custom gateway integration
- **WhatsApp**: WhatsApp Business API
- **Partner Institution**: Umuco Microfinance API

### DevOps
- **Containerization**: Docker, Docker Compose
- **Testing**: Jest, Supertest
- **Logging**: Winston
- **Monitoring**: (TBD - Prometheus, Grafana)

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose
- PostgreSQL 16 (or use Docker)
- Redis 7 (or use Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fkenogo/Kirimba-banking-Version-4.git
   cd Kirimba-banking-Version-4
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start services with Docker**
   ```bash
   docker-compose up -d postgres redis
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

6. **Seed database (optional)**
   ```bash
   npm run seed
   ```

7. **Start development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

### Quick Start with Docker

```bash
# Start all services (database, cache, API, ML service)
docker-compose up

# View logs
docker-compose logs -f api

# Stop all services
docker-compose down
```

---

## 📁 Project Structure

```
kirimba-banking-v4/
├── src/
│   ├── config/           # Configuration files
│   │   ├── index.ts      # Main config
│   │   └── database.ts   # Prisma client
│   ├── controllers/      # Request handlers (TODO)
│   ├── middleware/       # Express middleware
│   │   ├── auth.ts       # Authentication
│   │   ├── errorHandler.ts
│   │   └── requestLogger.ts
│   ├── routes/           # API route definitions
│   │   ├── index.ts      # Main router
│   │   ├── auth.routes.ts
│   │   ├── group.routes.ts
│   │   ├── savings.routes.ts
│   │   ├── loan.routes.ts
│   │   ├── repayment.routes.ts
│   │   ├── gamification.routes.ts
│   │   └── ussd.routes.ts
│   ├── services/         # Business logic (TODO)
│   ├── utils/            # Utility functions
│   │   └── logger.ts     # Winston logger
│   ├── validators/       # Request validation (TODO)
│   └── server.ts         # Entry point
├── prisma/
│   └── schema.prisma     # Database schema
├── ml-service/           # AI/ML credit scoring (TODO)
├── tests/                # Test files (TODO)
├── logs/                 # Application logs
├── uploads/              # KYC document uploads
├── docker-compose.yml    # Docker services
├── Dockerfile            # API container
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── .env.example          # Environment template
└── README.md             # This file
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user

#### Groups (Phase 1)
- `POST /groups` - Create new group
- `GET /groups/:id` - Get group details
- `POST /groups/:id/members` - Add member
- `GET /groups/:id/members` - List members

#### Savings (Phase 2)
- `POST /savings/deposit` - Make deposit
- `POST /savings/recurring` - Setup recurring transfer
- `GET /savings/balance` - Get balance
- `GET /savings/transactions` - Transaction history

#### Loans (Phase 3)
- `POST /loans/request` - Request loan
- `GET /loans/:id` - Loan details
- `POST /loans/:id/vote` - Vote on group loan
- `GET /loans/credit-limit` - Get credit limit

#### Repayments (Phase 4)
- `POST /repayments/pay` - Make repayment
- `POST /repayments/auto-debit` - Enable auto-debit
- `GET /repayments/history` - Repayment history

#### Gamification (Phase 5)
- `GET /gamification/achievements` - User achievements
- `GET /gamification/leaderboard` - Leaderboard
- `GET /gamification/literacy/modules` - Literacy modules

#### USSD
- `POST /ussd/callback` - USSD gateway callback
- `POST /ussd/session` - Handle USSD session

*Full API documentation coming soon*

---

## 🗄️ Database Schema

The system uses PostgreSQL with Prisma ORM. Key entities:

- **User**: Members, leaders, agents, admins
- **Group**: Savings groups with 6-10 members
- **Account**: Group accounts and individual sub-accounts
- **Transaction**: All financial movements
- **Loan**: Loan records with approval workflow
- **CreditScore**: AI-powered credit assessment
- **Achievement**: Gamification and rewards

See `schema.prisma` for complete schema definition.

---

## 🛠️ Development

### Running Tests
```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Generate coverage report
```

### Code Quality
```bash
npm run lint              # Check code style
npm run format            # Format code with Prettier
```

### Database Management
```bash
npx prisma studio         # Open Prisma Studio GUI
npx prisma migrate dev    # Create migration
npx prisma migrate reset  # Reset database
```

### Viewing Logs
```bash
tail -f logs/combined.log
tail -f logs/error.log
```

---

## 🚀 Deployment

### Environment Setup

1. Production environment variables
2. Database migration
3. SSL certificates
4. Monitoring setup

*Detailed deployment guide coming soon*

---

## 📊 Current Implementation Status

### ✅ Completed
- [x] Database schema design (all phases)
- [x] Project structure and configuration
- [x] Docker setup for development
- [x] Core middleware (auth, error handling, logging)
- [x] Route structure (placeholders)
- [x] Configuration management

### 🚧 In Progress
- [ ] Phase 1: Group Formation & Onboarding implementation
- [ ] Authentication and KYC verification
- [ ] Partner institution API integration

### 📋 Pending
- [ ] Phase 2: Savings Accumulation
- [ ] Phase 3: Loan Request & AI Credit Assessment
- [ ] Phase 4: Repayment & Management
- [ ] Phase 5: Growth & Advancement
- [ ] Mobile money integration
- [ ] USSD gateway integration
- [ ] WhatsApp chatbot
- [ ] ML credit scoring model
- [ ] Comprehensive testing
- [ ] Documentation completion

---

## 📝 Gap Analysis

A comprehensive gap analysis document is available at:
`IMPLEMENTATION_REVIEW_AND_GAPS.md`

This document identifies:
- All missing features per user journey phase
- Technical architecture gaps
- Security concerns
- Integration requirements
- Priority implementation roadmap

---

## 🤝 Contributing

This is a proprietary system. For internal team members:

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test
3. Commit: `git commit -m "feat: your feature"`
4. Push: `git push origin feature/your-feature`
5. Create Pull Request

---

## 📄 License

Proprietary - KIRIMBA Development Team

---

## 📞 Support

For questions or issues, contact the KIRIMBA development team.

---

**Built to empower Burundian entrepreneurs through financial inclusion.**
