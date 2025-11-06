'use client';

import { useState } from 'react';
import StaggeredMenu from '../components/StaggeredMenu';
import ReviewCarousel from '../components/ReviewCarousel';
import ReviewCardCarousel from '../components/ReviewCardCarousel';
import ProjectModal, { ProjectItem } from '../components/ProjectModal';
import { Linkedin, Instagram, Facebook, MapPin } from 'lucide-react';
import { allProjects } from '../data/projects';

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

// Use actual projects from data file
const workItems = allProjects.map(project => ({
  id: project.id,
  title: project.title,
  description: project.description,
  category: project.category,
  image: project.image,
  technologies: project.technologies || [],
  link: project.link || '#'
}));

// Google Reviews Data
const googleReviews = [
  {
    id: 1,
    reviewerName: 'Layal Alsowayigh',
    isLocalGuide: true,
    localGuideStats: '15 reviews · 17 photos',
    rating: 5,
    timeAgo: '2 weeks ago',
    isNew: true,
    reviewText: "We're so happy with the website they created for Deema Turkish Cuisine! The team did an incredible job capturing exactly what we wanted elegant, easy to navigate, and perfectly matching our restaurant's style. They listened carefully to our ideas, added their own creative touches, and made everything look professional and modern. The menu looks beautiful online, and our customers always compliment how easy it is to find information and make reservations. They were also super patient and responsive with updates, which made the whole process stress-free. We really appreciate all their hard work and attention to detail. Highly recommend them to anyone looking for a clean, well-designed website and great customer service!"
  },
  {
    id: 2,
    reviewerName: 'Deema Turkish',
    isLocalGuide: false,
    localGuideStats: '1 review',
    rating: 5,
    timeAgo: '2 weeks ago',
    isNew: true,
    reviewText: "A huge thank-you to the amazing team who built our new website! They truly brought Deema Turkish Cuisine to life online — from the colors to the photos to the way everything flows, it all reflects our restaurant perfectly. They made the whole process so easy and always took care of every little detail we asked for. Now our customers can browse the menu, find our hours, and even see our events with just a few clicks. It's clean, professional, and feels so us. We couldn't be happier! Highly recommend their work to any business that wants a beautiful, functional website built with care."
  },
  {
    id: 3,
    reviewerName: 'Tricia Alonzo',
    isLocalGuide: true,
    localGuideStats: '25 reviews · 97 photos',
    rating: 5,
    timeAgo: '2 months ago',
    isNew: false,
    reviewText: "I had the pleasure of working with Aseel and his team to develop my website, and I couldn't be happier with the results. They were professional, responsive, and incredibly knowledgeable. They took the time to understand my business, goals, and vision, and created a website that is not only visually appealing but also functional and easy to navigate. The communication throughout the process was excellent, and they were always quick to respond to any questions or adjustments I needed. I highly recommend Aseel and his team to anyone looking for a reliable and skilled website developer."
  }
];

export default function About() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>, project: ProjectItem) => {
    e.preventDefault();
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative">
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
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-24 lg:mb-32 px-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            Our Work
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            Explore our portfolio of innovative projects and solutions that drive digital transformation.
          </p>
        </div>

        {/* Connect With Us Section */}
        <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Heading */}
           

            {/* Social Buttons */}
            <div className="flex flex-col items-center gap-4 sm:gap-5">
              {/* Top Row - Social Media */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-gray-200 transition-colors" strokeWidth={2.5} />
                  <span className="text-white group-hover:text-gray-200 font-semibold text-base sm:text-lg transition-colors" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    LinkedIn
                  </span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-gray-200 transition-colors" strokeWidth={2.5} />
                  <span className="text-white group-hover:text-gray-200 font-semibold text-base sm:text-lg transition-colors" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Instagram
                  </span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Facebook className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-gray-200 transition-colors" strokeWidth={2.5} />
                  <span className="text-white group-hover:text-gray-200 font-semibold text-base sm:text-lg transition-colors" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Facebook
                  </span>
                </a>
              </div>

              {/* Bottom Row - Google Review */}
              <div className="flex justify-center w-full">
                <a
                  href="https://g.page/r/your-business-id/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-gray-200 transition-colors" strokeWidth={2.5} />
                  <span className="text-white group-hover:text-gray-200 font-semibold text-base sm:text-lg transition-colors" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Google (Leave us a Review!)
                  </span>
                </a>
              </div>
            </div>

            {/* Review Carousels - Original for mobile, Combined for desktop */}
            {/* Mobile: Original ReviewCarousel */}
            <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 px-4 md:hidden relative z-10">
              <div className="flex justify-center">
                <div style={{ height: '600px', position: 'relative', width: '100%', maxWidth: '400px' }}>
                  <ReviewCarousel
                    items={googleReviews}
                    baseWidth={400}
                    autoplay={true}
                    autoplayDelay={5000}
                    pauseOnHover={true}
                    loop={true}
                    round={false}
                  />
                </div>
              </div>
            </div>

            {/* Desktop: Combined Review Card Carousel */}
            <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 px-4 overflow-visible hidden md:block relative z-10">
              <div className="max-w-7xl mx-auto overflow-visible">
                <ReviewCardCarousel items={googleReviews} />
              </div>
            </div>
          </div>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-4 mb-16 sm:mb-20 md:mb-24 lg:mb-32 relative z-10">
          {workItems.map((item) => {
            // Find the full project data from allProjects
            const fullProject = allProjects.find(p => p.id === item.id);
            if (!fullProject) return null;
            
            return (
              <a
                key={item.id}
                href="#"
                onClick={(e) => handleProjectClick(e, fullProject)}
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
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs text-gray-300 bg-gray-800 rounded-md"
                      style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 to-gray-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-lg" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  View Project →
                </span>
              </div>
              </a>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 sm:mt-20 md:mt-24 px-4 relative z-10">
          <p className="text-white text-lg sm:text-xl md:text-2xl mb-6" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            Ready to start your project?
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded-lg transition-all transform hover:scale-105"
            style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
