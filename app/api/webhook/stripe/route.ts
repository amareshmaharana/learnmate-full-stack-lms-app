import { headers } from "next/headers";
import Stripe from "stripe";

import { prisma } from "@/lib/db";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();

  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return new Response(`Webhook Error: Invalid Payload`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const courseId = session.metadata?.courseId;
    const customerId = session.customer as string;

    if (!courseId) {
      throw new Error("Course ID is missing in metadata");
    }

    const user = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) {
      throw new Error("User not found for the given customer ID");
    }

    await prisma.enrollment.update({
      where: {
        id: session.metadata?.enrollmentId as string,
      },
      data: {
        userId: user.id,
        courseId: courseId,
        amount: session.amount_total as number,
        status: "Active",
      },
    });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
