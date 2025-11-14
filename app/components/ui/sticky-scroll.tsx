'use client';

import React, { forwardRef } from 'react';
import './sticky-scroll.css';
import Particles from '../../../components/Particles';
import LogoLoop from './LogoLoop';

const Component = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className='bg-black sticky-scroll-container' ref={ref}>
        <section className='text-white  h-[33vh]  w-full bg-black  grid place-content-center relative overflow-hidden'>
          {/* Particles Background */}
          <div className='absolute inset-0 w-full h-full z-0' style={{ width: '100%', height: '100%', position: 'absolute' }}>
            <Particles
              particleColors={['#ffffff', '#ffffff']}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
              className=""
            />
          </div>
          <h1 className='2xl:text-6xl text-4xl px-8 font-semibold text-center tracking-tight leading-[120%] relative z-10'>
          we exist to make your journey 
          </h1>
          <h1 className='2xl:text-6xl text-4xl px-8 font-semibold text-center tracking-tight leading-[120%] relative z-10'>
          a little easier.
            <br />
            <br /> 
          </h1>
        </section>
        <section className='text-white w-full bg-black image-gallery-section' style={{ minHeight: '150vh', paddingBottom: '2rem' }}>
          <div className='grid grid-cols-12 gap-2 image-gallery-grid' style={{ alignItems: 'start' }}>
            <div className='grid gap-2 col-span-4 left-column'>
              <figure className=' w-full'>
                <img
                  src='https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className=' w-full'>
                <img
                  src='https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className=' w-full'>
                <img
                  src='https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1685904042960-66242a0ac352?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1719411182379-ffd97c1f7ebf?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
            </div>
            <div className='col-span-4 gap-2 grid grid-rows-3 sticky-column' style={{ height: '100vh' }}>
              <figure className='w-full h-full '>
                <img
                  src='https://images.unsplash.com/photo-1718969604981-de826f44ce15?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 h-full w-full  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full h-full '>
                <img
                  src='https://images.unsplash.com/photo-1476180814856-a36609db0493?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full h-full '>
                <img
                  src='https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 h-full w-full  align-bottom object-cover rounded-md '
                />
              </figure>
            </div>
            <div className='grid gap-2 col-span-4 right-column'>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1719547907790-f661a88302c2?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1719554873571-0fd6bf322bb1?w=500&auto=format&fit=crop'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
            </div>
          </div>
        </section>
        <footer className='group bg-black relative overflow-visible py-16 lg:py-24 pb-32 sm:pb-40 md:pb-24'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
            <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12 lg:mb-16" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              Companies We've Worked With
            </h2>
            <div style={{ height: '120px', position: 'relative', overflow: 'hidden', marginBottom: '3rem' }}>
              <LogoLoop
                logos={[
                  { src: '/images/deemalogo.png', alt: 'Deema Turkish Cuisine', title: 'Deema Turkish Cuisine' },
                  { src: '/images/onecomlogo.png', alt: 'One Community', title: 'One Community' },
                  { src: '/images/Web NE transparent.png', alt: 'Web NE', title: 'Web NE' },
                  { src: '/images/hotchickzlogo.png', alt: 'Hot Chickz', title: 'Hot Chickz' }
                ]}
                speed={80}
                direction="left"
                logoHeight={80}
                gap={60}
                hoverSpeed={20}
                fadeOut
                fadeOutColor="#000000"
                scaleOnHover
                ariaLabel="Companies we've worked with"
              />
            </div>
          </div>
        </footer>
      </div>
  );
});

Component.displayName = 'Component';

export default Component;

