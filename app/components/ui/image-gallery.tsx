"use client";

import { ExternalLink } from "lucide-react";
import { ProjectItem } from "../../data/projects";

interface ImageGalleryProps {
  projects: ProjectItem[];
}

export default function ImageGallery({ projects }: ImageGalleryProps) {
  // Determine the URL for each project - prefer liveUrl, fallback to link, then '#'
  const getProjectUrl = (project: ProjectItem) => {
    return project.liveUrl || project.link || '#';
  };

  return (
    <section className="w-full flex flex-col items-center justify-start py-12">
      <div className="max-w-4xl mx-auto text-center px-4 mb-16">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4"
          style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
        >
          Our Latest Creations
        </h1>
        <p 
          className="text-base md:text-lg text-slate-400 mx-auto"
          style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
        >
          A visual collection of our most recent works – each piece crafted
          with intention, emotion, and style.
        </p>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-6 md:gap-8 max-w-7xl mx-auto px-4 pb-16">
        {projects.map((project, idx) => {
          const projectUrl = getProjectUrl(project);
          const isExternal = projectUrl.startsWith('http');
          
          return (
            <a
              key={project.id}
              href={projectUrl}
              target={isExternal ? '_blank' : '_self'}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="relative group rounded-xl overflow-hidden w-full"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-square object-cover object-center transition-transform duration-300 group-hover:scale-105"
                onError={(e) => { 
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src='https://placehold.co/420x420/000000/ffffff?text=Error'; 
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h2 
                  className="text-2xl md:text-3xl font-medium mb-2"
                  style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                >
                  {project.title}
                </h2>
                <div className="flex items-center gap-2 text-base md:text-lg text-white/70">
                  <span>Show More</span>
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

