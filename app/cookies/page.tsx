import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Understand how TripAdverts uses cookies and similar technologies on our website and advertiser platform.",
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-white text-slate-900">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <header className="mb-12">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            &larr; Back to Home
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-2 text-slate-500">Last updated: March 1, 2026</p>
        </header>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              1. What Are Cookies
            </h2>
            <p>
              Cookies are small text files that are stored on your device
              (computer, tablet, or mobile phone) when you visit a website.
              They are widely used to make websites work more efficiently, to
              remember your preferences, and to provide information to website
              owners.
            </p>
            <p className="mt-4">
              This Cookie Policy explains how TripAdverts Inc.
              (&quot;TripAdverts,&quot; &quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;) uses cookies and similar technologies on our
              website at{" "}
              <span className="font-medium">www.tripadverts.com</span> and our
              advertiser dashboard. This policy should be read alongside our{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              2. How We Use Cookies
            </h2>
            <p>We use cookies for the following purposes:</p>

            <div className="mt-4 space-y-6">
              <div>
                <p className="font-medium text-slate-900">
                  2.1 Strictly Necessary Cookies
                </p>
                <p className="mt-2">
                  These cookies are essential for the operation of our website
                  and advertiser dashboard. They enable core functionality such
                  as account authentication, session management, and security
                  features. Without these cookies, our services cannot function
                  properly. These cookies do not require your consent.
                </p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm border border-slate-200 rounded">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left px-4 py-2 border-b border-slate-200 font-medium">
                          Cookie
                        </th>
                        <th className="text-left px-4 py-2 border-b border-slate-200 font-medium">
                          Purpose
                        </th>
                        <th className="text-left px-4 py-2 border-b border-slate-200 font-medium">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border-b border-slate-100 font-mono text-xs">
                          session_id
                        </td>
                        <td className="px-4 py-2 border-b border-slate-100">
                          Maintains your authenticated session
                        </td>
                        <td className="px-4 py-2 border-b border-slate-100">
                          Session
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b border-slate-100 font-mono text-xs">
                          csrf_token
                        </td>
                        <td className="px-4 py-2 border-b border-slate-100">
                          Protects against cross-site request forgery
                        </td>
                        <td className="px-4 py-2 border-b border-slate-100">
                          Session
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono text-xs">
                          cookie_consent
                        </td>
                        <td className="px-4 py-2">
                          Remembers your cookie preferences
                        </td>
                        <td className="px-4 py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  2.2 Functional Cookies
                </p>
                <p className="mt-2">
                  These cookies allow our website to remember choices you make
                  (such as your preferred dashboard layout or language
                  settings) and provide enhanced, personalized features.
                </p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm border border-slate-200 rounded">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left px-4 py-2 border-b border-slate-200 font-medium">
                          Cookie
                        </th>
                        <th className="text-left px-4 py-2 border-b border-slate-200 font-medium">
                          Purpose
                        </th>
                        <th className="text-left px-4 py-2 border-b border-slate-200 font-medium">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border-b border-slate-100 font-mono text-xs">
                          user_prefs
                        </td>
                        <td className="px-4 py-2 border-b border-slate-100">
                          Stores dashboard layout and display preferences
                        </td>
                        <td className="px-4 py-2 border-b border-slate-100">
                          1 year
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono text-xs">
                          tz_offset
                        </td>
                        <td className="px-4 py-2">
                          Detects your timezone for accurate campaign
                          scheduling
                        </td>
                        <td className="px-4 py-2">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  2.3 Analytics Cookies
                </p>
                <p className="mt-2">
                  These cookies help us understand how visitors interact with
                  our website by collecting and reporting information
                  anonymously. This helps us improve our website and services.
                </p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm border border-slate-200 rounded">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left px-4 py-2 border-b border-slate-200 font-medium">
                          Cookie
                        </th>
                        <th className="text-left px-4 py-2 border-b border-slate-200 font-medium">
                          Provider
                        </th>
                        <th className="text-left px-4 py-2 border-b border-slate-200 font-medium">
                          Purpose
                        </th>
                        <th className="text-left px-4 py-2 border-b border-slate-200 font-medium">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border-b border-slate-100 font-mono text-xs">
                          _va
                        </td>
                        <td className="px-4 py-2 border-b border-slate-100">
                          Vercel Analytics
                        </td>
                        <td className="px-4 py-2 border-b border-slate-100">
                          Measures website performance and visitor behavior
                        </td>
                        <td className="px-4 py-2 border-b border-slate-100">
                          1 year
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono text-xs">
                          _vsi
                        </td>
                        <td className="px-4 py-2">
                          Vercel Speed Insights
                        </td>
                        <td className="px-4 py-2">
                          Tracks page load performance metrics
                        </td>
                        <td className="px-4 py-2">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              3. Third-Party Cookies
            </h2>
            <p>
              Some cookies on our website are set by third-party services that
              appear on our pages. We do not control these third-party cookies
              and recommend reviewing the respective privacy policies of these
              providers:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>
                <span className="font-medium">Vercel Analytics</span> &mdash;
                Web analytics and performance monitoring
              </li>
              <li>
                <span className="font-medium">Vercel Speed Insights</span>{" "}
                &mdash; Real user performance measurement
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              4. In-Vehicle Displays
            </h2>
            <p>
              Our headrest-mounted tablet displays in vehicles operate
              independently from our website and do{" "}
              <span className="font-semibold">not</span> use cookies or
              similar tracking technologies to identify or track individual
              passengers. The in-vehicle displays do not store any data on
              passenger devices. Any data collected by our in-vehicle system is
              aggregated and anonymized, as described in our{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              5. Managing Your Cookie Preferences
            </h2>
            <p>
              You can control and manage cookies in several ways:
            </p>

            <p className="mt-4 font-medium text-slate-900">
              Browser Settings
            </p>
            <p className="mt-2">
              Most web browsers allow you to manage cookies through their
              settings. You can set your browser to refuse cookies, delete
              existing cookies, or alert you when a cookie is being set. Note
              that disabling cookies may affect the functionality of our
              website and advertiser dashboard.
            </p>

            <p className="mt-4 font-medium text-slate-900">
              How to Manage Cookies in Popular Browsers
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>
                <span className="font-medium">Chrome:</span> Settings &gt;
                Privacy and Security &gt; Cookies and other site data
              </li>
              <li>
                <span className="font-medium">Firefox:</span> Settings &gt;
                Privacy &amp; Security &gt; Cookies and Site Data
              </li>
              <li>
                <span className="font-medium">Safari:</span> Preferences &gt;
                Privacy &gt; Manage Website Data
              </li>
              <li>
                <span className="font-medium">Edge:</span> Settings &gt;
                Cookies and site permissions &gt; Manage and delete cookies
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              6. Changes to This Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in the cookies we use or for other operational, legal, or
              regulatory reasons. We encourage you to review this page
              periodically. The &quot;Last updated&quot; date at the top of
              this page indicates when this policy was last revised.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about our use of cookies or this Cookie
              Policy, please contact us:
            </p>
            <div className="mt-4 bg-slate-50 rounded-lg p-6">
              <p className="font-medium text-slate-900">TripAdverts Inc.</p>
              <p>Accra, Ghana</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:hello@tripadverts.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  hello@tripadverts.com
                </a>
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-200">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            &larr; Back to Home
          </Link>
        </footer>
      </div>
    </main>
  );
}
