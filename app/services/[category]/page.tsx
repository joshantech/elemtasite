'use client';

import { useParams } from 'next/navigation';
import StaggeredMenu from '../../components/StaggeredMenu';
import Plasma from '../../components/Plasma';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Our Work', ariaLabel: 'View our work', link: '/projects' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

const categoryTitles: Record<string, string> = {
  'softwares': 'Software Design & Development',
  'ai': 'AI Automation',
  'marketing': 'Marketing & Branding',
  'website': 'Website Design'
};

interface ServiceContent {
  title: string;
  description: string;
  whatWeProvide: string[];
  value: string[];
  benefits: string[];
}

const serviceContent: Record<string, ServiceContent> = {
  'softwares': {
    title: 'Software Design & Development',
    description: 'We build custom software solutions tailored to your business needs. From internal management systems to customer-facing applications, we create scalable, efficient, and user-friendly software that grows with your company.',
    whatWeProvide: [
      'Custom web applications',
      'Internal management systems',
      'Database design and implementation',
      'API development and integration',
      'Cloud-based solutions',
      'Mobile-responsive applications',
      'User authentication and security',
      'Real-time data processing'
    ],
    value: [
      'Streamline your business operations with automated workflows',
      'Centralize data management for better decision-making',
      'Improve team collaboration and productivity',
      'Scale your systems as your business grows',
      'Reduce manual work and human error',
      'Enhance customer experience with intuitive interfaces'
    ],
    benefits: [
      'Increased operational efficiency',
      'Better data organization and accessibility',
      'Cost savings through automation',
      'Competitive advantage with custom solutions',
      'Improved customer satisfaction',
      'Future-proof technology stack'
    ]
  },
  'ai': {
    title: 'AI Automation',
    description: 'Leverage the power of artificial intelligence to automate repetitive tasks, streamline workflows, and unlock new capabilities for your business. Our AI solutions help you work smarter, not harder.',
    whatWeProvide: [
      'Lead generation automation',
      'Data scraping and processing',
      'Workflow automation',
      'Chatbot and customer service automation',
      'Email and communication automation',
      'Data analysis and reporting',
      'Integration with existing systems',
      'Custom AI solutions'
    ],
    value: [
      'Save countless hours of manual work',
      'Process large volumes of data automatically',
      'Improve response times and customer service',
      'Reduce operational costs',
      'Eliminate repetitive tasks',
      'Gain insights from data analysis'
    ],
    benefits: [
      '24/7 automated operations',
      'Higher accuracy and consistency',
      'Faster processing times',
      'Scalable solutions that grow with you',
      'Focus on strategic work instead of routine tasks',
      'Competitive edge through efficiency'
    ]
  },
  'marketing': {
    title: 'Marketing & Branding',
    description: 'Elevate your brand presence and connect with your target audience through comprehensive marketing strategies and cohesive brand identity. We help you tell your story and reach the right people.',
    whatWeProvide: [
      'Brand identity design',
      'Social media strategy',
      'Content creation and management',
      'SEO optimization',
      'Email marketing campaigns',
      'Marketing analytics and reporting',
      'Brand guidelines and style guides',
      'Digital advertising strategies'
    ],
    value: [
      'Build a strong, recognizable brand identity',
      'Increase your online visibility and reach',
      'Engage with your target audience effectively',
      'Drive more qualified leads to your business',
      'Improve brand consistency across all channels',
      'Measure and optimize marketing performance'
    ],
    benefits: [
      'Increased brand recognition',
      'Higher customer engagement',
      'Better conversion rates',
      'Stronger market presence',
      'Data-driven marketing decisions',
      'Long-term brand value'
    ]
  },
  'website': {
    title: 'Website Design',
    description: 'Create a powerful online presence with modern, responsive websites that engage visitors and convert them into customers. We design and develop websites that not only look great but also drive results.',
    whatWeProvide: [
      'Custom website design',
      'Responsive mobile-first development',
      'E-commerce solutions',
      'Content management systems',
      'SEO optimization',
      'Performance optimization',
      'User experience (UX) design',
      'Website maintenance and updates'
    ],
    value: [
      'Make a strong first impression with professional design',
      'Reach customers on any device with responsive layouts',
      'Improve search engine visibility',
      'Convert visitors into customers with optimized user flows',
      'Showcase your products and services effectively',
      'Build trust and credibility online'
    ],
    benefits: [
      'Higher conversion rates',
      'Better search engine rankings',
      'Improved user experience',
      'Mobile-friendly for all devices',
      'Fast loading times',
      'Professional online presence'
    ]
  }
};

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const content = serviceContent[category] || serviceContent['website'];
  const categoryTitle = categoryTitles[category] || 'Our Services';

  return (
    <div className="min-h-screen bg-black">
      {/* Staggered Menu Navigation */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['#C0C0C0', '#808080']}
        logoUrl="/logo.svg"
        accentColor="#C0C0C0"
        isFixed={false}
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />

      {/* Service Information Section */}
      <section className="relative min-h-screen bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Plasma Background */}
        <div className="fixed inset-0 z-0 opacity-30">
          <Plasma 
            color="#C0C0C0"
            speed={0.6}
            direction="forward"
            scale={1.1}
            opacity={0.8}
            mouseInteractive={true}
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-24 px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              {categoryTitle}
            </h2>
            <p className="text-white text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              {content.description}
            </p>
          </div>

          {/* What We Provide Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              What We Provide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {content.whatWeProvide.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-900/50 rounded-lg p-4 sm:p-5 border border-gray-800">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-white text-base sm:text-lg" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Value Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              The Value We Deliver
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {content.value.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-900/50 rounded-lg p-4 sm:p-5 border border-gray-800">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-white text-base sm:text-lg" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              Key Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {content.benefits.map((item, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-4 sm:p-5 border border-gray-800">
                  <p className="text-white text-base sm:text-lg" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 sm:mt-20 md:mt-24">
            <p className="text-white text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              Ready to get started?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded-lg transition-all transform hover:scale-105"
              style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
