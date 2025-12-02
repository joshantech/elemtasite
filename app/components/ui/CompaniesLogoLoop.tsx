'use client';

import React from 'react';
import LogoLoop from './LogoLoop';

const CompaniesLogoLoop = () => {
  return (
    <footer className='group bg-black relative overflow-visible pt-20 pb-0 sm:pt-8 sm:pb-4 md:pt-16 md:pb-16 lg:py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 overflow-visible'>
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12 lg:mb-16 pb-6 leading-normal" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif", overflow: 'visible', whiteSpace: 'normal', wordBreak: 'normal', lineHeight: '1.3', minHeight: 'auto' }}>
          Companies We've Worked With
        </h2>
        <div className="overflow-visible w-full logo-loop-container" style={{ minHeight: '150px', position: 'relative', marginBottom: '0.5rem', paddingBottom: '0.25rem', display: 'block', visibility: 'visible', opacity: 1, zIndex: 10 }}>
          <LogoLoop
            logos={[
              { src: '/images/deemalogo.png', alt: 'Deema Turkish Cuisine', title: 'Deema Turkish Cuisine' },
              { src: '/images/onecomlogo.png', alt: 'One Community', title: 'One Community' },
              { src: '/images/WEBONEWHITELOGO.svg', alt: 'Web NE', title: 'Web NE' },
              { src: '/images/hotchickzlogo.png', alt: 'Hot Chickz', title: 'Hot Chickz' }
            ]}
            speed={80}
            direction="left"
            logoHeight={100}
            gap={80}
            hoverSpeed={20}
            fadeOut
            fadeOutColor="#000000"
            scaleOnHover
            ariaLabel="Companies we've worked with"
          />
        </div>
      </div>
    </footer>
  );
};

export default CompaniesLogoLoop;

