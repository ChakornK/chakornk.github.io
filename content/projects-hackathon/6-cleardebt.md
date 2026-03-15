---
name: ClearDebt
description: Pay off debt smarter — AI that knows your calendar, your spending, and your next paycheck.
thumbnail: /projects/cleardebt/1.png
thumbnailPosition: center
devpost: cleardebt
github: ChakornK/clear-debt
website: https://clear-debt.vercel.app
skills: Next.js, React, Tailwind, Google OAuth, Snowflake, Plaid, FastAPI
awards: MLH Best Use of Snowflake API
---

ClearDebt was built at Mountain Madness 2026, a 24-hour hackathon, in collaboration with [@e-neuf](https://github.com/e-neuf), [@sharmagaurika](https://github.com/sharmagaurika), and [@TulikaVarma](https://github.com/TulikaVarma).

It is an intelligent personal finance platform that transforms multi-calendar complexity into actionable debt repayment insights. ClearDebt integrates spending behavior, calendar events, and AI-powered predictions to help users take control of their financial future.

![Landing page](/projects/cleardebt/1.png)

## Inspiration

Most debt repayment tools ignore the reality of modern life — that a "Study Group at Coffee Shop" event on your calendar means $25 in spending, or that three social events in one weekend requires proactive budget adjustments. ClearDebt helps users eliminate debt faster by combining real banking data, calendar intelligence, and AI-powered repayment strategies. Instead of generic advice, every recommendation is grounded in the user's actual balances, spending behavior, and upcoming financial events.

When you add a calendar event, ClearDebt uses Gemini AI to instantly predict how much you'll spend — before the money leaves your account.

## Features

### Dashboard

A real-time overview of debt progress, weekly spending analysis, daily cost distribution, spending categories, upcoming calendar events with predicted costs, and milestone alerts.

![Dashboard 1](/projects/cleardebt/2.png)

### Spending Behavior Analyzer

Reads 90 days of transaction history and surfaces patterns — average monthly spend by category, recurring subscriptions, and seasonal spikes. This output feeds directly into the AI's reasoning when generating your repayment plan. Shows personalized spending insights - like a warning, win, or tip based on your actual financial patterns. It looks at your real Snowflake data: debts, transactions, and spending habits, and surfaces your single most relevant recent achievement, like a streak, savings goal hit, or budget win, to keep you motivated.

![Dashboard 2](/projects/cleardebt/3.png)

### Multi-Source Debt Aggregation

Connects to real bank accounts via Plaid (credit cards, lines of credit, student loans, auto loans)
Manual debt entry for accounts outside Plaid
All data unified in Snowflake as a single financial profile

![Setup 1](/projects/cleardebt/7.png)
![Setup 2](/projects/cleardebt/8.png)
![Setup 3](/projects/cleardebt/9.png)
![Setup 4](/projects/cleardebt/10.png)

### Calendar Intelligence Layer

Overlays debt due dates, income events, and planned expenses on a monthly calendar
Detects cash flow conflicts when debt payments and large expenses fall in the same week
Calculates the optimal window to make extra debt payments (after income arrives, before next due date)
Flags months where total outgoing payments exceed expected income

### AI Event Spending Predictor

The core innovation. When you add a calendar event like "Birthday Dinner Downtown" or "Weekend Trip to Niagara Falls", Gemini AI instantly predicts the likely spend, category, and itemized breakdown — before you even think about it.

![Calendar](/projects/cleardebt/4.png)
![Add event](/projects/cleardebt/5.png)

### AI Financial Chat (Gemini)

Context-aware chat grounded in the user's actual debt data and repayment plan
Handles hypotheticals: "What if I got a $3k bonus?" or "Should I consolidate?"
Full conversation history re-injected on every message for continuity

![Chat](/projects/cleardebt/6.png)

## Tech stack

- **Frontend**: TypeScript, Next.js, React, Tailwind
- **Backend**: Python, FastAPI
- **Database**: Snowflake
- **Auth**: Google OAuth 2.0
- **Bank Integration**: Plaid
