'use client';

import { useParams } from 'next/navigation';
import StaggeredMenu from '../../components/StaggeredMenu';
import Plasma from '../../components/Plasma';
import { CheckCircle2, ArrowRight, Globe, LayoutDashboard, Plug, Server, Sparkles, Palette, Smartphone, TrendingUp, Settings, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { GlowingEffect } from '../../components/ui/glowing-effect';
import { HoverButton } from '../../components/ui/hover-button';
import { BlurIn } from '../../components/ui/blur-in';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '/projects' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Instagram', link: 'https://www.instagram.com/elemtta/' },
  { label: 'Facebook', link: 'https://www.facebook.com/Elemtta?mibextid=wwXIfr&rdid=L9V1whliPJ5fvbRl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CVYQ1XdNY%2F%3Fmibextid%3DwwXIfr#' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/company/elemta' }
];

const categoryTitles: Record<string, string> = {
  'softwares': 'Software Development',
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
    title: 'Software Development',
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
    description: 'High-performance websites built to convert, not just look good.',
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

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-800 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-gray-800 bg-black p-6 shadow-sm shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-gray-700 bg-gray-800/50 p-2 text-white">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-400" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const content = serviceContent[category] || serviceContent['website'];
  const categoryTitle = categoryTitles[category] || 'Our Services';

  // Special layout for softwares category
  if (category === 'softwares') {
    return (
      <div className="min-h-screen bg-black">
        {/* Staggered Menu Navigation */}
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={false}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#C0C0C0', '#808080']}
          logoUrl="/favicon.ico"
          accentColor="#C0C0C0"
          isFixed={false}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />

        {/* Service Information Section */}
        <section className="relative min-h-screen bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header Section */}
            <div className="text-center mb-12 sm:mb-16 md:mb-24 px-4">
              <BlurIn
                word="Software Development"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6"
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                duration={1}
                variant={{
                  hidden: { filter: "blur(10px)", opacity: 0 },
                  visible: { filter: "blur(0px)", opacity: 1 },
                }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-white text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
              >
                Custom software built for performance, scale, and real business use.
              </motion.p>
            </div>

            {/* Glowing Effect Grid */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2"
            >
              <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={<Globe className="h-4 w-4" />}
                title="Web Applications"
                description="Custom web applications built with modern technologies, responsive design, and scalable architectures to power your business online."
              />
              <GridItem
                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                icon={<LayoutDashboard className="h-4 w-4" />}
                title="Internal Tools & Dashboards"
                description="Streamline operations with custom internal tools and intuitive dashboards that centralize data and improve team productivity."
              />
              <GridItem
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                icon={<Plug className="h-4 w-4" />}
                title="APIs & Integrations"
                description="Seamless API development and third-party integrations that connect your systems and enable smooth data flow across platforms."
              />
              <GridItem
                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                icon={<Server className="h-4 w-4" />}
                title="Scalable Backend Systems"
                description="Robust backend infrastructure designed to handle growth, ensuring your systems remain fast and reliable as your business scales."
              />
              <GridItem
                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                icon={<Sparkles className="h-4 w-4" />}
                title="AI Powered Software"
                description="Intelligent software solutions enhanced with AI capabilities to automate processes, gain insights, and deliver smarter user experiences."
              />
            </motion.ul>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-center mt-16 sm:mt-20 md:mt-24"
            >
              <p className="text-white text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                Ready to get started?
              </p>
              <Link href="/contact">
                <HoverButton className="text-white">
                  Get in Touch
                </HoverButton>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // Special layout for website category
  if (category === 'website') {
    return (
      <div className="min-h-screen bg-black">
        {/* Staggered Menu Navigation */}
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={false}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#C0C0C0', '#808080']}
          logoUrl="/favicon.ico"
          accentColor="#C0C0C0"
          isFixed={false}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />

        {/* Service Information Section */}
        <section className="relative min-h-screen bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header Section */}
            <div className="text-center mb-12 sm:mb-16 md:mb-24 px-4">
              <BlurIn
                word="Website Design"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6"
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                duration={1}
                variant={{
                  hidden: { filter: "blur(10px)", opacity: 0 },
                  visible: { filter: "blur(0px)", opacity: 1 },
                }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-white text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
              >
                {content.description}
              </motion.p>
            </div>

            {/* Glowing Effect Grid */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2"
            >
              <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={<Palette className="h-4 w-4" />}
                title="UI/UX Design"
                description="User-centered design approaches that create intuitive, engaging interfaces focused on delivering exceptional user experiences."
              />
              <GridItem
                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                icon={<Smartphone className="h-4 w-4" />}
                title="Responsive Development"
                description="Mobile-first development ensuring your website looks and functions perfectly across all devices and screen sizes."
              />
              <GridItem
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                icon={<TrendingUp className="h-4 w-4" />}
                title="Performance & SEO Optimization"
                description="Fast-loading websites optimized for search engines, ensuring better visibility and improved user experience."
              />
              <GridItem
                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                icon={<Settings className="h-4 w-4" />}
                title="CMS / Custom Builds"
                description="Flexible content management systems and fully custom website builds tailored to your specific needs and requirements."
              />
              <GridItem
                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                icon={<Briefcase className="h-4 w-4" />}
                title="Conversion-focused design"
                description="Designing pages to turn visitors into leads/customers."
              />
            </motion.ul>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-center mt-16 sm:mt-20 md:mt-24"
            >
              <p className="text-white text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                Ready to get started?
              </p>
              <Link href="/contact">
                <HoverButton className="text-white">
                  Get in Touch
                </HoverButton>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // Original layout for other categories
  return (
    <div className="min-h-screen bg-black">
      {/* Staggered Menu Navigation */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={false}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['#C0C0C0', '#808080']}
        logoUrl="/favicon.ico"
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
            <Link href="/contact">
              <HoverButton className="text-white">
                Get in Touch
              </HoverButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
