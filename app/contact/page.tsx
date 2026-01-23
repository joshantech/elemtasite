'use client';

import { useState, FormEvent } from 'react';
import StaggeredMenu from '../components/StaggeredMenu';
import { ShootingStars } from '../components/ui/shooting-stars';
import { HoverButton } from '../components/ui/hover-button';
// import ProfileCard from '../components/ProfileCard';
import { Mail, Phone, Facebook, Linkedin, Instagram } from 'lucide-react';
import FAQAccordion from '../components/FAQAccordion';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '/projects' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Instagram', link: 'https://www.instagram.com/elemtta/' },
  { label: 'Facebook', link: 'https://www.facebook.com/Elemtta?mibextid=wwXIfr&rdid=L9V1whliPJ5fvbRl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CVYQ1XdNY%2F%3Fmibextid%3DwwXIfr#' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/company/elemta' }
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
      // Send form data to API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

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
      console.error('Contact form error:', error);
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
      {/* Shooting Stars Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]" />
        <div className="stars absolute inset-0" />
        <ShootingStars
          starColor="#9E00FF"
          trailColor="#2EB9DF"
          minSpeed={15}
          maxSpeed={35}
          minDelay={1000}
          maxDelay={3000}
        />
        <ShootingStars
          starColor="#FF0099"
          trailColor="#FFB800"
          minSpeed={10}
          maxSpeed={25}
          minDelay={2000}
          maxDelay={4000}
        />
        <ShootingStars
          starColor="#00FF9E"
          trailColor="#00B8FF"
          minSpeed={20}
          maxSpeed={40}
          minDelay={1500}
          maxDelay={3500}
        />
        <style dangerouslySetInnerHTML={{__html: `
          .stars {
            background-image: 
              radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
            background-repeat: repeat;
            background-size: 200px 200px;
            animation: twinkle 5s ease-in-out infinite;
            opacity: 0.5;
          }

          @keyframes twinkle {
            0% { opacity: 0.5; }
            50% { opacity: 0.8; }
            100% { opacity: 0.5; }
          }
        `}} />
      </div>

      {/* Content with relative z-index */}
      <div className="relative z-10">
        {/* Staggered Menu Navigation */}
        <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={false}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['#C0C0C0', '#808080']}
        logoUrl="/favicon.ico"
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
            Ready to transform your digital presence or build powerful business software? Get in touch with us today!
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Contact Information Panel */}
          <div className="rounded-2xl p-6 sm:p-8 md:p-10 bg-black border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
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
                    design@elemta.com
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
                  <a href="tel:+13133339699" className="text-white hover:text-gray-200 transition-colors text-sm md:text-base" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                    +1 (313) 333-9699
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
                <a href="https://www.facebook.com/Elemtta?mibextid=wwXIfr&rdid=L9V1whliPJ5fvbRl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CVYQ1XdNY%2F%3Fmibextid%3DwwXIfr#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-gray-800 transition-all">
                  <Facebook className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                </a>
                <a href="https://www.linkedin.com/company/elemta" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-gray-800 transition-all">
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                </a>
                <a href="https://www.instagram.com/elemtta/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-gray-800 transition-all">
                  <Instagram className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
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
                    placeholder=""
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
                    placeholder=""
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
                  placeholder=""
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
                  placeholder=""
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
                    <option value="+1" className="bg-gray-900">US/CA +1</option>
                    <option value="+44" className="bg-gray-900">UK +44</option>
                    <option value="+33" className="bg-gray-900">FR +33</option>
                    <option value="+49" className="bg-gray-900">DE +49</option>
                    <option value="+81" className="bg-gray-900">JP +81</option>
                    <option value="+61" className="bg-gray-900">AU +61</option>
                    <option value="+86" className="bg-gray-900">CN +86</option>
                    <option value="+91" className="bg-gray-900">IN +91</option>
                    <option value="+55" className="bg-gray-900">BR +55</option>
                    <option value="+52" className="bg-gray-900">MX +52</option>
                    <option value="+34" className="bg-gray-900">ES +34</option>
                    <option value="+39" className="bg-gray-900">IT +39</option>
                    <option value="+31" className="bg-gray-900">NL +31</option>
                    <option value="+46" className="bg-gray-900">SE +46</option>
                    <option value="+47" className="bg-gray-900">NO +47</option>
                    <option value="+45" className="bg-gray-900">DK +45</option>
                    <option value="+358" className="bg-gray-900">FI +358</option>
                    <option value="+48" className="bg-gray-900">PL +48</option>
                    <option value="+41" className="bg-gray-900">CH +41</option>
                    <option value="+43" className="bg-gray-900">AT +43</option>
                    <option value="+32" className="bg-gray-900">BE +32</option>
                    <option value="+351" className="bg-gray-900">PT +351</option>
                    <option value="+353" className="bg-gray-900">IE +353</option>
                    <option value="+64" className="bg-gray-900">NZ +64</option>
                    <option value="+65" className="bg-gray-900">SG +65</option>
                    <option value="+852" className="bg-gray-900">HK +852</option>
                    <option value="+82" className="bg-gray-900">KR +82</option>
                    <option value="+886" className="bg-gray-900">TW +886</option>
                    <option value="+60" className="bg-gray-900">MY +60</option>
                    <option value="+63" className="bg-gray-900">PH +63</option>
                    <option value="+66" className="bg-gray-900">TH +66</option>
                    <option value="+62" className="bg-gray-900">ID +62</option>
                    <option value="+84" className="bg-gray-900">VN +84</option>
                    <option value="+971" className="bg-gray-900">AE +971</option>
                    <option value="+966" className="bg-gray-900">SA +966</option>
                    <option value="+972" className="bg-gray-900">IL +972</option>
                    <option value="+90" className="bg-gray-900">TR +90</option>
                    <option value="+20" className="bg-gray-900">EG +20</option>
                    <option value="+27" className="bg-gray-900">ZA +27</option>
                    <option value="+234" className="bg-gray-900">NG +234</option>
                    <option value="+254" className="bg-gray-900">KE +254</option>
                    <option value="+7" className="bg-gray-900">RU +7</option>
                    <option value="+380" className="bg-gray-900">UA +380</option>
                    <option value="+30" className="bg-gray-900">GR +30</option>
                    <option value="+420" className="bg-gray-900">CZ +420</option>
                    <option value="+36" className="bg-gray-900">HU +36</option>
                    <option value="+40" className="bg-gray-900">RO +40</option>
                    <option value="+54" className="bg-gray-900">AR +54</option>
                    <option value="+56" className="bg-gray-900">CL +56</option>
                    <option value="+57" className="bg-gray-900">CO +57</option>
                    <option value="+51" className="bg-gray-900">PE +51</option>
                  </select>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 bg-transparent border border-white border-opacity-30 rounded-lg text-white text-base placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                    placeholder=""
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
                  placeholder=""
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
              <HoverButton
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </HoverButton>
            </form>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <FAQAccordion />

        {/* About Us Section - Moved from About Page */}
        {/* <div className="mt-16 md:mt-24 lg:mt-32">
         
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start justify-items-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center gap-8">
              <ProfileCard
                name="Joshan Christie"
                title="Software Engineer"
                description="Turning ideas into working solutions through software and automation. Creating tools and systems that help businesses grow."
                socialLinks={[
                  { platform: 'linkedin', url: 'https://www.linkedin.com/in/joshan-christie-15b00b233/' }
                ]}
                contactText="Contact Me"
                avatarUrl="/images/Joshan.png.png"
                contactLink="mailto:joshan@elemta.com"
                onContactClick={() => console.log('Contact Joshan clicked')}
              />
            </div>

            <div className="flex flex-col items-center gap-8">
              <ProfileCard
                name="Aseel Batuq"
                title="Business Operations"
                description="Specializing in business operations and client relations. Ensuring projects run smoothly and clients receive exceptional service."
                socialLinks={[
                  { platform: 'linkedin', url: 'https://www.linkedin.com/in/aseelbatuq/' }
                ]}
                contactText="Contact Me"
                avatarUrl="/images/Aseel.png.png"
                contactLink="mailto:aseel@elemta.com"
                onContactClick={() => console.log('Contact Aseel clicked')}
              />
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
}

