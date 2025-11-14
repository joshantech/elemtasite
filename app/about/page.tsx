'use client';

import StaggeredMenu from '../components/StaggeredMenu';
import Testimonials from '../components/ui/testimonials';
import { Linkedin, Instagram, Facebook, MapPin } from 'lucide-react';

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
            About Us
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            Learn more about our team and what drives us to deliver exceptional digital solutions.
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

        {/* Our Story Section - How Elemta Was Founded */}
        <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8 sm:mb-12 md:mb-16" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              Our Story
            </h2>
            
            <div className="space-y-6 sm:space-y-8 text-white">
              <div className="prose prose-invert max-w-none">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  Elemta was founded with a simple yet powerful vision: to make technology accessible and transformative for businesses of all sizes. We recognized that many companies struggle with outdated systems, inefficient processes, and the overwhelming complexity of modern digital solutions.
                </p>
                
                <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  Our founders, Joshan Christie and Aseel Batuq, came together with complementary expertise—one specializing in software development and automation, the other in business operations and client relations. They saw firsthand how businesses were being left behind because they couldn't afford or navigate the digital transformation landscape.
                </p>
                
                <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  The name "Elemta" reflects our core mission: to be the essential element that helps businesses evolve and thrive in the digital age. We believe that every business, regardless of size, deserves access to smart digital solutions that can streamline operations, enhance customer experiences, and drive growth.
                </p>
                
                <p className="text-base sm:text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  Today, we continue to build on this foundation, creating custom software, modern websites, intelligent automation, and comprehensive marketing solutions that empower our clients to succeed. We exist to make your journey a little easier—because when technology works seamlessly, businesses can focus on what they do best.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
