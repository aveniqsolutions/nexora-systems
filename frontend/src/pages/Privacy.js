import React, { useEffect } from 'react';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="privacy-header">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6" data-testid="privacy-title">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-muted-foreground" data-testid="privacy-updated">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16" data-testid="privacy-content">
        <div className="w-full max-w-[900px] mx-auto px-6 md:px-12">
          <div className="space-y-12 text-muted leading-relaxed">
            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Introduction</h2>
              <p>
                Nexora Systems ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <p className="mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact information (name, email address, phone number)</li>
                <li>Company information (company name, role, company size)</li>
                <li>Communication preferences and history</li>
                <li>Information you provide in forms, surveys, or demo requests</li>
                <li>Technical information (IP address, browser type, device information)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you technical notices, updates, and marketing communications</li>
                <li>Process demo requests and schedule consultations</li>
                <li>Analyze usage patterns and optimize our website</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Information Sharing</h2>
              <p className="mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Professional advisors (lawyers, accountants, auditors)</li>
                <li>Law enforcement or regulatory authorities when required by law</li>
                <li>Business successors in the event of a merger or acquisition</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your information</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
                <li>Withdrawal of consent</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul className="space-y-2">
                <li>Email: privacy@nexora.systems</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Innovation Drive, San Francisco, CA 94107</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;