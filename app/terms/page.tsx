import React from 'react';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Anthroly',
  description: 'Read Anthroly\'s terms of service to understand the rules and regulations for using our human-written content creation services.',
};

export default function TermsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-gray-400 font-light">Last updated: October 16, 2024</p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-10">
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                Welcome to Anthroly. These Terms of Service (&quot;Terms&quot;) govern your use of our website and services. 
                By accessing or using our services, you agree to be bound by these Terms. If you do not agree to 
                these Terms, please do not use our services.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Services Description */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">1. Services Description</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Anthroly provides human-written content creation services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-400 marker:text-cyan-400">
                <li>Blog posts and articles</li>
                <li>SEO content and keyword research</li>
                <li>Social media content (LinkedIn articles, X threads, Reddit posts)</li>
                <li>AI visibility optimization</li>
                <li>Backlink support services</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                The specific services provided to you will be detailed in your service agreement or subscription plan.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Account Registration */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">2. Account Registration and Security</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                To use our services, you may need to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-400 marker:text-cyan-400">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Payment Terms */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">3. Payment Terms</h2>
              
              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">3.1 Subscription Plans</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our services are offered on a subscription basis. By subscribing, you authorize us to charge your 
                payment method on a recurring basis according to your selected plan.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">3.2 Payment Processing</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                All payments are processed through secure third-party payment processors. You agree to provide valid 
                payment information and authorize us to charge the applicable fees.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">3.3 Satisfaction Policy</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We offer a satisfaction promise. If we miss any core commitment during your first 30 days, we will provide
                one free month of service. Reach out to our support team if you believe a commitment was missed.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">3.4 Cancellation</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                You may cancel your subscription at any time. Cancellations will take effect at the end of your current 
                billing period.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Content Ownership */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">4. Content Ownership and Usage Rights</h2>
              
              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">4.1 Your Content</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Upon full payment, you own all rights to the content we create for you. We grant you a perpetual, 
                worldwide, non-exclusive license to use, modify, and distribute the content.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">4.2 Portfolio Rights</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We reserve the right to use completed work as part of our portfolio, case studies, and marketing 
                materials unless otherwise agreed upon in writing.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">4.3 Your Materials</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                You retain ownership of any materials you provide to us. By providing materials, you grant us a 
                license to use them solely for the purpose of delivering our services to you.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Service Delivery */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">5. Service Delivery and Revisions</h2>
              
              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">5.1 Delivery Timeline</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We will deliver content according to the schedule outlined in your service agreement. Timelines may 
                vary based on project complexity and client responsiveness.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">5.2 Revisions</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We offer reasonable revisions to ensure your satisfaction. The number of revisions included depends 
                on your subscription plan. Additional revisions may be subject to extra fees.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">5.3 Client Responsibilities</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Timely delivery depends on your cooperation, including providing necessary information, feedback, 
                and approvals in a timely manner.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Acceptable Use */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">6. Acceptable Use Policy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You agree not to use our services to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-400 marker:text-cyan-400">
                <li>Violate any laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Create content that is defamatory, obscene, or offensive</li>
                <li>Promote illegal activities or products</li>
                <li>Engage in any fraudulent or deceptive practices</li>
                <li>Distribute spam or malware</li>
              </ul>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Confidentiality */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">7. Confidentiality</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We will maintain the confidentiality of any proprietary or sensitive information you share with us. 
                We will not disclose such information to third parties without your consent, except as required by law 
                or necessary to provide our services.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Warranties and Disclaimers */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">8. Warranties and Disclaimers</h2>
              
              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">8.1 Our Warranties</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We warrant that our services will be performed in a professional and workmanlike manner, consistent 
                with industry standards.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-white">8.2 Disclaimer</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                EXCEPT AS EXPRESSLY PROVIDED, OUR SERVICES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, 
                EITHER EXPRESS OR IMPLIED. WE DO NOT GUARANTEE SPECIFIC RESULTS, RANKINGS, OR TRAFFIC INCREASES.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Limitation of Liability */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">9. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ANTHROLY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED 
                DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our total liability shall not exceed the amount you paid us in the twelve months preceding the claim.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Termination */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">10. Termination</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Either party may terminate the service agreement with written notice. Upon termination:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-400 marker:text-cyan-400">
                <li>You remain responsible for all fees incurred before termination</li>
                <li>We will deliver any completed work</li>
                <li>Work in progress may be billed pro-rata or returned to you in its current state</li>
                <li>We reserve the right to terminate services immediately for breach of these Terms</li>
              </ul>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Changes to Terms */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">11. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes 
                via email or through our website. Your continued use of our services after such changes constitutes 
                acceptance of the new Terms.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Governing Law */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">12. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in 
                which Anthroly operates, without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Any disputes arising from these Terms or our services shall be resolved through binding arbitration, 
                except that either party may seek injunctive relief in court.
              </p>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Contact */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white">13. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                <p className="text-gray-300 mb-2"><strong>Email:</strong> <span className="text-cyan-400">sharatth@anthroly.com</span></p>
                <p className="text-gray-300"><strong>Website:</strong> <span className="text-cyan-400">www.anthroly.com</span></p>
              </div>
            </section>

            <Separator className="my-8 bg-white/10" />

            {/* Acceptance */}
            <section className="mb-10">
              <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/20 text-white p-6 rounded-xl backdrop-blur-sm">
                <p className="text-lg font-semibold mb-2 text-cyan-400">Acceptance of Terms</p>
                <p className="text-gray-300 font-light">
                  By using Anthroly&apos;s services, you acknowledge that you have read, understood, and agree to be 
                  bound by these Terms of Service.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
