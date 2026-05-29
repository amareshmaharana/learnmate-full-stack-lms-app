import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-start justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10 hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/95 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-600 px-6 py-10 text-white sm:px-10">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/80">
              Policy
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/90 sm:text-base">
              This policy explains how we collect, use, and protect your
              information when you use our application.
            </p>
          </div>

          <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Information We Collect
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                We may collect the following types of information:
              </p>
              <ul className="mt-4 space-y-3 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-700 ring-1 ring-slate-200 sm:text-base">
                <li>
                  <span className="font-semibold text-slate-900">
                    Personal Information:
                  </span>{" "}
                  This includes your name, email address, and any other
                  information you provide when you create an account or contact
                  us.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">
                    Usage Data:
                  </span>{" "}
                  We may collect information about how you use our application,
                  including the pages you visit, the features you use, and the
                  actions you take.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Cookies:</span>{" "}
                  We use cookies to enhance your experience and collect
                  information about your preferences.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                How We Use Your Information
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                We use the information we collect for the following purposes:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  "To provide and maintain our services",
                  "To improve and personalize your experience",
                  "To communicate with you about our services",
                  "To comply with legal obligations",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Sharing Your Information
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                We do not sell or rent your personal information to third
                parties. We may share your information with trusted service
                providers who assist us in operating our application, as long as
                they agree to keep your information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Your Rights
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                You have the right to access, update, or delete your personal
                information. You can do this by contacting us at [contact
                email].
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Changes to This Privacy Policy
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                We may update our privacy policy from time to time. We will
                notify you of any changes by posting the new privacy policy on
                this page.
              </p>
            </section>

            <section className="rounded-2xl bg-indigo-50 p-5 ring-1 ring-indigo-100">
              <h2 className="text-xl font-semibold text-slate-950">
                Contact Us
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                If you have any questions about this privacy policy, please
                contact us at [contact email].
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
