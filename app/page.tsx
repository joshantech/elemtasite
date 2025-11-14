'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LightRays from './components/LightRays';
import StaggeredMenu from './components/StaggeredMenu';
// import Prism from './components/Prism';
import ProjectModal, { ProjectItem } from './components/ProjectModal';
import Silk from '../components/Silk';
import SpotlightCard from '../components/SpotlightCard';
import Threads from '../components/Threads';
import Particles from '../components/Particles';
import StickyScroll from './components/ui/sticky-scroll';
import { Code2, Globe, Sparkles, Megaphone, Search, Palette, Rocket, Eye, ArrowRight } from 'lucide-react';
// LiquidChrome component is available at './components/LiquidChrome' for future use

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
 
// Work items for the homepage
/* const workItems = [
  {
    id: 1,
    title: 'Car Dealership Software & Website',
    description: 'A comprehensive dealership management system with customer-facing website that centralizes vehicle inventory, customer records, sales, appointments, and marketing.',
    category: 'Web Development',
    image: '/images/CarSite.png',
    images: [
      '/images/CarSite.png',
      '/images/CarSoftware.jpg'
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Vercel'],
    fullDescription: 'A comprehensive car dealership solution consisting of two integrated components: A web-based dealership management system that centralizes vehicle inventory, customer records, sales, appointments, and marketing. It manages vehicle inventory with detailed specifications, status tracking, and image uploads; a customer database with purchase history and interest tracking; sales management with automated status updates; appointment scheduling with workflow management; and a marketing module for lead tracking with scoring and follow-up reminders. An analytics dashboard provides real-time KPIs, sales trends, and performance metrics. The customer-facing website displays vehicle inventory with search/filtering, schedules appointments, and includes pages for About, Services, and Financing. It connects to the same database to show vehicles with images and enables customers to schedule appointments and explore financing options.',
    link: '/about'
  },
  {
    id: 2,
    title: 'Elemta Internal Software',
    description: 'An internal management system for Elemta that handles sales pipelines, client management, project tracking, team coordination, and goal tracking.',
    category: 'Software Development',
    image: '/images/evolvess.jpg',
    images: [
      '/images/evolvess.jpg',
      '/images/marekltingss.jpg'
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS', 'React Context API', 'Vercel'],
    fullDescription: 'This is an internal management system for Elemta that handles sales pipelines, client management, project tracking, team coordination, and goal tracking. It includes role-based access control, a responsive UI with dark mode, and provides a centralized platform for managing all aspects of the business operations.',
    link: '/about'
  },
  {
    id: 3,
    title: 'Lead Generation Automation',
    description: 'Built a comprehensive lead generation automation that scrapes data of businesses in specified regions and outputs them to our google spreadsheet.',
    category: 'Automation',
    image: '/images/n8nss.png',
    images: [
      '/images/n8nss.png'
    ],
    technologies: ['n8n', 'Google Sheets API', 'Google Places API', 'Web Scraping'],
    fullDescription: 'Built a comprehensive lead generation automation that scrapes data of businesses in specified regions and outputs them to our google spreadsheet. The automation runs every 30 minutes during business hours, searches for businesses, processes and formats the results, filters out duplicates, and appends new leads to a Google Spreadsheet for organized storage and analysis.',
    link: '/about'
  }
 
]; */

export default function Home() {
  const firstPageRef = useRef<HTMLElement>(null);
  const secondPageRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scroll effect removed - sections now scroll normally

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>, project: ProjectItem) => {
    e.preventDefault();
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 200);
  };

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Staggered Menu Navigation - Fixed */}
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

      {/* First Section - Hero with Light Rays */}
      <section ref={firstPageRef as any} id="section1" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0" style={{ width: '100%', height: '100%', position: 'relative' }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#E8E8E8"
            raysSpeed={1.5}
            lightSpread={0.5}
            rayLength={1.8}
            followMouse={true}
            mouseInfluence={0.15}
            noiseAmount={0.05}
            distortion={0.08}
            saturation={1.2}
            className="custom-rays"
          />
          
          {/* Content overlaid on the light rays */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
            <main className="mx-auto max-w-4xl text-center">
              <h1 className="mb-4 sm:mb-6 md:mb-8 font-bold tracking-wide text-white" style={{ fontSize: 'clamp(3rem, 12vw, 12rem)', fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif", letterSpacing: '0.1em' }}>
                elemta
          </h1>
              <p className="mb-4 sm:mb-6 md:mb-8 text-lg sm:text-xl text-gray-300 md:text-2xl px-4">
                smart digital solutions
              </p>
            </main>
          </div>

          {/* Gradient fade at bottom for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-transparent via-black/50 to-black z-10 pointer-events-none"></div>
        </div>
      </section>

      {/* Sticky Scroll Gallery - Second Section */}
      <StickyScroll />

      {/* Second Section */}
      <section ref={secondPageRef as any} id="section2" className="relative min-h-[150vh] bg-black flex flex-col items-center justify-start overflow-hidden pt-40 sm:pt-48 md:pt-12 pb-12 sm:pb-16 md:pb-20">
        {/* Gradient fade at top for smooth transition */}
        <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
        
        {/* Prism Background Effect - Commented out for potential future use */}
        {/* <div className="absolute inset-0 z-0 w-full" style={{ minHeight: '150vh', height: '100%' }}>
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0.5}
            glow={1}
            saturation={0.25}
          />
        </div> */}
        
        {/* Content Container */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* White Light Effect */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[500px] h-[150px] bg-white opacity-10 blur-3xl rounded-full z-0 top-[60px] md:w-[1000px] md:h-[250px] md:opacity-10 md:top-[50px]"></div>
          
          {/* Heading Text */}
          <div className="relative text-center mb-16 sm:mb-20 md:mb-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              Leverage the power of modern technology.
            </h2>
          </div>
          
          {/* Mobile: Service Cards and Content - No Black Container */}
          <div className="w-full md:hidden relative overflow-visible mt-8 sm:mt-12 px-4">
            {/* Service Cards Grid */}
            <div className="grid grid-cols-2 gap-3 max-w-full">
              <div className="aspect-square min-w-0">
                <SpotlightCard className="custom-spotlight-card h-full flex flex-col mobile-card" spotlightColor="rgba(255, 255, 255, 0.2)">
                  <div className="flex flex-col items-center mb-auto">
                    <Code2 className="w-6 h-6 text-white mb-3" />
                    <h3 className="text-lg font-bold text-white text-center" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                      Software
                    </h3>
                  </div>
                  <p className="text-gray-300 text-xs mt-3 leading-relaxed" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Custom software solutions tailored to your business needs.
                  </p>
                </SpotlightCard>
              </div>
              <div className="aspect-square min-w-0">
                <SpotlightCard className="custom-spotlight-card h-full flex flex-col mobile-card" spotlightColor="rgba(255, 255, 255, 0.2)">
                  <div className="flex flex-col items-center mb-auto">
                    <Globe className="w-6 h-6 text-white mb-3" />
                    <h3 className="text-lg font-bold text-white text-center" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                      Websites
                    </h3>
                  </div>
                  <p className="text-gray-300 text-xs mt-3 leading-relaxed" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Responsive and modern websites that engage your audience. Designed to convert visitors.
                  </p>
                </SpotlightCard>
              </div>
              <div className="aspect-square min-w-0">
                <SpotlightCard className="custom-spotlight-card h-full flex flex-col mobile-card" spotlightColor="rgba(255, 255, 255, 0.2)">
                  <div className="flex flex-col items-center mb-auto">
                    <Sparkles className="w-6 h-6 text-white mb-3" />
                    <h3 className="text-lg font-bold text-white text-center" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                      AI Automation
                    </h3>
                  </div>
                  <p className="text-gray-300 text-xs mt-3 leading-relaxed" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Intelligent automation solutions powered by AI. Streamline workflows and reduce manual tasks.
                  </p>
                </SpotlightCard>
              </div>
              <div className="aspect-square min-w-0">
                <SpotlightCard className="custom-spotlight-card h-full flex flex-col mobile-card" spotlightColor="rgba(255, 255, 255, 0.2)">
                  <div className="flex flex-col items-center mb-auto">
                    <Megaphone className="w-6 h-6 text-white mb-3" />
                    <h3 className="text-lg font-bold text-white text-center" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                      Marketing & Branding
                    </h3>
                  </div>
                  <p className="text-gray-300 text-xs mt-3 leading-relaxed" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Comprehensive marketing strategies. Elevate your presence effectively.
                  </p>
                </SpotlightCard>
              </div>
            </div>
            
            {/* Animated Threads */}
            <div style={{ width: '100%', height: '600px', position: 'relative', marginTop: '-90px' }}>
              <Threads
                amplitude={1}
                distance={0}
                enableMouseInteraction={true}
              />
            </div>
            
            {/* Workflow Section */}
            <div className="w-full px-6 sm:px-8 pb-8 sm:pb-12">
              <h3 className="text-4xl sm:text-3xl font-bold text-white text-center mb-10 sm:mb-12" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                How We Work
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center mb-5">
                    <Search className="w-10 h-10 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="text-white text-base font-semibold mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>01</div>
                  <h4 className="text-xl sm:text-xl font-bold text-white mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Discovery
                  </h4>
                  <p className="text-gray-300 text-base sm:text-base" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Initial contact. We discuss and understand your goals and requirements.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center mb-5">
                    <Palette className="w-10 h-10 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="text-white text-base font-semibold mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>02</div>
                  <h4 className="text-xl sm:text-xl font-bold text-white mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Design
                  </h4>
                  <p className="text-gray-300 text-base sm:text-base" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Laying the groundwork. Sketching and then proposing the best possible solution for your needs.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center mb-5">
                    <Code2 className="w-10 h-10 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="text-white text-base font-semibold mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>03</div>
                  <h4 className="text-xl sm:text-xl font-bold text-white mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Development
                  </h4>
                  <p className="text-gray-300 text-base sm:text-base" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Building the solution. Implementing the design and developing your solution in the most efficient and scalable way.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center mb-5">
                    <Rocket className="w-10 h-10 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="text-white text-base font-semibold mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>04</div>
                  <h4 className="text-xl sm:text-xl font-bold text-white mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Launch
                  </h4>
                  <p className="text-gray-300 text-base sm:text-base" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Deploying and supporting your solution!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop: Backdrop Container with Dark Silver Background */}
          <div className="hidden md:block w-full px-4 sm:px-6 md:px-8 relative overflow-visible mt-40 md:mt-48 lg:mt-56" style={{ maxWidth: '1500px' }}>
            <div className="rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-visible" style={{ 
              minHeight: '2100px',
              background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 50%, #4a5568 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              {/* Silk Animation Overlay */}
              <div className="absolute inset-0 rounded-xl overflow-hidden" style={{ zIndex: 1, mixBlendMode: 'overlay' }}>
                <Silk
                  speed={5}
                  scale={1}
                  color="#333333"
                  noiseIntensity={1.5}
                  rotation={0}
                />
              </div>
              
              {/* Black Box Container - Nested inside backdrop, extends past top */}
              <div className="w-full max-w-5xl rounded-[3rem] mx-auto" style={{ 
                minHeight: '2000px', 
                position: 'absolute',
                top: '-250px',
                left: '50%',
                transform: 'translateX(-50%)',
                height: '100%',
                zIndex: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.85)'
              }}>
                {/* Service Cards Grid */}
                <div className="grid grid-cols-2 gap-6 p-8 lg:p-12">
                  <div className="aspect-square">
                    <SpotlightCard className="custom-spotlight-card h-full flex flex-col" spotlightColor="rgba(255, 255, 255, 0.2)">
                      <div className="flex flex-col items-center mb-auto">
                        <Code2 className="w-10 h-10 lg:w-12 lg:h-12 text-white mb-5" />
                        <h3 className="text-2xl lg:text-3xl font-bold text-white text-center" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                          Software
                        </h3>
                      </div>
                      <p className="text-gray-300 text-base lg:text-lg mt-4" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        Custom software solutions tailored to your business needs. We build scalable applications that grow with your company.
                      </p>
                    </SpotlightCard>
                  </div>
                  <div className="aspect-square">
                    <SpotlightCard className="custom-spotlight-card h-full flex flex-col" spotlightColor="rgba(255, 255, 255, 0.2)">
                      <div className="flex flex-col items-center mb-auto">
                        <Globe className="w-10 h-10 lg:w-12 lg:h-12 text-white mb-5" />
                        <h3 className="text-2xl lg:text-3xl font-bold text-white text-center" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                          Websites
                        </h3>
                      </div>
                      <p className="text-gray-300 text-base lg:text-lg mt-4" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        Responsive and modern websites that engage your audience. Designed to convert visitors into customers with seamless user experiences.
                      </p>
                    </SpotlightCard>
                  </div>
                  <div className="aspect-square">
                    <SpotlightCard className="custom-spotlight-card h-full flex flex-col" spotlightColor="rgba(255, 255, 255, 0.2)">
                      <div className="flex flex-col items-center mb-auto">
                        <Sparkles className="w-10 h-10 lg:w-12 lg:h-12 text-white mb-5" />
                        <h3 className="text-2xl lg:text-3xl font-bold text-white text-center" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                          AI Automation
                        </h3>
                      </div>
                      <p className="text-gray-300 text-base lg:text-lg mt-4" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        Intelligent automation solutions powered by AI. Streamline workflows and reduce manual tasks with smart technology.
                      </p>
                    </SpotlightCard>
                  </div>
                  <div className="aspect-square">
                    <SpotlightCard className="custom-spotlight-card h-full flex flex-col" spotlightColor="rgba(255, 255, 255, 0.2)">
                      <div className="flex flex-col items-center mb-auto">
                        <Megaphone className="w-10 h-10 lg:w-12 lg:h-12 text-white mb-5" />
                        <h3 className="text-2xl lg:text-3xl font-bold text-white text-center" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                          Marketing & Branding
                        </h3>
                      </div>
                      <p className="text-gray-300 text-base lg:text-lg mt-4" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        Comprehensive marketing strategies and brand identity. Elevate your presence and connect with your target market effectively.
                      </p>
                    </SpotlightCard>
                  </div>
                </div>
              
                {/* Animated Threads */}
                <div style={{ width: '100%', height: '600px', position: 'relative', marginTop: '-90px' }}>
                  <Threads
                    amplitude={1}
                    distance={0}
                    enableMouseInteraction={true}
                  />
                </div>
              
                {/* Workflow Section */}
                <div className="w-full px-8 lg:px-12 pb-12 lg:pb-16">
                  <h3 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12 lg:mb-16" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    How We Work
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 flex items-center justify-center mb-5">
                        <Search className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                      </div>
                      <div className="text-white text-base font-semibold mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>01</div>
                      <h4 className="text-xl lg:text-2xl font-bold text-white mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        Discovery
                      </h4>
                      <p className="text-gray-300 text-base lg:text-lg" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        Initial contact. We discuss and understand your goals and requirements. 
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 flex items-center justify-center mb-5">
                        <Palette className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                      </div>
                      <div className="text-white text-base font-semibold mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>02</div>
                      <h4 className="text-xl lg:text-2xl font-bold text-white mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        Design
                      </h4>
                      <p className="text-gray-300 text-base lg:text-lg" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                      Laying the groundwork. Sketching and then proposing the best possible solution for your needs.
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 flex items-center justify-center mb-5">
                        <Code2 className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                      </div>
                      <div className="text-white text-base font-semibold mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>03</div>
                      <h4 className="text-xl lg:text-2xl font-bold text-white mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        Development
                      </h4>
                      <p className="text-gray-300 text-base lg:text-lg" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        Building the solution. Implementing the design and developing your solution in the most efficient and scalable way.
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 flex items-center justify-center mb-5">
                        <Rocket className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                      </div>
                      <div className="text-white text-base font-semibold mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>04</div>
                      <h4 className="text-xl lg:text-2xl font-bold text-white mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        Launch
                      </h4>
                      <p className="text-gray-300 text-base lg:text-lg" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        Deploying and supporting your solution!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ELEMTA Footer - Bottom of Homepage */}
      <footer className='group bg-black relative overflow-visible pb-20 sm:pb-24 md:pb-0 min-h-[200px] sm:min-h-[250px] md:min-h-0'>
        <h1 className='text-[16vw] translate-y-12 sm:translate-y-16 md:translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear relative z-10 pb-12 sm:pb-16 md:pb-0'>
          elemta
        </h1>
        <div className='bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
      </footer>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
