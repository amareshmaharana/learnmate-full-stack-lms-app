import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP, admin } from "better-auth/plugins";

import { prisma } from "./db";
import { env } from "./env";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "LearnMate <onboarding@resend.dev>",
          to: [email],
          subject: "LearnMate - Verify your email",
          html: `
            <p>
              Hi, Welcome to LearnMate! We're excited to have you on board. Please use the following One-Time Password (OTP) to verify your email address:
            </p>
            <p>Your verification code is: <strong>${otp}</strong></p>
          `,
        });
      },
    }),
    admin()
  ],
});
