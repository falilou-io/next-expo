# minimal

This project identifies as a robust, full-stack monorepo starter, originally scaffolded via [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack). It unifies modern TypeScript tooling by combining Next.js, Expo, and oRPC, while extending the native mobile experience with [React Native Reusables](https://reactnativereusables.com/) components.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **React Native** - Build mobile apps using React
- **Expo** - Tools for React Native development
- **reactnativereusables** - Reusable UI components for Expo/React Native
- **Uniwind** - Utility-first CSS for rapid UI development for React Native
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components for web
- **oRPC** - End-to-end type-safe APIs with OpenAPI integration
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Better-Auth** - Type-safe authentication
- **Biome** - Linting and formatting
- **Turborepo** - Optimized monorepo build system

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Expo Go app (for mobile development)

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd minimal
```

2. Install dependencies:

```bash
pnpm install
```

### Environment Setup

Copy the example environment files and fill in your values:

**For Web App:**

```bash
cp apps/web/.env.example apps/web/.env
```

**For Native App:**

```bash
cp apps/native/.env.example apps/native/.env
```

Edit the `.env` files with your actual values:

- Set up your PostgreSQL database URL
- Configure Better-Auth settings
- Set your API URLs

### Database Setup

This project uses PostgreSQL with Drizzle ORM.

1. Ensure PostgreSQL is running and accessible
2. Update `apps/web/.env` with your database connection string
3. Push the schema to your database:

```bash
pnpm run db:push
```

4. (Optional) Open Drizzle Studio to view your database:

```bash
pnpm run db:studio
```

### Running the Applications

Start all applications in development mode:

```bash
pnpm run dev
```

Or run them individually:

**Web application:**

```bash
pnpm run dev:web
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

**Mobile application:**

```bash
pnpm run dev:native
```

Scan the QR code with Expo Go app on your device.

## Project Structure

```
minimal/
├── apps/
│   ├── web/                    # Next.js web application
│   │   ├── src/
│   │   │   ├── app/           # App router pages
│   │   │   │   ├── (protected)/  # Protected routes
│   │   │   │   ├── (public)/     # Public routes
│   │   │   │   └── api/          # API routes
│   │   │   ├── components/    # React components
│   │   │   └── lib/           # Utilities and helpers
│   │   └── .env.example       # Environment template
│   │
│   └── native/                 # React Native (Expo) mobile app
│       ├── app/               # Expo Router screens
│       │   ├── (protected)/  # Protected screens
│       │   └── (public)/     # Public screens
│       ├── components/        # React Native components
│       ├── lib/              # Mobile utilities
│       └── .env.example      # Environment template
│
├── packages/
│   ├── api/                   # oRPC API layer
│   │   └── src/
│   │       └── routers/      # API route definitions
│   │
│   ├── auth/                  # Better-Auth configuration
│   │   └── src/              # Auth logic and setup
│   │
│   ├── db/                    # Database layer
│   │   └── src/
│   │       ├── schema/       # Drizzle schema definitions
│   │       └── migrations/   # Database migrations
│   │
│   ├── env/                   # Environment variable validation
│   │   └── src/
│   │       ├── server.ts     # Server-side env vars
│   │       ├── web.ts        # Web client env vars
│   │       └── native.ts     # Mobile app env vars
│   │
│   └── config/               # Shared TypeScript configs
│
├── biome.json                # Biome configuration
├── turbo.json                # Turborepo configuration
├── pnpm-workspace.yaml       # PNPM workspace setup
└── package.json              # Root package.json
```

## Available Scripts

**Development:**

- `pnpm run dev` - Start all applications in development mode
- `pnpm run dev:web` - Start only the web application
- `pnpm run dev:native` - Start only the mobile application

**Build:**

- `pnpm run build` - Build all applications for production
- `pnpm run check-types` - Type check all packages

**Database:**

- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:studio` - Open Drizzle Studio (database GUI)
- `pnpm run db:generate` - Generate migrations
- `pnpm run db:migrate` - Run migrations

**Code Quality:**

- `pnpm run check` - Format and lint fix with Biome

## Tech Stack Details

### Frontend

- **Web**: Next.js 15 with App Router, React 19, TailwindCSS
- **Mobile**: Expo SDK 52, React Native, NativeWind

### Backend

- **API**: oRPC for type-safe APIs
- **Auth**: Better-Auth for authentication
- **Database**: PostgreSQL with Drizzle ORM

### Development

- **Monorepo**: Turborepo for build orchestration
- **Package Manager**: pnpm with workspaces
- **Type Safety**: TypeScript with strict mode
- **Code Quality**: Biome for linting and formatting
