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
import BlurText from './components/BlurText';
import { HoverPreview } from './components/ui/hover-preview';
import { HoverButton } from './components/ui/hover-button';
// LiquidChrome component is available at './components/LiquidChrome' for future use

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
 
export default function Home() {
  const firstPageRef = useRef<HTMLElement>(null);
  const secondPageRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const stickyScrollRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scroll animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const heroContent = heroContentRef.current;
    const stickyScroll = stickyScrollRef.current;
    const textContent = textContentRef.current;
    const image = imageRef.current;

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
    // if (image) {
    //   gsap.fromTo(
    //     image,
    //     {
    //       opacity: 0,
    //       y: 50
    //     },
    //     {
    //       opacity: 1,
    //       y: 0,
    //       duration: 2,
    //       ease: 'power3.out',
    //       scrollTrigger: {
    //         trigger: image,
    //         start: 'top 80%',
    //         end: 'top 50%',
    //         toggleActions: 'play none none reverse'
    //       }
    //     }
    //   );
    // }

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
        logoUrl="/favicon.ico"
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
            <main ref={heroContentRef} className="mx-auto max-w-4xl text-center flex flex-col items-center">
              <img 
                src="/images/Logo-A3.png" 
                alt="Elemta - Smart Digital Solutions" 
                className="mx-auto w-auto h-auto max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] object-contain mb-12 sm:mb-16 md:mb-20"
                style={{ maxHeight: '70vh' }}
                loading="eager"
              />
              <Link href="/contact">
                <HoverButton className="text-white">
                  Get Started
                </HoverButton>
              </Link>
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
      {/* Text section commented out
      <section ref={secondPageRef as any} id="section2" className="relative bg-black overflow-hidden pt-2 sm:pt-64 md:pt-12 md:pb-0 pb-0">
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-col">
            <div ref={textContentRef} className="w-full pt-8 md:pt-12 md:pb-0 pb-0 order-2 md:order-2 flex flex-col items-center justify-center">
              <div className="transition-transform duration-300 ease-out hover:scale-[1.08] cursor-default w-full px-4">
                <BlurText
                  text="A Professional Technology Company"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight justify-center mx-auto"
                  style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                />
              </div>
              <div className="w-full md:max-w-4xl mx-auto text-center">
                <HoverPreview />
              </div>
            </div>
          </div>
        </div>
      </section>
      */}
      
      {/* Logo section - active */}
      <section className="relative bg-black overflow-hidden pt-4 pb-0 sm:pt-6 sm:pb-1 md:pt-6 md:pb-0 lg:pt-6 lg:pb-0">
        <div className="w-full flex justify-center items-center">
          <img 
            src="/images/BottomHomePage.svg" 
            alt="Elemta" 
            className='w-full max-w-[80vw] sm:max-w-[75vw] md:max-w-[70vw] lg:max-w-[65vw] xl:max-w-[60vw] h-auto object-contain'
          />
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
