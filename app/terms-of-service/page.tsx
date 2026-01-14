import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/lms-logo.png";

export default function TermsOfServicePage() {
  return (
    <>
      <div className="mx-auto py-10">
        <div className="text-center flex flex-col items-center justify-center">
          <Link
            href="/"
            className="flex self-center text-2xl font-bold text-center gap-2 mb-5"
          >
            <Image src={Logo} alt="logo" height={32} width={32} />
            LearnMate.
          </Link>
        </div>

        <h1
          className="text-center text-4xl"
          style={{ fontFamily: "Franklin Gothic Medium" }}
        >
          Terms of Service
        </h1>

        <div className="mt-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm text-gray-500" style={{ fontFamily: "Franklin Gothic Medium" }}>Last updated: 14th Jan 2026</p>
          </div>

          <Card className="p-8">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "Bahnschrift SemiBold" }}
            >
              1. Acceptance of Terms
            </h2>
            <p className="mb-6" style={{ fontFamily: "Segoe UI Semibold" }}>
              By accessing and using our Learning Management System (LMS), you
              agree to comply with and be bound by these Terms of Service. If
              you do not agree to these terms, please do not use our services.
            </p>

            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "Bahnschrift SemiBold" }}
            >
              2. User Responsibilities
            </h2>
            <p className="mb-6" style={{ fontFamily: "Segoe UI Semibold" }}>
              You are responsible for maintaining the confidentiality of your
              account information and for all activities that occur under your
              account. You agree to use the LMS in compliance with all
              applicable laws and regulations.
            </p>

            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "Bahnschrift SemiBold" }}
            >
              3. Course Content
            </h2>
            <p className="mb-6" style={{ fontFamily: "Segoe UI Semibold" }}>
              All course materials provided through the LMS are for your
              personal, non-commercial use only. You may not reproduce,
              distribute, or create derivative works from any course content
              without prior written permission from the content owner.
            </p>

            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "Bahnschrift SemiBold" }}
            >
              4. Payment and Refunds
            </h2>
            <p className="mb-6" style={{ fontFamily: "Segoe UI Semibold" }}>
              Payment for courses must be made in full before access is granted.
              Refunds are subject to our Refund Policy, which can be found on
              our website.
            </p>

            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "Bahnschrift SemiBold" }}
            >
              5. Termination
            </h2>
            <p className="mb-6" style={{ fontFamily: "Segoe UI Semibold" }}>
              We reserve the right to terminate or suspend your access to the
              LMS at our sole discretion, without prior notice, for conduct that
              we believe violates these Terms of Service or is harmful to other
              users of the LMS.
            </p>

            <h2 className="text-2xl font-bold mb-2">6. Changes to Terms</h2>
            <p className="mb-1" style={{ fontFamily: "Segoe UI Semibold" }}>
              We may update these Terms of Service from time to time. We will
              notify you of any changes by posting the new terms on this page.
              Your continued use of the LMS after any such changes constitutes
              your acceptance of the new Terms of Service.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
