"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Growth',
    price: 350,
    description: 'Perfect for businesses starting their content journey',
    features: [
      '30 human-written blog posts per month',
      'In-depth keyword research & competitor analysis',
      'AI prompt research & optimization',
      'SEO optimization for all content',
      'Parasite SEO content analysis',
      'Monthly performance reports',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: 499,
    description: 'Complete content domination for serious brands',
    features: [
      'Everything in Growth plan',
      '30 blog posts + multi-platform content',
      'Aggressive parasite SEO strategy',
      '10 high-authority platform posts (Medium, LinkedIn, Quora)',
      '10 X (Twitter) threads per month',
      '10 Reddit posts per month',
      'Premium backlink acquisition',
      'AI visibility optimization',
      'Dedicated account manager',
      'Priority support & strategy calls',
    ],
    popular: true,
  },
];

export const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-40 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-delayed"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that matches your content goals. No hidden fees, no surprises.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative transform transition-all duration-1000 ease-out ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Most Popular Badge - Outside card */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                      <Star size={16} fill="white" />
                      Most Popular
                    </div>
                  </div>
                )}

                <Card
                  className={`h-full relative card-3d overflow-hidden group ${
                    plan.popular
                      ? 'border-4 border-black shadow-3xl md:scale-105'
                      : 'border-2'
                  }`}
                >
                  {/* Decorative background elements */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gray-50 rounded-full -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-50 rounded-full -ml-16 -mb-16"></div>
                  </div>

                  <CardHeader className="text-center pb-8 pt-8 relative z-10">
                    <CardTitle className="text-2xl mb-2 group-hover:scale-105 transition-transform duration-300">{plan.name}</CardTitle>
                    <CardDescription className="text-base mb-4">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-black rounded-full flex items-center justify-center mt-0.5">
                            <Check className="text-white" size={14} />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-6 relative z-10">
                    {/* TODO: Replace mailto with your Stripe payment links */}
                    <a 
                      href={`mailto:hello@anthroly.com?subject=Subscribe to Anthroly - ${plan.name} Plan`}
                      className="w-full"
                    >
                      <Button
                        size="lg"
                        className={`w-full ${
                          plan.popular
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
                        }`}
                      >
                        Get Started with {plan.name}
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              Need a custom plan? Have specific requirements?
            </p>
            <a href="mailto:hello@anthroly.com">
              <Button variant="outline" size="lg">
                Contact Us for Custom Solutions
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 pt-12 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-gray-600 text-sm">Money-Back Guarantee</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-gray-600 text-sm">Priority Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">0</div>
                <div className="text-gray-600 text-sm">Setup Fees</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">∞</div>
                <div className="text-gray-600 text-sm">Cancel Anytime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

