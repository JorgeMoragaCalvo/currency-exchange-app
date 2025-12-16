# Currency Exchange Dashboard

A modern currency exchange dashboard with real-time rates and an innovative transfer cost calculator. Built with Next.js 16, React 19, and Tailwind CSS v4.

## Features

- **Currency Converter**: Convert between 30+ currencies with live exchange rates
- **Exchange Rates Table**: View rates for all available currencies from any base
- **Transfer Calculator**: Calculate the true cost of international money transfers including fees and margins

## Setup Instructions

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd currency-app

# Install dependencies
npm install
```

### Running the Application

```bash
# Development server
npm run dev

# Production build
npm run build
npm start

# Lint code
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Innovation Feature: Transfer Calculator

The Transfer Calculator goes beyond simple currency conversion by revealing the true cost of international money transfers.

### Key Features

**Dual Mode Operation**

- **Send Mode**: Enter the amount you want to send, see how much the recipient gets
- **Receive Mode**: Enter the amount you want the recipient to receive, see how much you need to send (uses reverse calculation)

**Fee Transparency**

- **Flat Fee**: Fixed transfer fee (e.g., $5.00)
- **Percentage Fee**: Fee based on transfer amount (e.g., 1.5%)
- **Exchange Rate Margin**: Hidden markup on the exchange rate (e.g., 2% worse than market rate)

**Detailed Breakdown**

- Shows market rate vs. your effective rate
- Displays all fee components separately
- Calculates total cost including hidden margins

**Smart Calculation**

- Real-time updates with 300ms debounce
- Reverse calculation in Receive mode solves the algebraic equation to determine exact send amount
- Handles edge cases like zero fees and same-currency validation

### How It Works

In **Send Mode**, the calculation is straightforward:

```
Amount Received = (Amount Sent - Flat Fee - Percentage Fee) × Effective Rate
```

In **Receive Mode**, the calculator works backwards:

```
Amount to Send = (Amount to Receive / Effective Rate + Flat Fee) / (1 - Percentage Fee Rate)
```

This reverse calculation lets users know exactly how much they need to send to ensure the recipient gets a specific amount.

## Assumptions and Trade-offs

### API Choice

- Uses the **Frankfurter API** which is free and requires no API key
- Limited to ~30 major currencies (no cryptocurrency support)
- Rates update hourly with Next.js cache revalidation

### Design Decisions

- **Simulated Fees**: Users manually enter their transfer provider's fees rather than fetching from actual services
- **No Authentication**: No user accounts or saved preferences for simplicity
- **No Historical Data**: Focuses on current rates without historical charts
- **Client-side State**: Uses React state rather than a state management library for simplicity

### Use of IA

- Firstly, to address this project, I consulted the Next.js and Tailwind CSS documentation to ensure best practices.
- Secondly, I consulted two repo for ideas.
  - [REPO1](https://github.com/AbdulAHAD968/Currency-Converter)
  - [REPO2](https://github.com/moosa-codes/Currency-converter-live-)
- Third, I used Claude Opus 4.5 (I think it's better for programming) for brainstorming, programming sections, and resolve (difficult) bugs. I use a `Markdown` file (or an `XML` file, depending on the model) to provide instructions and guidelines to the model in English.

### Performance Trade-offs

- Server Components for initial data fetching (SEO-friendly)
- Client Components for interactive features (real-time updates)
- Debounced API calls to prevent excessive requests

## Future Improvements

- **Historical Rate Charts**: Visualize currency trends over time
- **Provider Comparison**: Compare fees across services (Wise, Revolut, Western Union, etc.)
- **Rate Alerts**: Notifications when rates reach target values
- **PWA Support**: Offline access and mobile app experience
- **Cryptocurrency**: Support for Bitcoin, Ethereum, and other digital currencies
- **Dark Mode Toggle**: Currently auto-detects system preference, could add manual toggle

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS v4
- **Language**: TypeScript
- **API**: Frankfurter API
- **Architecture**: Server Actions for data fetching

## Data Source

Exchange rate data provided by [Frankfurter API](https://www.frankfurter.app/), which sources rates from the European Central Bank.

---

Built for the Currency Exchange Dashboard challenge.
