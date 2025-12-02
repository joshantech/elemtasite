'use client';

import React, { forwardRef } from 'react';
import './sticky-scroll.css';
import Particles from '../../../components/Particles';
import CompaniesLogoLoop from './CompaniesLogoLoop';

const Component = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className='bg-black sticky-scroll-container' ref={ref}>
        <section className='text-white  h-[33vh]  w-full bg-black  grid place-content-center relative overflow-hidden'>
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
          we exist to make your journey 
          </h1>
          <h1 className='2xl:text-8xl text-5xl sm:text-6xl md:text-7xl px-8 font-semibold text-center tracking-tight leading-[120%] relative z-10'>
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
        <CompaniesLogoLoop />
      </div>
  );
});

Component.displayName = 'Component';

export default Component;

