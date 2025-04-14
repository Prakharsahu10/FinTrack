# FinTrack

FinTrack is a personal finance management application built with Next.js that helps users track their expenses, manage multiple accounts, set budgets, and monitor their financial health.

## Features

- **Multiple Account Management**: Create and manage different types of accounts (Current, Savings)
- **Transaction Tracking**: Record income and expenses with categorization
- **Budget Management**: Set monthly budgets and track spending against them
- **Dashboard Overview**: Visualize your financial data with charts and statistics
- **Recurring Transactions**: Set up recurring transactions (daily, weekly, monthly, yearly)
- **Receipt Storage**: Upload and store receipts for your transactions
- **User Authentication**: Secure authentication system powered by Clerk

## Tech Stack

- **Frontend**: Next.js, React 19, Tailwind CSS, ShadCN UI
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Email**: React Email and Resend
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- NPM or Yarn
- PostgreSQL database

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fintrack"
DIRECT_URL="postgresql://username:password@localhost:5432/fintrack"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Resend for Email
RESEND_API_KEY=your_resend_api_key
```

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/fintrack.git
cd fintrack
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up the database

```bash
npx prisma migrate dev
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/app`: Application routes and components using Next.js App Router
- `/prisma`: Database schema and migrations
- `/components`: Reusable UI components
- `/actions`: Server actions for data fetching and mutations
- `/lib`: Utility functions and helpers
- `/emails`: Email templates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
