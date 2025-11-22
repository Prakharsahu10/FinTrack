# 💰 FinTrack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Prisma](https://img.shields.io/badge/Prisma-6.3.0-2D3748?style=for-the-badge&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

**Modern financial tracking application for personal expense management**

</div>

## ✨ Features

- 📊 **Smart Dashboard** - Visualize your financial data with interactive charts
- 💳 **Multi-Account Management** - Track both Current and Savings accounts
- 📝 **Transaction Logging** - Easily record income and expenses with categories
- 📅 **Recurring Transactions** - Set up daily, weekly, monthly, or yearly transactions
- 💸 **Budget Planning** - Set monthly budgets and get progress visualizations
- 🧾 **Receipt Storage** - Attach receipt images to your transactions
- 🔒 **Secure Authentication** - Powered by Clerk for secure user management

## 🚀 Tech Stack

<div align="center">

### Frontend

Next.js • React 19 • TailwindCSS • ShadCN UI • Recharts

### Backend

Next.js API Routes • PostgreSQL • Prisma ORM

### Infrastructure

Clerk Auth • React Email • Resend

</div>

## 📸 Screenshots

<div align="center">
  <i>Your screenshots will go here</i>
</div>

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- NPM or Yarn
- PostgreSQL database

### Environment Setup

Create a `.env` file in the root directory:

```bash
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

```bash
# Clone the repo
git clone https://github.com/Prakharsahu10/fintrack.git
cd fintrack

# Install dependencies
npm install

# Set up database
npx prisma migrate dev

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app in action! ✨

## 📁 Project Structure

```
fintrack/
├── app/                 # Next.js App Router routes
├── actions/             # Server actions
├── components/          # Reusable UI components
├── emails/              # Email templates
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── prisma/              # Database schema & migrations
└── public/              # Static assets
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License.

---

<div align="center">
  Made with ❤️ by [Your Name]
</div>
