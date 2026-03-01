import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service governing the use of TripAdverts, a digital out-of-home advertising platform operating in Accra, Ghana.",
};

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="mt-2 text-slate-500">Last updated: March 1, 2026</p>
        </header>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to
              and use of the services provided by TripAdverts Inc.
              (&quot;TripAdverts,&quot; &quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;), including our website at{" "}
              <span className="font-medium">www.tripadverts.com</span>, our
              advertiser dashboard, and our in-vehicle digital advertising
              network operating across Accra, Ghana.
            </p>
            <p className="mt-4">
              By creating an account, placing an advertising campaign, or
              otherwise using our services, you agree to be bound by these
              Terms. If you are entering into these Terms on behalf of a
              company or other legal entity, you represent that you have the
              authority to bind that entity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              2. Description of Services
            </h2>
            <p>
              TripAdverts provides a digital out-of-home (DOOH) advertising
              platform that enables advertisers to display promotional content
              on headrest-mounted tablet screens installed in taxis and
              ride-share vehicles across Accra, Ghana. Our services include:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>
                Campaign creation, scheduling, and management through our
                advertiser dashboard
              </li>
              <li>
                Ad delivery to our network of in-vehicle tablet displays
              </li>
              <li>
                Performance reporting including impression counts, display
                duration, and route-based analytics
              </li>
              <li>
                Audience targeting based on geographic zones, time of day, and
                vehicle routes
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              3. Account Registration
            </h2>
            <p>
              To access certain features, you must create an account. You agree
              to provide accurate, current, and complete information during
              registration and to keep your account information updated. You
              are responsible for safeguarding your account credentials and for
              all activities that occur under your account.
            </p>
            <p className="mt-4">
              You must notify us immediately at{" "}
              <a
                href="mailto:hello@tripadverts.com"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                hello@tripadverts.com
              </a>{" "}
              if you suspect unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              4. Advertising Content Standards
            </h2>
            <p>
              All advertising content submitted to our platform must comply
              with the following requirements:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>
                Comply with all applicable laws and regulations in Ghana,
                including the Food and Drugs Authority advertising guidelines
                and the National Media Commission standards
              </li>
              <li>
                Be truthful, not misleading, and substantiate any claims made
              </li>
              <li>
                Not contain obscene, defamatory, discriminatory, or offensive
                material
              </li>
              <li>
                Not promote illegal products, services, or activities
              </li>
              <li>
                Not infringe upon any third-party intellectual property rights,
                including trademarks, copyrights, or publicity rights
              </li>
              <li>
                Be suitable for a general audience, including minors who may
                be passengers in vehicles
              </li>
              <li>
                Meet our technical specifications for resolution, file format,
                and file size as detailed in our advertiser documentation
              </li>
            </ul>
            <p className="mt-4">
              We reserve the right to reject, remove, or request modifications
              to any advertising content at our sole discretion, without
              liability. We may review content before or after it goes live on
              our network.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              5. Campaign Booking and Payment
            </h2>
            <p>
              Campaign pricing is based on factors including duration,
              frequency, geographic targeting, and time-of-day scheduling. All
              prices are quoted in Ghanaian Cedis (GHS) unless otherwise
              specified.
            </p>
            <p className="mt-4">
              Payment is required before campaign activation unless a credit
              arrangement has been agreed upon in writing. We accept payment
              through the methods specified on our platform, including mobile
              money and bank transfer.
            </p>
            <p className="mt-4">
              Cancellations made more than 48 hours before the scheduled
              campaign start date are eligible for a full refund. Cancellations
              within 48 hours of the start date may be subject to a
              cancellation fee of up to 25% of the campaign value. No refunds
              are available once a campaign has begun delivering impressions,
              except at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              6. Impressions and Performance
            </h2>
            <p>
              We make commercially reasonable efforts to deliver the number of
              impressions booked for each campaign. However, impression
              delivery depends on vehicle availability, route patterns, device
              uptime, and other factors beyond our full control.
            </p>
            <p className="mt-4">
              If a campaign delivers fewer than 80% of its booked impressions
              during the scheduled period, we will, at our discretion, either
              extend the campaign duration at no additional cost or provide a
              pro-rata credit toward a future campaign. This is your sole
              remedy for under-delivery.
            </p>
            <p className="mt-4">
              Performance metrics provided through our dashboard are estimates
              and should not be relied upon as exact counts. We are not liable
              for any business decisions made based on our reporting data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              7. Intellectual Property
            </h2>
            <p>
              You retain all rights to the advertising content you submit. By
              uploading content to our platform, you grant TripAdverts a
              non-exclusive, royalty-free, worldwide license to display,
              reproduce, and distribute your content solely for the purpose of
              delivering your advertising campaigns.
            </p>
            <p className="mt-4">
              The TripAdverts name, logo, platform software, website design,
              and all related intellectual property are owned by TripAdverts
              Inc. and protected by applicable intellectual property laws. You
              may not use our trademarks without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by the laws of Ghana, TripAdverts
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including loss of profits,
              data, business opportunities, or goodwill, arising out of or
              related to your use of our services.
            </p>
            <p className="mt-4">
              Our total cumulative liability for any claims arising from or
              related to these Terms or our services shall not exceed the total
              amount you paid to TripAdverts in the twelve (12) months
              preceding the event giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              9. Indemnification
            </h2>
            <p>
              You agree to indemnify, defend, and hold harmless TripAdverts
              Inc., its officers, directors, employees, and agents from and
              against any claims, liabilities, damages, losses, and expenses
              (including reasonable legal fees) arising out of or related to:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Your advertising content</li>
              <li>Your use of our services in violation of these Terms</li>
              <li>
                Your violation of any applicable law or regulation
              </li>
              <li>
                Any claim that your content infringes a third party&apos;s
                intellectual property or other rights
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              10. Service Availability
            </h2>
            <p>
              We strive to maintain uninterrupted service but do not guarantee
              that our platform or in-vehicle displays will be available at all
              times. Service may be affected by maintenance, technical issues,
              connectivity problems, vehicle downtime, or circumstances beyond
              our control including weather, traffic incidents, or regulatory
              actions.
            </p>
            <p className="mt-4">
              We reserve the right to modify, suspend, or discontinue any
              aspect of our services at any time with reasonable notice to
              active advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              11. Termination
            </h2>
            <p>
              Either party may terminate the service relationship at any time.
              We may suspend or terminate your account immediately if you
              breach these Terms, engage in fraudulent activity, or submit
              content that violates our advertising standards.
            </p>
            <p className="mt-4">
              Upon termination, your right to use our services ceases
              immediately. Sections relating to intellectual property,
              limitation of liability, indemnification, and governing law
              survive termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              12. Governing Law and Dispute Resolution
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of the Republic of Ghana. Any disputes arising from or
              relating to these Terms shall first be attempted to be resolved
              through good-faith negotiation. If negotiation fails, disputes
              shall be submitted to arbitration in Accra, Ghana, in accordance
              with the Alternative Dispute Resolution Act, 2010 (Act 798).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              13. Modifications to Terms
            </h2>
            <p>
              We may revise these Terms at any time by posting the updated
              version on our website. Material changes will be communicated to
              registered users via email. Your continued use of our services
              after changes take effect constitutes acceptance of the revised
              Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              14. Contact Us
            </h2>
            <p>
              For questions about these Terms of Service, please contact us:
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
