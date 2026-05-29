
# 📚 LearnMate - Learning Management System 

> It is a modern, full-stack Next.js App Router learning platform with admin dashboard, S3 media uploads, Stripe payments, and server-side auth using better-auth. Designed for fast local development and easy deployment. 🚀

---

## ✨ Highlights

- Full App Router (Next.js) with server components and server-side APIs
- Presigned S3 uploads for media (thumbnail/course assets)
- Stripe checkout + webhook to mark enrollments active
- Role-based auth (user / admin) with server-side guards (`requireUser`, `requireAdmin`)
- Prisma ORM for Postgres-style database
- Developer-friendly: local-first workflows and troubleshooting notes

---

## 🧭 Quick Start

Prerequisites:

- Node.js 18+
- npm or pnpm
- A working database (Postgres/Neon) and Prisma configured
- Stripe test keys for payments
- S3-compatible storage (AWS S3, MinIO, or S3-compatible endpoint)

Install and run locally:

```bash
# install
npm install

# local dev server
npm run dev

# build for production
npm run build

# run production build
npm run start
```

Open http://127.0.0.1:3000 in your browser.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root (example: `.env.local`). Important variables used by the app:

- `DATABASE_URL` — Prisma DB connection string
- `BETTER_AUTH_URL` — base URL for `better-auth` (use `http://127.0.0.1:3000` in dev to avoid cookie host mismatch) 🛠️
- `NEXTAUTH_SECRET` — random secret used by auth (if applicable)
- `AWS_ENDPOINT_URL_S3` — S3 endpoint (e.g. `https://s3.amazonaws.com` or MinIO endpoint)
- `AWS_ACCESS_KEY_ID` — S3 access key
- `AWS_SECRET_ACCESS_KEY` — S3 secret key
- `NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES` — public bucket name for image assets
- `STRIPE_SECRET_KEY` — Stripe secret key (test)
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret (test)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key (test)
- `RESEND_API_KEY` — (optional) Resend email API key

Notes:

- In development, set `BETTER_AUTH_URL` to `http://127.0.0.1:3000` (not `localhost`) to ensure cookies are set/recognized by the app and API routes. Using mismatched hosts causes session/cookie failures and redirects to `/login`.

---

## 🧩 Architecture & Key Flows

- Authentication: `better-auth` on server-side (with Prisma adapter). Server-only helpers like `requireUser()` and `requireAdmin()` gate API routes and actions.
- File uploads: Client requests a presigned URL from `POST /api/s3/upload` (server validates admin role), then uploads directly to S3 using a `PUT` to the presigned URL.
- Payments: Course purchase creates a Stripe Checkout Session (metadata stores `userId`, `courseId`, `enrollmentId`). The server webhook at `/api/webhook/stripe` handles `checkout.session.completed` and sets `Enrollment.status = "Active"`.
- Dashboard: Admin dashboard queries Prisma for aggregated stats (revenue, paid enrollments, active students, total courses).

---

## 🛠️ Common Development Notes & Troubleshooting

- Server won't start / port locked:

	- If Next fails with `Port 3000 is in use` or `.next/dev/lock` issues, find and kill the process using the port (Windows example):

	```powershell
	netstat -ano | findstr :3000
	taskkill /PID <PID> /F
	npm run dev
	```

- Cookie / session redirect loops:

	- If non-browser clients (curl) or the app keep redirecting to `/login`, ensure `BETTER_AUTH_URL` matches the host you use in the browser. In development we recommend `http://127.0.0.1:3000` to avoid `localhost` vs `127.0.0.1` mismatches.

- Uploads redirecting to `/not-admin` (POST /api/s3/upload → 307 → /not-admin):

	- The presign endpoint is admin-protected with `requireAdmin()`. Either log in as an admin account or set your user to `role = "admin"` in the database.
	- To change a user's role using Prisma (quick dev way):

	```js
	// run this with node/ts or a small script that imports Prisma client
	await prisma.user.update({ where: { email: 'you@domain' }, data: { role: 'admin' } })
	```

- Stripe webhook not updating enrollments / $0 revenue in dashboard:

	- Ensure Stripe webhooks are delivered to your dev server. With the Stripe CLI locally:

	```bash
	stripe listen --forward-to localhost:3000/api/webhook/stripe
	```

	- Confirm `STRIPE_WEBHOOK_SECRET` matches the signing secret shown by the stripe CLI or dashboard.

---

## 🔧 S3 Presigned Upload Flow (summary)

1. Client requests `POST /api/s3/upload` with file metadata.
2. Server checks `requireAdmin()` and, if allowed, returns a presigned `PUT` URL and object key.
3. Client performs `PUT` to the presigned URL to upload the file directly to S3.

If step 2 returns a 307 redirect to `/not-admin`, the server-side guard rejected the request.

---

## ✅ Testing & Running Local Integrations

- Stripe:

	- Use Stripe test keys and `stripe listen` to test webhooks locally.

- S3:

	- For local development, you may use MinIO or a public S3 bucket. Ensure `AWS_ENDPOINT_URL_S3` and credentials are set.

- Database:

	- Use `npx prisma migrate dev` to run migrations, `npx prisma studio` to inspect data.

---

## 🧰 Useful Commands

- Install deps: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Start (production): `npm run start`
- Prisma studio: `npx prisma studio`
- Run tests (if any): `npm test`

---

## 📁 Project Structure (high level)

- `app/` — Next.js App Router pages, API routes, and layouts
- `components/` — UI components and shared widgets (uploader, rich-text editor, admin UI)
- `lib/` — utilities, S3 client, Stripe helper, auth glue, and environment helpers
- `prisma/` — Prisma schema and migrations
- `public/` — static assets

Refer to files such as `app/api/s3/upload/route.ts`, `app/api/webhook/stripe/route.ts`, and `components/file-uploader/Uploader.tsx` for implementation details.

---

## 🧑‍💻 Contributing

Contributions are welcome — please follow these steps:

1. Fork the repo and create a feature branch.
2. Run `npm install` and ensure your `.env` is set for local development.
3. Add tests for new functionality where applicable.
4. Open a PR with a clear description of changes.

---

## 📬 Contact & Support

If you hit any blockers, open an issue with reproduction steps, or reach out to the project maintainer.

---

<!-- ## ⚖️ License

This project uses the license defined in the repository. Add a `LICENSE` file if you want to make it explicit.

--- -->

Made with ❤️ and TypeScript. Happy hacking! 🎉
