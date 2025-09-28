# GrandCare Connect

A production-ready web application connecting working parents with background-checked elderly couples for childcare services.

## Features

- **Smart Matching Algorithm**: Find caregivers based on location, availability, experience, and compatibility
- **Background Verification**: All caregivers undergo thorough background checks and ID verification
- **Secure Payments**: Stripe integration with hold and capture for safe transactions
- **Real-time Messaging**: Secure communication between parents and caregivers
- **Review System**: Rate and review caregivers after completed bookings
- **Admin Dashboard**: Manage caregivers, bookings, and platform metrics
- **Mobile Responsive**: Works seamlessly on all devices

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js with credentials and Google OAuth
- **Payments**: Stripe (test mode)
- **File Uploads**: UploadThing
- **Email**: Resend
- **Testing**: Vitest, Testing Library
- **Deployment**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd grandcare-connect
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/grandcare_connect"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"
RESEND_API_KEY="re_..."
```

5. Set up the database:
```bash
pnpm db:generate
pnpm db:push
pnpm db:seed
```

## Prisma Gotchas

After installing dependencies, if you encounter Prisma client errors, run:
```bash
pnpm prisma:generate
```

This ensures the Prisma client is properly generated and matches your schema. The `postinstall` script should handle this automatically, but manual generation may be needed in some cases.

6. Start the development server:
```bash
pnpm dev
```

### Using Docker

1. Start the services:
```bash
docker-compose up -d
```

2. Run database migrations:
```bash
docker-compose exec app pnpm db:push
docker-compose exec app pnpm db:seed
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with sample data
- `pnpm db:studio` - Open Prisma Studio

## Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── caregivers/        # Caregiver pages
│   ├── dashboard/         # Dashboard pages
│   └── legal/             # Legal pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Authentication components
│   ├── caregivers/       # Caregiver components
│   ├── dashboard/        # Dashboard components
│   └── landing/          # Landing page components
├── lib/                  # Utility libraries
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   ├── stripe.ts        # Stripe configuration
│   └── validations/     # Zod schemas
├── prisma/              # Database schema and migrations
├── test/                # Test files
└── types/               # TypeScript type definitions
```

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User**: Authentication and basic user info
- **Profile**: Extended user profile information
- **Child**: Parent's children information
- **CaregiverCouple**: Elderly couple caregiver profiles
- **Listing**: Caregiver service listings
- **Booking**: Care booking requests and management
- **Payment**: Stripe payment tracking
- **Review**: Parent reviews of caregivers
- **Message**: Real-time messaging system

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Profile Management
- `GET /api/me` - Get current user profile
- `PUT /api/me` - Update user profile

### Children Management
- `GET /api/children` - Get user's children
- `POST /api/children` - Add a child
- `PUT /api/children/:id` - Update child info
- `DELETE /api/children/:id` - Remove a child

### Caregiver Search
- `GET /api/caregivers/search` - Search caregivers with filters
- `GET /api/caregivers/:id` - Get caregiver details

### Booking Management
- `POST /api/bookings/quote` - Get booking price quote
- `POST /api/bookings` - Create new booking
- `POST /api/bookings/:id/accept` - Accept booking (caregiver)
- `POST /api/bookings/:id/decline` - Decline booking
- `POST /api/bookings/:id/cancel` - Cancel booking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@grandcareconnect.com or create an issue in the repository.
