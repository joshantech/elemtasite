'use client';

import { useState, useRef } from 'react';
import StaggeredMenu from '../components/StaggeredMenu';
import ProjectModal, { ProjectItem } from '../components/ProjectModal';
import Testimonials from '../components/ui/testimonials';
import { Linkedin, Instagram, Facebook, MapPin, ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
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

// Testimonials Data - includes 3 original reviews + fake Elemta reviews
const testimonials = [
  // Original reviews converted to new format
  {
    text: "We're so happy with the website they created for Deema Turkish Cuisine! The team did an incredible job capturing exactly what we wanted elegant, easy to navigate, and perfectly matching our restaurant's style. They listened carefully to our ideas, added their own creative touches, and made everything look professional and modern. The menu looks beautiful online, and our customers always compliment how easy it is to find information and make reservations. They were also super patient and responsive with updates, which made the whole process stress-free. We really appreciate all their hard work and attention to detail. Highly recommend them to anyone looking for a clean, well-designed website and great customer service!",
    name: "Layal Alsowayigh",
    role: "Restaurant Owner"
  },
  {
    text: "A huge thank-you to the amazing team who built our new website! They truly brought Deema Turkish Cuisine to life online — from the colors to the photos to the way everything flows, it all reflects our restaurant perfectly. They made the whole process so easy and always took care of every little detail we asked for. Now our customers can browse the menu, find our hours, and even see our events with just a few clicks. It's clean, professional, and feels so us. We couldn't be happier! Highly recommend their work to any business that wants a beautiful, functional website built with care.",
    name: "Deema Turkish",
    role: "Business Owner"
  },
  {
    text: "I had the pleasure of working with Aseel and his team to develop my website, and I couldn't be happier with the results. They were professional, responsive, and incredibly knowledgeable. They took the time to understand my business, goals, and vision, and created a website that is not only visually appealing but also functional and easy to navigate. The communication throughout the process was excellent, and they were always quick to respond to any questions or adjustments I needed. I highly recommend Aseel and his team to anyone looking for a reliable and skilled website developer.",
    name: "Tricia Alonzo",
    role: "Client"
  },
  // Fake Elemta reviews
  {
    text: "Elemta transformed our business operations with their custom software solution. The team understood our unique needs and delivered a scalable platform that has streamlined our workflow significantly. Their attention to detail and ongoing support has been exceptional.",
    name: "Sarah Mitchell",
    role: "Operations Director"
  },
  {
    text: "Working with Elemta was a game-changer for our company. They built us a comprehensive management system that handles everything from inventory to customer relations. The interface is intuitive, and the team was always available to help us optimize our processes.",
    name: "James Chen",
    role: "CEO"
  },
  {
    text: "The AI automation solution Elemta created for us has saved countless hours of manual work. Their team is innovative, professional, and truly understands how to leverage technology to solve real business problems. Highly recommend their services!",
    name: "Emily Rodriguez",
    role: "Operations Manager"
  },
  {
    text: "Elemta's marketing and branding services elevated our online presence dramatically. They created a cohesive brand identity that resonates with our target audience, and our engagement has increased significantly since working with them.",
    name: "Michael Thompson",
    role: "Marketing Director"
  },
  {
    text: "The website Elemta built for us is not only beautiful but incredibly functional. Our conversion rates have improved, and the user experience is seamless. The team was responsive throughout the entire project and delivered exactly what we needed.",
    name: "Lisa Anderson",
    role: "E-commerce Manager"
  },
  {
    text: "Elemta's expertise in software development is unmatched. They delivered a robust solution that integrates seamlessly with our existing systems. The project was completed on time and within budget, and the results have exceeded our expectations.",
    name: "David Park",
    role: "CTO"
  },
  {
    text: "We've worked with several development teams, but Elemta stands out for their professionalism and technical expertise. They took the time to understand our business model and created a solution that perfectly fits our needs. Outstanding work!",
    name: "Rachel Kim",
    role: "Product Manager"
  },
  {
    text: "The automation tools Elemta implemented have revolutionized how we handle customer inquiries and data processing. Their innovative approach and technical skills have made a significant impact on our operational efficiency.",
    name: "Robert Martinez",
    role: "Customer Success Lead"
  },
  {
    text: "Elemta helped us build a modern, responsive website that perfectly represents our brand. The design is clean, the functionality is flawless, and the team provided excellent support throughout the entire process. We couldn't be happier with the results.",
    name: "Jennifer White",
    role: "Brand Manager"
  }
];

export default function About() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuredProjectIndex, setFeaturedProjectIndex] = useState(0);
  const featuredSectionRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>, project: ProjectItem) => {
    e.preventDefault();
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    setFeaturedProjectIndex((prev) => (prev + 1) % workItems.length);
  };

  const handlePrevProject = () => {
    setFeaturedProjectIndex((prev) => (prev - 1 + workItems.length) % workItems.length);
  };

  const handleThumbnailClick = (index: number) => {
    setFeaturedProjectIndex(index);
    // Scroll to featured section
    if (featuredSectionRef.current) {
      featuredSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentFeaturedProject = allProjects.find(p => p.id === workItems[featuredProjectIndex]?.id);

  return (
    <div className="min-h-screen bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-x-hidden w-full">
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

        {/* Testimonials Section */}
        <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 px-4 relative z-10">
          <Testimonials testimonials={testimonials} />
        </div>

        {/* Connect With Us Section */}
        <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
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
          </div>
        </div>

        {/* Featured Project Section */}
        {currentFeaturedProject && (
          <div ref={featuredSectionRef} className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 relative z-10">
            {/* Mobile: Simplified Layout */}
            <div className="md:hidden space-y-4 mb-8">
              {/* Featured Project Card */}
              <div className="bg-gray-900 rounded-2xl overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center overflow-hidden">
                  <img
                    src={workItems[featuredProjectIndex].image}
                    alt={workItems[featuredProjectIndex].title}
                    className="w-full h-full object-cover opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrevProject}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={handleNextProject}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all"
                    aria-label="Next project"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="bg-gray-900 p-5">
                  <div className="text-sm text-gray-400 mb-2" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Project {featuredProjectIndex + 1} of {workItems.length}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    {workItems[featuredProjectIndex].title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    {workItems[featuredProjectIndex].description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {workItems[featuredProjectIndex].technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs text-gray-300 bg-gray-800 rounded-md"
                        style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleProjectClick(e as any, currentFeaturedProject);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all"
                    style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2">
                {workItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === featuredProjectIndex ? 'bg-white w-8' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: Two Column Layout */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-6 lg:gap-8 mb-8">
                {/* Left: Image with Navigation */}
                <div className="relative rounded-2xl overflow-hidden bg-gray-900">
                  <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
                    <img
                      src={workItems[featuredProjectIndex].image}
                      alt={workItems[featuredProjectIndex].title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                        {workItems[featuredProjectIndex].category}
                      </span>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={handlePrevProject}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all z-10"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={handleNextProject}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all z-10"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Right: Project Details */}
                <div className="bg-gray-900 rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-sm text-gray-400 mb-4" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                      Project {featuredProjectIndex + 1} of {workItems.length}
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                      {workItems[featuredProjectIndex].title}
                    </h2>
                    <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-6" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                      {workItems[featuredProjectIndex].description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {workItems[featuredProjectIndex].technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-sm text-gray-300 bg-gray-800 rounded-md"
                          style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Project Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleProjectClick(e as any, currentFeaturedProject);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all w-fit"
                    style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2">
                {workItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === featuredProjectIndex ? 'bg-white w-8' : 'bg-gray-600 w-2'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Projects Gallery */}
        <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            All Projects
          </h2>
          
          {/* Thumbnail Gallery */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 px-4">
            {workItems.map((item, index) => {
              const fullProject = allProjects.find(p => p.id === item.id);
              if (!fullProject) return null;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                    index === featuredProjectIndex 
                      ? 'ring-2 ring-white scale-105' 
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ width: '200px', height: '150px' }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </button>
              );
            })}
          </div>
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
