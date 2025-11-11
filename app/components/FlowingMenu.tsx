'use client';

import React from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

interface FlowingMenuItem {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: FlowingMenuItem[];
}

function FlowingMenu({ items = [] }: FlowingMenuProps) {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

function MenuItem({ link, text, image }: MenuItemProps) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
  const animationDefaults = { duration: 0.6, ease: 'expo' as const };
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keep marquee visible on mobile
  React.useEffect(() => {
    if (isMobile && marqueeRef.current && marqueeInnerRef.current) {
      gsap.set(marqueeRef.current, { y: '0%' });
      gsap.set(marqueeInnerRef.current, { y: '0%' });
    }
  }, [isMobile]);

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return; // Skip on mobile
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return; // Skip on mobile
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const handleTouchStart = (ev: React.TouchEvent<HTMLAnchorElement>) => {
    // On mobile, keep animation active, don't toggle
    if (isMobile) return;
    // For desktop touch, use center of touch point
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const touch = ev.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleTouchEnd = () => {
    if (isMobile) return; // Keep animation active on mobile
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: '-101%' }, 0)
      .to(marqueeInnerRef.current, { y: '101%' }, 0);
  };

  const repeatedMarqueeContent = Array.from({ length: 8 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{text}</span>
      <div 
        className="marquee__img" 
        style={{ 
          backgroundImage: `url(${image})`,
          backgroundColor: image ? 'transparent' : '#e5e5e5'
        }} 
      />
    </React.Fragment>
  ));

  return (
    <div className="menu__item" ref={itemRef}>
      <a 
        className="menu__item-link" 
        href={link} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;

