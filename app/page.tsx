'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import LightRays from './components/LightRays';
import StaggeredMenu from './components/StaggeredMenu';
// import Prism from './components/Prism';
import ProjectModal, { ProjectItem } from './components/ProjectModal';
import StickyScroll from './components/ui/sticky-scroll';
// LiquidChrome component is available at './components/LiquidChrome' for future use

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '/projects' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Instagram', link: 'https://www.instagram.com/elemtta/' },
  { label: 'Facebook', link: 'https://www.facebook.com/Elemtta?mibextid=wwXIfr&rdid=L9V1whliPJ5fvbRl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CVYQ1XdNY%2F%3Fmibextid%3DwwXIfr#' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/company/elemta' }
];
 
export default function Home() {
  const firstPageRef = useRef<HTMLElement>(null);
  const secondPageRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const stickyScrollRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scroll animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const heroContent = heroContentRef.current;
    const stickyScroll = stickyScrollRef.current;
    const textContent = textContentRef.current;
    const image = imageRef.current;
    const footer = footerRef.current;

    // Animate hero content (on initial load, not scroll)
    if (heroContent) {
      gsap.fromTo(
        heroContent,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 3.5,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }

    // Animate sticky scroll section
    if (stickyScroll) {
      gsap.fromTo(
        stickyScroll,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stickyScroll,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Animate text content
    if (textContent) {
      gsap.fromTo(
        textContent,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textContent,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Animate image
    if (image) {
      gsap.fromTo(
        image,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Animate footer
    if (footer) {
      gsap.fromTo(
        footer,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
        displayItemNumbering={false}
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
            <main ref={heroContentRef} className="mx-auto max-w-4xl text-center">
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
      <div ref={stickyScrollRef}>
        <StickyScroll />
      </div>

      {/* Second Section - Professional Technology Company */}
      <section ref={secondPageRef as any} id="section2" className="relative bg-black overflow-hidden pt-56 sm:pt-64 md:pt-12 pb-12 sm:pb-16 md:pb-20">
        {/* Gradient fade at top for smooth transition */}
        <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
        
        {/* Split Screen Container */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row min-h-[80vh]">
            {/* Left Panel - Text Content */}
            <div ref={textContentRef} className="w-full md:w-2/5 flex flex-col justify-center py-12 md:py-20 pr-0 md:pr-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight text-center md:text-left" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                We are a professional technology company
              </h2>
              <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed mb-6" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              At Elemta, we combine technical expertise with business acumen to deliver smart digital solutions that transform how you operate. Our team brings together complementary skills in software development, automation, and client relations to ensure your technology journey is smooth and successful.
              </p>
              <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed mb-6" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                Whether you need custom software, modern websites, AI automation, or comprehensive marketing strategies, we build solutions that are scalable, efficient, and tailored to your unique business needs. We believe every business, regardless of size, deserves access to technology that drives growth and streamlines operations.
              </p>
              <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                From initial consultation to ongoing support, we're committed to being your essential element for digital transformation—helping you leverage the power of modern technology to focus on what you do best.
              </p>
            </div>
            
            {/* Right Panel - Images */}
            <div className="w-full md:w-3/5 flex items-stretch py-12 md:py-20 pl-0 md:pl-30">
              <div ref={imageRef} className="relative w-full h-full min-h-[400px] md:min-h-[600px] rounded-lg overflow-hidden">
                <img
                  src="/images/ales-nesetril-Im7lZjxeLhg-unsplash.jpg"
                  alt="Professional technology company"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ELEMTA Footer - Bottom of Homepage */}
      <footer ref={footerRef} className='group bg-black relative overflow-visible pb-4 sm:pb-6 md:pb-0'>
        <h1 className='text-[16vw] translate-y-12 sm:translate-y-16 md:translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear relative z-20'>
          elemta
        </h1>
        <div className='bg-black h-40 relative z-0 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
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
