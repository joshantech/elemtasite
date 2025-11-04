'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LightRays from './components/LightRays';
import StaggeredMenu from './components/StaggeredMenu';
import Prism from './components/Prism';
import ProjectModal from './components/ProjectModal';
// LiquidChrome component is available at './components/LiquidChrome' for future use

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

// Work items for the homepage
const workItems = [
  {
    id: 1,
    title: 'Car Dealership Software & Website',
    description: 'A comprehensive dealership management system with customer-facing website that centralizes vehicle inventory, customer records, sales, appointments, and marketing.',
    category: 'Web Development',
    image: '/images/CarSoftware.jpg',
    images: [
      '/images/CarSoftware.jpg',
      '/images/CarSite.jpg'
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Vercel'],
    fullDescription: 'A comprehensive car dealership solution consisting of two integrated components: A web-based dealership management system that centralizes vehicle inventory, customer records, sales, appointments, and marketing. It manages vehicle inventory with detailed specifications, status tracking, and image uploads; a customer database with purchase history and interest tracking; sales management with automated status updates; appointment scheduling with workflow management; and a marketing module for lead tracking with scoring and follow-up reminders. An analytics dashboard provides real-time KPIs, sales trends, and performance metrics. The customer-facing website displays vehicle inventory with search/filtering, schedules appointments, and includes pages for About, Services, and Financing. It connects to the same database to show vehicles with images and enables customers to schedule appointments and explore financing options.',
    liveUrl: 'https://cardealershipwebsite.webone.dev',
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
    image: '/images/n8nss.jpg',
    images: [
      '/images/n8nss.jpg',
      '/images/sheetsss.jpg'
    ],
    technologies: ['n8n', 'Google Sheets API', 'Google Places API', 'Web Scraping'],
    fullDescription: 'Built a comprehensive lead generation automation that scrapes data of businesses in specified regions and outputs them to our google spreadsheet. The automation runs every 30 minutes during business hours, searches for businesses, processes and formats the results, filters out duplicates, and appends new leads to a Google Spreadsheet for organized storage and analysis.',
    link: '/about'
  }
  // WebOne's Main Website - kept for future use on a different page
  // {
  //   id: 2,
  //   title: "WebOne's Main Website",
  //   description: 'Developed WebOne\'s main website',
  //   category: 'Web Development',
  //   image: '/images/mainsitepic.jpg',
  //   images: [
  //     '/images/mainsitepic.jpg',
  //     '/images/servicespage.jpg'
  //   ],
  //   technologies: ['React', 'Vite', 'TailwindCSS', 'Framer Motion'],
  //   fullDescription: 'Developed WebOne\'s main website featuring a modern, dark-themed design with smooth animations and interactive elements. The website showcases services including websites, software, AI solutions, and marketing services, with a clean and professional user interface.',
  //   liveUrl: 'https://www.webone.dev',
  //   link: '/about'
  // }
];

export default function Home() {
  const firstPageRef = useRef<HTMLElement>(null);
  const secondPageRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof workItems[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!firstPageRef.current || !secondPageRef.current) return;

    // Get viewport height
    const vh = window.innerHeight;

    // Set initial state
    gsap.set(secondPageRef.current, { y: vh });

    // Create a timeline for the slide-up animation
    // Reduce scroll distance to make it feel more responsive
    const scrollDistance = vh * 0.6; // Only need to scroll 60% of viewport height
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: true, // Smooth scroll-linked animation
      },
    });

    // Animate second page sliding up
    tl.to(secondPageRef.current, {
      y: 0,
      duration: 1,
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>, project: typeof workItems[0]) => {
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
    <div ref={containerRef} className="relative overflow-x-hidden bg-black">
      {/* Spacer to enable scrolling */}
      <div className="h-[100vh]"></div>
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

      {/* First Section - Hero with Light Rays - Fixed */}
      <section ref={firstPageRef as any} id="section1" className="fixed top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden pointer-events-none bg-black">
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
              <h1 className="mb-4 sm:mb-6 md:mb-8 font-bold tracking-tight text-white" style={{ fontSize: 'clamp(3rem, 12vw, 12rem)', fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                elemta
              </h1>
              <p className="mb-4 sm:mb-6 md:mb-8 text-lg sm:text-xl text-gray-300 md:text-2xl px-4">
                smart digital solutions
              </p>
            </main>
          </div>

          {/* Up Arrow - Encourages scrolling */}
          <button
            onClick={() => {
              window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'smooth' });
            }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce pointer-events-auto"
            aria-label="Scroll to next section"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </section>

      {/* Second Section - Slides up from bottom */}
      <section ref={secondPageRef as any} id="section2" className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
        {/* Prism Background Effect */}
        <div className="absolute inset-0 z-0">
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
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 sm:mb-8" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            Welcome to elemta
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 px-4">
            Building the future with innovative digital solutions
          </p>
        </div>
        
        {/* Up Arrow - Points up to show next section scrolls up */}
        <button
          onClick={() => {
            const section3 = document.getElementById('section3');
            if (section3) {
              section3.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce pointer-events-auto z-20"
          aria-label="Scroll to work section"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </section>

      {/* Third Section - View Work */}
      <section id="section3" className="relative min-h-screen bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-24 px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              View our work
            </h2>
            <p className="text-white text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              A quick look at some of our latest projects.
            </p>
          </div>

          {/* Work Grid - Show all items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 max-w-5xl mx-auto">
            {workItems.map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => handleProjectClick(e, item)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs sm:text-sm font-medium text-white bg-gray-900/80 backdrop-blur-sm rounded-full" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-4 line-clamp-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    {item.description}
                  </p>

                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 to-gray-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    View Project →
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12 sm:mt-16 md:mt-20">
            <a
              href="/about"
              className="inline-block px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded-lg transition-all transform hover:scale-105"
              style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
            >
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
