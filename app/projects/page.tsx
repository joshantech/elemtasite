'use client';

import { useState, useRef } from 'react';
import StaggeredMenu from '../components/StaggeredMenu';
import ProjectModal, { ProjectItem } from '../components/ProjectModal';
import { allProjects } from '../data/projects';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

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

export default function Projects() {
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

