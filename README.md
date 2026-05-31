# 📚 LearnMate

> A modern learning management system built with Next.js App Router, Prisma, better-auth, Stripe, and S3-compatible storage.

---

## Overview

LearnMate is a full-stack LMS designed for course publishing, enrollment, lesson delivery, and secure admin workflows. It includes server-side authentication, media uploads, payment handling, and an admin dashboard for managing content and analytics.

### Key capabilities

- ⚡ Next.js App Router with server components and route handlers
- 🔐 Server-side auth with better-auth and role-based access helpers
- 📦 S3 presigned uploads for course media and thumbnails
- 💳 Stripe checkout and webhook-based enrollment activation
- 🗄️ Prisma ORM for database access and schema management
- 🎓 Lesson progress tracking and course dashboard views

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js route handlers, server actions
- **Auth:** better-auth
- **Database:** Prisma + PostgreSQL
- **Payments:** Stripe
- **Storage:** S3-compatible object storage
- **Email:** Resend

---

## Project Structure

- `app/` - App Router pages, layouts, dashboards, and API routes
- `components/` - Reusable UI, editor, uploader, and navigation components
- `hooks/` - Shared client hooks and utilities
- `lib/` - Auth, database, email, S3, Stripe, env, and helper modules
- `prisma/` - Prisma schema and related database files
- `public/` - Static assets

---

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm or pnpm
- PostgreSQL database
- Stripe test account and keys
- S3-compatible bucket or endpoint

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the app at:

```text
http://127.0.0.1:3000
```

### Production build

```bash
npm run build
npm run start
```

---

## Environment Variables

Create a `.env` or `.env.local` file in the project root and configure the following values as needed:

- `DATABASE_URL` - Prisma database connection string
- `BETTER_AUTH_URL` - Application base URL for auth flows
- `AWS_ENDPOINT_URL_S3` - S3 or S3-compatible endpoint URL
- `AWS_ACCESS_KEY_ID` - S3 access key
- `AWS_SECRET_ACCESS_KEY` - S3 secret key
- `NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES` - Public image bucket name
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `RESEND_API_KEY` - Resend API key for email delivery
- `NEXTAUTH_SECRET` - Optional legacy auth secret, if used in your setup

### Development note

For local development, use:

```text
BETTER_AUTH_URL=http://127.0.0.1:3000
```

Using `localhost` and `127.0.0.1` interchangeably can lead to cookie and session mismatches.

---

## Core Workflows

### Authentication

- better-auth manages sign-in, session handling, and protected server actions.
- Use `requireUser()` and `requireAdmin()` to guard pages, routes, and mutations.

### Course enrollment

- Users enroll in a course from the public course page.
- Enrollment data is stored in Prisma and linked to the user and course.
- Stripe checkout can be used to finalize payment-based access.

### Lesson completion

- Lessons track completion through `lessonProgress` records.
- The dashboard reflects progress based on completed lessons in each course.

### Media uploads

- Admins request a presigned upload URL from the server.
- The browser uploads directly to S3-compatible storage using that URL.

### Payments

- Stripe checkout sessions are created for course purchases.
- Webhooks update enrollment status when payment succeeds.

---

## Useful Commands

```bash
npm install
npm run dev
npm run build
npm run start
npx prisma studio
npx prisma migrate dev
```

If you are testing Stripe locally:

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

---

## Troubleshooting

### App redirects to login unexpectedly

- Confirm `BETTER_AUTH_URL` matches the exact host you open in the browser.
- Prefer `http://127.0.0.1:3000` during development.

### Upload API redirects to not-admin

- The upload endpoint is protected by admin checks.
- Verify the current user has `role = "admin"`.

### Stripe webhook is not activating enrollments

- Make sure the Stripe CLI or dashboard is forwarding events to your local route.
- Confirm the webhook secret matches the configured environment variable.

### Port 3000 is already in use

```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
npm run dev
```

---

## Development Notes

- Keep Prisma schema and generated client in sync after model changes.
- Revalidate pages after server actions when course or lesson data changes.
- Use S3-compatible signed URLs for secure file delivery.

---

## Contributing

1. Fork the repository and create a feature branch.
2. Install dependencies and configure environment variables.
3. Add or update tests where relevant.
4. Open a pull request with a clear summary of the change.

---

## Support

If you run into issues, open an issue with:

- a short description of the problem
- reproduction steps
- expected vs actual behavior
- relevant screenshots or logs

---

Made with ❤️ using TypeScript and Next.js.
