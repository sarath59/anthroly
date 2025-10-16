import React from 'react';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Anthroly',
  description: 'Learn how Anthroly collects, uses, and protects your personal information. Our privacy policy explains our data practices and your rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: October 16, 2024</p>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                At Anthroly, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website or use our services. 
                Please read this privacy policy carefully.
              </p>
            </section>

            <Separator className="my-8" />

            {/* Information We Collect */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6">Information We Collect</h2>
              
              <h3 className="text-2xl font-semibold mb-4 mt-6">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Register for an account</li>
                <li>Subscribe to our services</li>
                <li>Contact us via email or contact forms</li>
                <li>Sign up for our newsletter</li>
                <li>Make a payment for our services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                This information may include:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Company name and website URL</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring URLs</li>
                <li>Pages viewed and time spent on pages</li>
                <li>Links clicked</li>
              </ul>
            </section>

            <Separator className="my-8" />

            {/* How We Use Your Information */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Provide, operate, and maintain our services</li>
                <li>Process your transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues and fraudulent activity</li>
                <li>Improve our website, products, and services</li>
                <li>Personalize your experience</li>
              </ul>
            </section>

            <Separator className="my-8" />

            {/* Information Sharing */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 mt-6">Service Providers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information with third-party service providers who perform services on our behalf, such as:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Payment processors (e.g., Stripe)</li>
                <li>Email service providers</li>
                <li>Hosting providers</li>
                <li>Analytics services</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may disclose your information if required to do so by law or in response to valid requests by public authorities.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Business Transfers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </p>
            </section>

            <Separator className="my-8" />

            {/* Data Security */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6">Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information. 
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </section>

            <Separator className="my-8" />

            {/* Cookies */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <Separator className="my-8" />

            {/* Your Rights */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to object to or restrict processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                To exercise these rights, please contact us at hello@anthroly.com.
              </p>
            </section>

            <Separator className="my-8" />

            {/* Children's Privacy */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
                information from children under 18.
              </p>
            </section>

            <Separator className="my-8" />

            {/* Changes to Policy */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <Separator className="my-8" />

            {/* Contact */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> hello@anthroly.com</p>
                <p className="text-gray-700"><strong>Website:</strong> www.anthroly.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

