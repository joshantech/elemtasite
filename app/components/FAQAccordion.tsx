'use client';

import { useState } from 'react';
import { Clock, FileText, Smile, X, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary depending on scope and complexity. A simple website typically takes 2-4 weeks, while custom software solutions can range from 5-7 weeks. The Length of AI Automation builds are heavily dependent on the complexity of the automation and the amount of data required. We provide detailed timelines during our initial consultation and keep you updated throughout the project.',
    icon: <Clock className="w-5 h-5" />
  },
  {
    question: 'Do you provide ongoing support after project completion?',
    answer: 'Yes! We offer comprehensive ongoing support packages to ensure your solution continues to perform optimally. This includes maintenance, updates, bug fixes, and technical support. We\'re committed to your long-term success.',
    icon: <FileText className="w-5 h-5" />
  },
  {
    question: 'Is there any risk?',
    answer: 'We minimize risk through transparent communication, detailed project planning, and milestone-based deliverables. We work closely with you at every stage, ensuring you\'re always informed and in control. Our goal is to make your digital transformation as smooth and risk-free as possible.',
    icon: <Smile className="w-5 h-5" />
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We understand that circumstances can change. Our cancellation policy is flexible and fair. If you need to cancel a project, we\'ll work with you to find a solution that works for both parties.',
    icon: <X className="w-5 h-5" />
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-16 md:mt-24 lg:mt-32 mb-16 md:mb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-white text-base sm:text-lg md:text-xl opacity-80" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            Get answers to common questions about our services and process
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`bg-black border border-white border-opacity-20 rounded-lg transition-all duration-300 hover:border-opacity-40 ${
                openIndex === index ? 'border-opacity-40' : ''
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <h3
                    className="text-white font-semibold text-base sm:text-lg md:text-xl pr-4"
                    style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                  >
                    {item.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-white flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 md:px-8 md:pb-6 pl-16 md:pl-20 border-t border-white border-opacity-20">
                  <p
                    className="text-white text-sm sm:text-base md:text-lg leading-relaxed opacity-90 pt-4"
                    style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

