'use client';

import React, { forwardRef } from 'react';
import './sticky-scroll.css';
import Particles from '../../../components/Particles';
import CompaniesLogoLoop from './CompaniesLogoLoop';

const Component = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className='bg-black sticky-scroll-container' ref={ref}>
        <section className='text-white  h-[33vh]  w-full bg-black  grid place-content-center relative overflow-hidden pt-8 sm:pt-12 md:pt-16 lg:pt-20'>
          <Particles
            particleCount={100}
            particleSpread={2}
            particleBaseSize={0.5}
            sizeRandomness={0.5}
            speed={0.5}
            particleColors={['#ffffff', '#ffffff', '#ffffff']}
            className="absolute inset-0"
          />
          <h1 className='2xl:text-8xl text-5xl sm:text-6xl md:text-7xl px-8 font-semibold text-center tracking-tight leading-[120%] relative z-10'>
        the essential element
          </h1>
          <h1 className='2xl:text-8xl text-5xl sm:text-6xl md:text-7xl px-8 font-semibold text-center tracking-tight leading-[120%] relative z-10'>
          for smarter business.
            <br />
            <br /> 
          </h1>
        </section>
        <section className='text-white w-full bg-black image-gallery-section' style={{ minHeight: '150vh', paddingBottom: '2rem' }}>
          <div className='grid grid-cols-12 gap-2 image-gallery-grid' style={{ alignItems: 'start' }}>
            <div className='grid gap-2 col-span-4 left-column'>
              <figure className=' w-full'>
                <img
                  src='/images/sticky-scroll/StickyNote.png'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className=' w-full'>
                <img
                  src='/images/sticky-scroll/blanket.webp'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className=' w-full'>
                <img
                  src='/images/sticky-scroll/elemta.webp'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                  style={{ objectPosition: 'center 20%' }}
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/images/sticky-scroll/elemtabag.png'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/images/sticky-scroll/smarter.svg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md desktop-bottom-image'
                />
                <img
                  src='/images/sticky-scroll/smartermobile.svg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md mobile-bottom-image'
                />
              </figure>
            </div>
            <div className='col-span-4 gap-2 grid grid-rows-3 sticky-column' style={{ height: '100vh' }}>
              <figure className='w-full h-full '>
                <img
                  src='/images/sticky-scroll/wall.webp'
                  alt=''
                  className='transition-all duration-300 h-full w-full  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full h-full '>
                <img
                  src='/images/sticky-scroll/glass.webp'
                  alt=''
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full h-full '>
                <img
                  src='/images/sticky-scroll/faster.svg'
                  alt=''
                  className='transition-all duration-300 h-full w-full  align-bottom object-cover rounded-md desktop-bottom-image'
                />
                <img
                  src='/images/sticky-scroll/fastermobile.svg'
                  alt=''
                  className='transition-all duration-300 h-full w-full  align-bottom object-cover rounded-md mobile-bottom-image'
                />
              </figure>
            </div>
            <div className='grid gap-2 col-span-4 right-column'>
              <figure className='w-full'>
                <img
                  src='/images/sticky-scroll/shop.webp'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/images/sticky-scroll/shirt.webp'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/images/sticky-scroll/book.webp'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/images/sticky-scroll/cup.webp'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/images/sticky-scroll/further.svg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md desktop-bottom-image'
                />
                <img
                  src='/images/sticky-scroll/furthermobile.svg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md mobile-bottom-image'
                />
              </figure>
            </div>
          </div>
        </section>
        <CompaniesLogoLoop />
      </div>
  );
});

Component.displayName = 'Component';

export default Component;

