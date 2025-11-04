'use client';

import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import StaggeredMenu from '../components/StaggeredMenu';
import Plasma from '../components/Plasma';
import ProfileCard from '../components/ProfileCard';
import { Mail, Phone, Facebook, Linkedin, Twitter } from 'lucide-react';

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

export default function Contact() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    from_email: '',
    phone_country_code: '+1',
    phone_number: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  // EmailJS credentials
  const EMAILJS_SERVICE_ID = 'service_tskw4sw';
  const EMAILJS_TEMPLATE_ID = 'template_8rflnts';
  const EMAILJS_PUBLIC_KEY = 'WdkuGQuFfH4JpVRaf';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Combine first and last name for EmailJS template
      const fullName = `${formData.first_name} ${formData.last_name}`.trim();
      const phoneFull = formData.phone_number ? `${formData.phone_country_code} ${formData.phone_number}` : '';
      
      // Create subject from company name or use default
      const subject = formData.company_name 
        ? `Contact from ${formData.company_name} - ${fullName}`
        : `Contact from ${fullName}`;

      // Prepare template parameters matching your EmailJS template
      // Template fields: {{subject}}, {{from_name}}, {{from_email}}, {{message}}, {{reply_to}}
      const templateParams = {
        subject: subject,
        from_name: fullName || 'Unknown',
        from_email: formData.from_email,
        message: `Company: ${formData.company_name || 'N/A'}\nPhone: ${phoneFull || 'N/A'}\n\nMessage:\n${formData.message}`,
        reply_to: formData.from_email
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your message! We\'ll get back to you soon.' 
      });
      setFormData({
        first_name: '',
        last_name: '',
        company_name: '',
        from_email: '',
        phone_country_code: '+1',
        phone_number: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Sorry, there was an error sending your message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
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

      {/* Content with relative z-index */}
      <div className="relative z-10">
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
        
        <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-3 md:mb-4 px-4" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            Get in <span className="text-gray-300">Touch</span>
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            Ready to transform your digital presence or build powerful business software? Get in touch with us today and let's create something amazing together.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Contact Information Panel */}
          <div className="rounded-2xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              Contact Us
            </h2>

            {/* Chat to us Section */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-start gap-3 md:gap-4 mb-2">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0 mt-1" strokeWidth={2} />
                <div>
                  <h3 className="text-white font-bold text-base md:text-lg mb-1" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Chat to us
                  </h3>
                  <p className="text-white text-xs md:text-sm mb-1" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Our friendly team is here to help.
                  </p>
                  <a href="mailto:contact@elemta.com" className="text-white hover:text-gray-200 transition-colors text-sm md:text-base break-all" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    contact@elemta.com
                  </a>
                </div>
              </div>
            </div>

            {/* Call us Section */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-start gap-3 md:gap-4 mb-2">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0 mt-1" strokeWidth={2} />
                <div>
                  <h3 className="text-white font-bold text-base md:text-lg mb-1" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Call us
                  </h3>
                  <p className="text-white text-xs md:text-sm mb-1" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Mon-Fri from 8am to 5pm
                  </p>
                  <a href="tel:+1234567890" className="text-white hover:text-gray-200 transition-colors text-sm md:text-base" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>

            {/* Follow Us Section */}
            <div>
              <h3 className="text-white font-bold text-base md:text-lg mb-3 md:mb-4" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                Follow Us
              </h3>
              <div className="flex gap-3 md:gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-gray-800 transition-all">
                  <Facebook className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-gray-800 transition-all">
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-gray-800 transition-all">
                  <Twitter className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name and Last Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="first_name" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    First Name <span className="text-gray-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base bg-transparent border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                    placeholder="First"
                    style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    Last Name <span className="text-gray-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base bg-transparent border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                    placeholder="Last"
                    style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="company_name" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  Company Name
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base bg-transparent border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                  placeholder="Company"
                  style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="from_email" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  Email <span className="text-gray-400">*</span>
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-base bg-transparent border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                  placeholder="johndoe@gmail.com"
                  style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone_number" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  Phone Number
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    id="phone_country_code"
                    name="phone_country_code"
                    value={formData.phone_country_code}
                    onChange={handleChange}
                    className="px-3 sm:px-4 py-3 bg-transparent border border-white border-opacity-30 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                    style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                  >
                    <option value="+1" className="bg-gray-900">US +1</option>
                    <option value="+44" className="bg-gray-900">UK +44</option>
                    <option value="+33" className="bg-gray-900">FR +33</option>
                    <option value="+49" className="bg-gray-900">DE +49</option>
                    <option value="+81" className="bg-gray-900">JP +81</option>
                  </select>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 bg-transparent border border-white border-opacity-30 rounded-lg text-white text-base placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                    placeholder="(555) 555-5555"
                    style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  Message <span className="text-gray-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 text-base bg-transparent border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all resize-none"
                  placeholder="Tell us what we can help you with"
                  style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                />
              </div>

              {/* Status Messages */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-gray-700 bg-opacity-50 border border-gray-500 text-gray-200'
                      : 'bg-red-900 bg-opacity-50 border border-red-700 text-red-200'
                  }`}
                  style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Send Message Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* About Us Section - Moved from About Page */}
        <div className="mt-16 md:mt-24 lg:mt-32">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white text-center mb-12 sm:mb-16 md:mb-24 px-4" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            About Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start justify-items-center max-w-5xl mx-auto">
            {/* Joshan Christie Column */}
            <div className="flex flex-col items-center gap-8">
              <ProfileCard
                name="Joshan Christie"
                title="Co-Founder"
                handle="joshanchristie"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/images/Joshan.png.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                className="joshan-card"
                contactLink="mailto:joshan@elemta.com"
                onContactClick={() => console.log('Contact Joshan clicked')}
              />
              <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 w-full">
                <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  &ldquo;Hello! I specialize in turning ideas into working solutions through software and automation. While I also enjoy design, my main role is to create the tools and systems that help our clients grow and make their businesses easier to manage.&rdquo;
                </p>
              </div>
            </div>

            {/* Aseel Batuq Column */}
            <div className="flex flex-col items-center gap-8">
              <ProfileCard
                name="Aseel Batuq"
                title="Co-Founder"
                handle="aseelbatuq"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/images/Aseel.png.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                className="aseel-card"
                contactLink="mailto:aseel@elemta.com"
                onContactClick={() => console.log('Contact Aseel clicked')}
              />
              <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 w-full">
                <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  &ldquo;Hey! I specialize in business operations and client relations. While I have a background in website development, my main role is to ensure that each project runs smoothly and that our clients receive the best possible service from start to finish.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

