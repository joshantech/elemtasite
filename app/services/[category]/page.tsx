'use client';

import { useParams } from 'next/navigation';
import { useState, useRef } from 'react';
import StaggeredMenu from '../../components/StaggeredMenu';
import ProjectModal, { ProjectItem } from '../../components/ProjectModal';
import Plasma from '../../components/Plasma';
import { allProjects, categoryMap } from '../../data/projects';

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

const categoryTitles: Record<string, string> = {
  'softwares': 'Software Design & Development',
  'ai': 'AI Automation',
  'marketing': 'Marketing & Branding',
  'website': 'Website Design'
};

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get categories for this service
  const serviceCategories = categoryMap[category] || [];
  
  // Filter projects by category
  const filteredProjects = allProjects.filter(project => 
    serviceCategories.includes(project.category)
  );

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>, project: ProjectItem) => {
    e.preventDefault();
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const categoryTitle = categoryTitles[category] || 'Our Projects';

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

      {/* Projects Section */}
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
            <p className="text-white text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              A selection of our {categoryTitle.toLowerCase()} projects.
            </p>
          </div>

          {/* Work Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-3 mb-12 max-w-6xl mx-auto">
              {filteredProjects.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => handleProjectClick(e, item)}
                  className="group relative overflow-hidden rounded-2xl bg-black hover:bg-gray-900 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                  style={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.15), 0 0 30px rgba(255, 255, 255, 0.1)' }}
                >
                  {/* Image */}
                  <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
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
                  <div className="p-6 sm:p-8 md:p-10">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-4 line-clamp-3" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
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
          ) : (
            <div className="text-center py-20">
              <p className="text-white text-xl" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                No projects found in this category.
              </p>
            </div>
          )}
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

