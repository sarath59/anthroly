import React from 'react';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Anthroly',
  description: 'Learn how Anthroly collects, uses, and protects your personal information. Our privacy policy explains our data practices and your rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#222_1px,_transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-gray-400 font-light">Last updated: October 16, 2024</p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-10">
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                At Anthroly, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website or use our services. 
                Please read this privacy policy carefully.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Information We Collect */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">Information We Collect</h2>
              
              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">Personal Information</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-400 marker:text-cyan-400">
                <li>Register for an account</li>
                <li>Subscribe to our services</li>
                <li>Contact us via email or contact forms</li>
                <li>Sign up for our newsletter</li>
                <li>Make a payment for our services</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mb-4">
                This information may include:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-400 marker:text-cyan-400">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Company name and website URL</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">Automatically Collected Information</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-400 marker:text-cyan-400">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring URLs</li>
                <li>Pages viewed and time spent on pages</li>
                <li>Links clicked</li>
              </ul>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* How We Use Your Information */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-400 marker:text-cyan-400">
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

            <Separator className="my-8 bg-white/10" />

            {/* Information Sharing */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">Information Sharing and Disclosure</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">Service Providers</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may share your information with third-party service providers who perform services on our behalf, such as:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-400 marker:text-cyan-400">
                <li>Payment processors (e.g., Stripe)</li>
                <li>Email service providers</li>
                <li>Hosting providers</li>
                <li>Analytics services</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">Legal Requirements</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may disclose your information if required to do so by law or in response to valid requests by public authorities.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">Business Transfers</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Data Security */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">Data Security</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information. 
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Cookies */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">Cookies and Tracking Technologies</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Your Rights */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-400 marker:text-cyan-400">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to object to or restrict processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mb-4">
                To exercise these rights, please contact us at hello@anthroly.com.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Children's Privacy */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">Children&apos;s Privacy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
                information from children under 18.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Changes to Policy */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">Changes to This Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Contact */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                <p className="text-gray-300 mb-2"><strong>Email:</strong> <span className="text-cyan-400">hello@anthroly.com</span></p>
                <p className="text-gray-300"><strong>Website:</strong> <span className="text-cyan-400">www.anthroly.com</span></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
